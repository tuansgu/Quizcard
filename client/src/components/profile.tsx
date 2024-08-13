import React from 'react'
import Home from './home'

const Profile = () => {
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
                        <input type='text' className='form-control' disabled />
                    </div>
                    <div className='col-4'>
                        <label>First Name</label>
                        <input type='text' className='form-control' disabled />
                    </div>
                </div>
                <div className='  row justify-content-around' style={{ marginTop: '30px' }}>
                    <div className='col-4'>
                        <label>Email</label>
                        <input type='text' className='form-control' disabled />
                    </div>
                    <div className='col-4'>
                        <label>Password</label>
                        <input type='text' className='form-control' disabled />
                    </div>
                </div>
                <div className='row justify-content-around' style={{ marginTop: '30px' }}>
                    <div className='col-4'>
                        <label>Address</label>
                        <input type='text' className='form-control' disabled />
                    </div>
                    <div className='col-4'>
                        <label>Phone Number</label>
                        <input type='text' className='form-control' disabled />
                    </div>
                </div>
                <div className='  row justify-content-around' style={{ marginTop: '30px' }}>
                    <div className='col-4'>
                        <label>Create At</label>
                        <input type='date' className='form-control' disabled />
                    </div>
                    <div className='col-4'>
                        <label>Gender</label>
                        <select className="form-select" aria-label="Default select example" disabled>
                            <option selected>Choose one in others</option>
                            <option value="1">Male</option>
                            <option value="2">Female</option>
                            <option value="3">Others</option>
                            <option value="4">Secret</option>
                        </select>
                    </div>
                </div>
                <div className='  row justify-content-around' style={{ marginTop: '30px' }}>
                    <div className='col-4'>
                        <label>Updated At</label>
                        <input type='date' className='form-control' disabled />
                    </div>
                    <div className='col-4'>
                        <label>Role</label>
                        <select className="form-select" aria-label="Default select example" disabled>
                            <option selected>Choose one in others</option>
                            <option value="1">Admin</option>
                            <option value="2">Employee</option>
                            <option value="3">Customer/Users</option>
                            <option value="4">Unknown</option>
                        </select>
                    </div>
                </div>
                <div className='row justify-content-center' style={{ marginTop: '70px' }}>
                    <div className='col-4 d-flex justify-content-end'>
                        <button className='btn btn-primary'>Update Account</button>
                    </div>
                    <div className='col-4 d-flex justify-content-start'>
                        <button className='btn btn-danger'>Change Password</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Profile;
