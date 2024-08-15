import React, { useEffect, useState } from 'react';
import Home from './home';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Profile = () => {
    const [lastname, setLastname] = useState("");
    const [firstname, setFirstname] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const [password, setPassword] = useState("");
    const [gender, setGender] = useState("");
    const [role, setRole] = useState("");
    const [createat, setCreateAt] = useState("");
    const [updateat, setUpdateAt] = useState("");


    const formatDateTime = (dateString: string) => {
        const dateObj = new Date(dateString);
        if (!isNaN(dateObj.getTime())) {
            return dateObj.toISOString().slice(0, 16);
        }
        return ""; // Trả về chuỗi rỗng nếu ngày không hợp lệ
    };

    const formatDateCreateAt = formatDateTime(createat);
    const checkUpdateAt = updateat ? formatDateTime(updateat) : "";
    const formatDateUpdateAt = checkUpdateAt || "NULL";


    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const today = new Date();
        const update_at = today.toISOString();
        console.log("update: ", update_at);

        try {
            await axios.post(`http://localhost:3002/update-info`, {
                lastname,
                firstname,
                phone,
                address,
                gender,
                role,
                update_at
            }, { withCredentials: true });
            toast.success('Information updated successfully');
        } catch (err) {
            toast.error('Failed to update information');
        }
    };

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await axios.get('http://localhost:3002/profile', { withCredentials: true });
                setLastname(response.data.lastname);
                setFirstname(response.data.firstname);
                setEmail(response.data.email);
                setPassword(response.data.password);
                setPhone(response.data.phone);
                setAddress(response.data.address);
                setCreateAt(response.data.create_at);
                setUpdateAt(response.data.update_at);
                setGender(response.data.gender);
                setRole(response.data.role);
                console.log(response.data.create_at, response.data.update_at);
            } catch (err) {
                console.error(err);
            }
        };
        fetchProfile();
    }, []);

    return (
        <>
            <Home />
            <div className='container-sm' style={{ marginTop: "50px" }}>
                <h1 className='d-flex justify-content-center' style={{ marginBottom: "50px" }}>
                    PERSONAL INFORMATION
                </h1>
                <div className='row justify-content-around' style={{ marginTop: '30px' }}>
                    <div className='col-4'>
                        <label>Last Name</label>
                        <input type='text' className='form-control' disabled value={lastname || ""} />
                    </div>
                    <div className='col-4'>
                        <label>First Name</label>
                        <input type='text' className='form-control' disabled value={firstname || ""} />
                    </div>
                </div>
                <div className='row justify-content-around' style={{ marginTop: '30px' }}>
                    <div className='col-4'>
                        <label>Email</label>
                        <input type='text' className='form-control' disabled value={email || ""} />
                    </div>
                    <div className='col-4'>
                        <label>Password</label>
                        <input type='password' className='form-control' disabled value={password || ""} />
                    </div>
                </div>
                <div className='row justify-content-around' style={{ marginTop: '30px' }}>
                    <div className='col-4'>
                        <label>Address</label>
                        <input type='text' className='form-control' disabled value={address || ""} />
                    </div>
                    <div className='col-4'>
                        <label>Phone Number</label>
                        <input type='text' className='form-control' disabled value={phone || ""} />
                    </div>
                </div>
                <div className='row justify-content-around' style={{ marginTop: '30px' }}>
                    <div className='col-4'>
                        <label>Create At</label>
                        <input type='text' className='form-control' disabled value={formatDateCreateAt} />
                    </div>
                    <div className='col-4'>
                        <label>Gender</label>
                        <input type='text' className='form-control' disabled value={gender || ""} />
                    </div>
                </div>
                <div className='row justify-content-around' style={{ marginTop: '30px' }}>
                    <div className='col-4'>
                        <label>Updated At</label>
                        <input type='text' className='form-control' disabled value={formatDateUpdateAt || ""} />
                    </div>
                    <div className='col-4'>
                        <label>Role</label>
                        <input type='text' className='form-control' disabled value={role || ""} />
                    </div>
                </div>
                <div className='row justify-content-center' style={{ marginTop: '70px' }}>
                    <div className='col-4 d-flex justify-content-end'>
                        <button className='btn btn-primary' data-bs-toggle="modal" data-bs-target="#modalUpdateInformation">Update Account</button>
                    </div>
                    <div className='col-4 d-flex justify-content-start'>
                        <button className='btn btn-danger'>Change Password</button>
                    </div>
                </div>
            </div>
            <div className='modal fade' id='modalUpdateInformation' tabIndex={-1} aria-labelledby='modalUpdateInformation' aria-hidden="true">
                <div className='modal-dialog modal-lg'>
                    <div className='modal-content'>
                        <div className='modal-header'>
                            <h5 className='modal-title' id='modalUpdateInformation'>Update Account</h5>
                            <button type='button' className='btn-close' data-bs-dismiss="modal" aria-label='Close'></button>
                        </div>
                        <form onSubmit={handleSubmit}>
                            <div className='modal-body'>
                                <div className='row'>
                                    <label>Last Name</label>
                                    <input type='text'
                                        id='lastname'
                                        value={lastname}
                                        onChange={(e) => setLastname(e.target.value)}
                                        className='form-control' />
                                    <br />
                                    <label>First Name</label>
                                    <input type='text'
                                        id='firstname'
                                        value={firstname}
                                        onChange={(e) => setFirstname(e.target.value)}
                                        className='form-control' />
                                    <br />
                                    <label>Address</label>
                                    <input type='text'
                                        id='address'
                                        value={address}
                                        onChange={(e) => setAddress(e.target.value)}
                                        className='form-control' />
                                    <br />
                                    <label>Phone Number</label>
                                    <input type='text'
                                        id='phone'
                                        value={phone}
                                        onChange={(e) => setPhone(e.target.value)}
                                        className='form-control' />
                                    <br />
                                    <label>Gender</label>
                                    <select className="form-select" aria-label="Default select example"
                                        value={gender}
                                        onChange={(e) => setGender(e.target.value)}>
                                        <option>Choose one in others</option>
                                        <option value="Male">Male</option>
                                        <option value="Female">Female</option>
                                        <option value="Others">Others</option>
                                        <option value="Secret">Secret</option>
                                    </select>
                                    <br />
                                    <label>Role</label>
                                    <select className="form-select" aria-label="Default select example"
                                        value={role}
                                        onChange={(e) => setRole(e.target.value)}>
                                        <option>Choose one in others</option>
                                        <option value="Admin">Admin</option>
                                        <option value="Employee">Employee</option>
                                        <option value="Customer/Users">Customer/Users</option>
                                        <option value="Unknown">Unknown</option>
                                    </select>
                                    <br />
                                    <label>Profile Picture</label>
                                    <input type='file' className='form-control' />
                                </div>
                            </div>
                            <div className='modal-footer'>
                                <button type='submit' className='btn btn-primary'>Save changes</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </>
    );
}

export default Profile;
