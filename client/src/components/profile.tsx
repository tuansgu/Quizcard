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
    const [newpwd, setNewPassword] = useState("");
    const [currentpwd, setCurrentPassword] = useState("");
    const [confirmpwd, setConfirmPassword] = useState("");


    const handleChangePassword = async (e) => {
        e.preventDefault();

        if (newpwd !== confirmpwd) {
            toast.error("Confirm New Password is Incorrect");
        } else if (newpwd === currentpwd) {
            toast.error("New password cannot be the same as the current password");
        } else {
            try {
                await axios.put(`http://localhost:3002/updatepassword`, {
                    old_password: currentpwd,
                    new_password: newpwd
                }, { withCredentials: true });
                toast.success("Password Updated Successfully");
            } catch (error) {
                toast.error("Error Updating Password");
            }
        }
    };

    const formatDateTime = (dateString) => {
        const dateObj = new Date(dateString);
        return !isNaN(dateObj.getTime()) ? dateObj.toISOString().slice(0, 16) : "";
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const update_at = new Date().toISOString();

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
                const data = response.data;
                setLastname(data.lastname);
                setFirstname(data.firstname);
                setEmail(data.email);
                setPassword(data.password);
                setPhone(data.phone);
                setAddress(data.address);
                setCreateAt(data.create_at);
                setUpdateAt(data.update_at);
                setGender(data.gender);
                setRole(data.role);
            } catch (err) {
                console.error(err);
            }
        };
        fetchProfile();
    }, []);

    return (
        <>
            <Home />
            <div className='container mt-5'>
                <h1 className='text-center mb-5'>Personal Information</h1>
                <div className='row gy-4'>
                    <div className='col-md-6'>
                        <label>Last Name</label>
                        <input type='text' className='form-control' disabled value={lastname || ""} />
                    </div>
                    <div className='col-md-6'>
                        <label>First Name</label>
                        <input type='text' className='form-control' disabled value={firstname || ""} />
                    </div>
                    <div className='col-md-6'>
                        <label>Email</label>
                        <input type='text' className='form-control' disabled value={email || ""} />
                    </div>
                    <div className='col-md-6'>
                        <label>Password</label>
                        <input type='password' className='form-control' disabled value={password || ""} />
                    </div>
                    <div className='col-md-6'>
                        <label>Address</label>
                        <input type='text' className='form-control' disabled value={address || ""} />
                    </div>
                    <div className='col-md-6'>
                        <label>Phone Number</label>
                        <input type='text' className='form-control' disabled value={phone || ""} />
                    </div>
                    <div className='col-md-6'>
                        <label>Create At</label>
                        <input type='text' className='form-control' disabled value={formatDateTime(createat)} />
                    </div>
                    <div className='col-md-6'>
                        <label>Gender</label>
                        <input type='text' className='form-control' disabled value={gender || ""} />
                    </div>
                    <div className='col-md-6'>
                        <label>Updated At</label>
                        <input type='text' className='form-control' disabled value={formatDateTime(updateat) || "NULL"} />
                    </div>
                    <div className='col-md-6'>
                        <label>Role</label>
                        <input type='text' className='form-control' disabled value={role || ""} />
                    </div>
                </div>

                <div className='d-flex justify-content-center mt-5'>
                    <button className='btn btn-primary mx-2' data-bs-toggle="modal" data-bs-target="#modalUpdateInformation">Update Account</button>
                    <button className='btn btn-danger mx-2' data-bs-toggle="modal" data-bs-target="#changePassword">Change Password</button>
                </div>
            </div>

            {/* Update Account Modal */}
            <div className='modal fade' id='modalUpdateInformation' tabIndex={-1} aria-labelledby='modalUpdateInformationLabel' aria-hidden="true">
                <div className='modal-dialog modal-lg'>
                    <div className='modal-content'>
                        <div className='modal-header'>
                            <h5 className='modal-title' id='modalUpdateInformationLabel'>Update Account</h5>
                            <button type='button' className='btn-close' data-bs-dismiss="modal" aria-label='Close'></button>
                        </div>
                        <form onSubmit={handleSubmit}>
                            <div className='modal-body'>
                                <div className='mb-3'>
                                    <label>Last Name</label>
                                    <input type='text' className='form-control' value={lastname} onChange={(e) => setLastname(e.target.value)} />
                                </div>
                                <div className='mb-3'>
                                    <label>First Name</label>
                                    <input type='text' className='form-control' value={firstname} onChange={(e) => setFirstname(e.target.value)} />
                                </div>
                                <div className='mb-3'>
                                    <label>Address</label>
                                    <input type='text' className='form-control' value={address} onChange={(e) => setAddress(e.target.value)} />
                                </div>
                                <div className='mb-3'>
                                    <label>Phone Number</label>
                                    <input type='text' className='form-control' value={phone} onChange={(e) => setPhone(e.target.value)} />
                                </div>
                                <div className='mb-3'>
                                    <label>Gender</label>
                                    <select className='form-select' value={gender} onChange={(e) => setGender(e.target.value)}>
                                        <option value="">Choose one</option>
                                        <option value="Male">Male</option>
                                        <option value="Female">Female</option>
                                        <option value="Others">Others</option>
                                        <option value="Secret">Secret</option>
                                    </select>
                                </div>
                                <div className='mb-3'>
                                    <label>Role</label>
                                    <select className='form-select' value={role} onChange={(e) => setRole(e.target.value)}>
                                        <option value="">Choose one</option>
                                        <option value="Admin">Admin</option>
                                        <option value="Employee">Employee</option>
                                        <option value="Customer/Users">Customer/Users</option>
                                        <option value="Unknown">Unknown</option>
                                    </select>
                                </div>
                                <div className='mb-3'>
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

            {/* Change Password Modal */}
            <div className='modal fade' id='changePassword' tabIndex={-1} aria-labelledby='changePasswordLabel' aria-hidden="true">
                <div className='modal-dialog modal-lg'>
                    <div className='modal-content'>
                        <div className='modal-header'>
                            <h5 className='modal-title' id='changePasswordLabel'>Change Password</h5>
                            <button type='button' className='btn-close' data-bs-dismiss="modal" aria-label='Close'></button>
                        </div>
                        <form onSubmit={handleChangePassword}>
                            <div className='modal-body'>
                                <div className='mb-3'>
                                    <label>Current Password</label>
                                    <input type='password' className='form-control' value={currentpwd} onChange={(e) => setCurrentPassword(e.target.value)} />
                                </div>
                                <div className='mb-3'>
                                    <label>New Password</label>
                                    <input type='password' className='form-control' value={newpwd} onChange={(e) => setNewPassword(e.target.value)} />
                                </div>
                                <div className='mb-3'>
                                    <label>Confirm New Password</label>
                                    <input type='password' className='form-control' value={confirmpwd} onChange={(e) => setConfirmPassword(e.target.value)} />
                                </div>
                            </div>
                            <div className='modal-footer'>
                                <button type='submit' className='btn btn-primary'>Save Changes</button>
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
