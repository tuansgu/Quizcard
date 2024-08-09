const express = require('express');
const app = express();
const mysql = require('mysql');
const cors = require('cors');
const session = require('express-session');
const bcrypt = require('bcrypt');
const MySQLStore = require('express-mysql-session')(session);

// Cấu hình cors
app.use(cors({
    origin: 'http://localhost:5173', // Đặt đúng địa chỉ frontend
    credentials: true                // Cho phép cookies thông tin xác thực
}));

// Cấu hình express-session với MySQLStore
const db = mysql.createConnection({
    user: 'root',
    host: 'localhost',
    password: '',
    database: 'flashcard',
});

const sessionStore = new MySQLStore({}, db);

app.use(session({
    key: 'session_cookie_name',
    secret: 'your_secret_key', // Thay bằng khóa bí mật của bạn
    store: sessionStore,
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false, httpOnly: true, maxAge: 1000 * 60 * 60 * 24 }  // 1 ngày
}));

// Middleware để xử lý JSON
app.use(express.json());

db.connect((err) => {
    if (err) {
        console.error('Database connection failed: ', err);
        return;
    }
    console.log('Database connected successfully');
});

app.listen(3002, () => {
    console.log("Server is running on port 3002");
});

app.post('/register', async (req, res) => {
    const { name, password, email } = req.body;

    const checkEmail = 'SELECT * FROM users WHERE email = ?';
    db.query(checkEmail, [email], async (err, result) => {
        if (err) {
            return res.status(500).send({ error: err.message });
        }
        if (result.length > 0) {
            return res.status(400).send({ message: "Email already exists" });
        } else {
            const hashedPwd = await bcrypt.hash(password, 10);
            const SQL = 'INSERT INTO users(name, password, email) VALUES (?, ?, ?)';
            db.query(SQL, [name, hashedPwd, email], (err) => {
                if (err) {
                    return res.status(500).send({ error: err.message });
                } else {
                    return res.status(201).send({ message: "Registration Successfully" });
                }
            });
        }
    });
});

app.post('/login', async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).send({ message: 'Email and password are required' });
    }

    const SQL = "SELECT * FROM users WHERE email = ?";
    db.query(SQL, [email], async (err, result) => {
        if (err) {
            return res.status(500).send({ error: err.message });
        }
        if (result.length > 0) {
            const user = result[0];
            const isMatch = await bcrypt.compare(password, user.password);
            if (isMatch) {
                req.session.user = user;
                req.session.save((saveErr) => {
                    if (saveErr) {
                        return res.status(500).send({ error: saveErr.message });
                    }
                    return res.status(200).send({ message: "Login successfully", user });
                });
            } else {
                return res.status(400).send({ message: "Invalid email or password" });
            }
        } else {
            return res.status(400).send({ message: "Invalid email or password" });
        }
    });
});

app.post('/insert-flashcard-set', (req, res) => {
    if (!req.session.user) {
        return res.status(401).send({ message: 'User not authenticated' });
    }
    const { name, description } = req.body;
    console.log(name, description)
    const user_id = req.session.user.id;

    const SQL = 'INSERT INTO flashcard_sets(name, description, user_id) VALUES (?, ?, ?)';
    db.query(SQL, [name, description, user_id], (err, result) => {
        if (err) {
            return res.status(500).send({ error: err.message });
        } else {
            return res.status(201).send({ message: 'Flashcard set added successfully', result });
        }
    });
});

app.get('/get-flashcard-sets', (req, res) => {
    if (!req.session.user) {
        return res.status(401).send({ message: 'User not authenticated' });
    }

    const userId = req.session.user.id;
    const SQL = 'SELECT * FROM flashcard_sets WHERE user_id = ?'
    db.query(SQL, [userId], (err, results) => {
        if (err) {
            return res.status(500).send({ error: err.message });
        } else {
            return res.status(200).send(results);
        }
    });
});


app.get('/user', (req, res) => {
    if (req.session.user) {
        res.status(200).send({ user: req.session.user });
    } else {
        res.status(401).send({ message: 'User not authenticated' });
    }
});

app.get('/get-flashcards', (req, res) => {
    const flashcardSetId = req.query.flashcard_set_id;
    const SQL = 'SELECT * FROM flashcards WHERE flashcards.flashcard_set_id = ?';
    const valueSQL = [flashcardSetId];
    db.query(SQL, valueSQL, (err, result) => {
        if (err) {
            return res.status(500).send({ error: err.message });
        } else {
            return res.status(200).send(result);
        }
    });
});

app.get('/get-flashcard-set-id', (req, res) => {
    const { flashcard_set_id } = req.query; // Use query instead of body for GET request
    const SQL = 'SELECT * FROM flashcard_sets WHERE id = ?';
    const values = [flashcard_set_id];
    db.query(SQL, values, (err, result) => {
        if (err) {
            return res.status(500).send({ error: err.message });
        } else if (result.length === 0) {
            return res.status(404).send({ error: 'Flashcard set not found' });
        } else {
            return res.status(200).send(result[0]); // Send the first (and only) result
        }
    });
});

app.get('/get-flashcard-learn', (req, res) => {
    const { flashcard_set_id } = req.query; // Use query instead of body for GET request
    const SQL = 'SELECT * FROM flashcards WHERE flashcard_set_id = ?';
    const values = [flashcard_set_id];
    db.query(SQL, values, (err, result) => {
        if (err) {
            return res.status(500).send({ error: err.message });
        } else if (result.length === 0) {
            return res.status(404).send({ error: 'Flashcard set not found' });
        } else {
            console.log(result)
            return res.status(200).send(result);
        }
    });
})

app.post('/insert-term', (req, res) => {
    if (!req.session.user) {
        return res.status(401).send({ message: 'User not authenticated' });
    }
    const { term, definition, definition_vn, example } = req.body;
    console.log(term, definition, definition_vn, example)
    const flashcardSetId = req.query.flashcard_set_id;

    const SQL = 'INSERT INTO flashcards(term, definition, flashcard_set_id, definition_vn, example) VALUES (?, ?, ?, ?, ?)';
    db.query(SQL, [term, definition, flashcardSetId, definition_vn, example], (err, result) => {
        if (err) {
            return res.status(500).send({ error: err.message });
        } else {
            return res.status(201).send({ message: 'Flashcard set added successfully', result });
        }
    });
});

app.post('/share-flashcard-set', (req, res) => {
    const { id } = req.body;
    console.log(id);
    const SQL = 'UPDATE flashcard_sets SET flashcard_sets.status = "1" WHERE flashcard_sets.id = ?';
    const valueSQL = [id];
    db.query(SQL, valueSQL, (err, result) => {
        if (err) {
            return res.status(500).send({ error: err.message });
        } else {
            return res.status(201).send({ message: 'Flashcard set shared successfully', result });
        }
    })
})

app.get('/get-flashcard-sets-shared', (req, res) => {
    const SQL = 'SELECT * FROM flashcard_sets WHERE flashcard_sets.status = 1';
    db.query(SQL, (err, result) => {
        if(err) {
            return res.status(500).send({ error: err.message });
        } else {
            console.log(result)
            return res.status(201).send({ message: 'Loading flashcardsets are shared successfully', result });
        }
    })
})
