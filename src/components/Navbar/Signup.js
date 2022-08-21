import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import { GoogleAuthProvider, FacebookAuthProvider } from 'firebase/auth';
import { UserContext } from '../../Context/UserContext';
import { googleIcon, fbIcon } from '../../Utils/constant';

const googleProvider = new GoogleAuthProvider();
const fbProvider = new FacebookAuthProvider();

const Login = () => {
    const {
        handleLogin,
        handleRegister,
        registerByEmail,
        setRegisterByEmail,
        invalid,
    } = useContext(UserContext);
    const navigate = useNavigate();

    const handleChangeRegisterForm = (e) => {
        const { value, name } = e.target;
        setRegisterByEmail((prev) => {
            return {
                ...prev,
                [name]: value,
            };
        });
    };

    return (
        <div
            className="container-fluid bg-primary position-absolute h-100 pb-5"
            style={{
                top: '0',
                left: '0',
                bottom: '0',
                zIndex: '2000',
                paddingTop: '20px',
                overflow: 'auto',
            }}
        >
            <div className="text-center mb-2">
                <button
                    type="button"
                    className="btn border-0 fw-bold text-light "
                    style={{ fontSize: '36px' }}
                    onClick={() => navigate('/')}
                >
                    Pomomusic
                </button>
            </div>
            <div
                className="m-auto bg-white px-5 py-3 text-center rounded-3 shadow-lg"
                style={{ maxWidth: '400px' }}
            >
                <div className="d-flex flex-column gap-3 align-items-center py-3">
                    <button
                        type="button"
                        className="btn btn-light border-0 text-secondary text-start rounded-5 w-100"
                        onClick={() => handleLogin(googleProvider)}
                    >
                        <img src={googleIcon} alt="" className="mx-4" />
                        <span className="fs-4 fw-bold ">
                            Sign up with Google
                        </span>
                    </button>
                    <button
                        type="button"
                        className="btn btn-light border-0 text-secondary text-start rounded-5 w-100"
                        onClick={() => handleLogin(fbProvider)}
                    >
                        <img
                            src={fbIcon}
                            alt=""
                            className="mx-4"
                            style={{ height: '24px', width: '24px' }}
                        />
                        <span className="fs-4 fw-bold">
                            Sign up with Facebook
                        </span>
                    </button>
                </div>
                <div className="container text-center mb-2">
                    <div className="row align-items-center text-secondary fs-5 fw-bold">
                        <div
                            className="col bg-secondary opacity-25 me-3"
                            style={{ width: '100%', height: '1px' }}
                        ></div>
                        Or
                        <div
                            className="col bg-secondary opacity-25 ms-3"
                            style={{ width: '100%', height: '1px' }}
                        ></div>
                    </div>
                </div>

                <form className="row needs-validation " noValidate>
                    <div className="col-12 text-start mb-3">
                        <label
                            htmlFor="userForm"
                            className="form-label text-secondary fw-bold fs-5"
                        >
                            Name
                        </label>
                        <input
                            type="text"
                            placeholder="Taylor Swift"
                            className="form-control p-2 fs-4 rounded-1 border-0"
                            style={{ backgroundColor: '#f0f2f5' }}
                            name="displayName"
                            value={registerByEmail.displayName}
                            onChange={handleChangeRegisterForm}
                        />
                    </div>
                    <div className="col-12 text-start mb-3">
                        <label
                            htmlFor="userForm"
                            className="form-label text-secondary fw-bold fs-5"
                        >
                            Email
                            <span className="text-primary ms-1">*</span>
                        </label>
                        <input
                            type="email"
                            required
                            placeholder="pomomusic@gmail.com"
                            className="form-control p-2 fs-4 rounded-1 border-0"
                            style={{ backgroundColor: '#f0f2f5' }}
                            name="email"
                            value={registerByEmail.email}
                            onChange={handleChangeRegisterForm}
                        />
                    </div>
                    <div className="col-12 text-start mb-3">
                        <label
                            htmlFor="userForm"
                            className="form-label text-secondary fw-bold fs-5"
                        >
                            Password
                            <span className="text-primary ms-1">*</span>
                        </label>
                        <input
                            type="password"
                            className="form-control p-2 fs-4 rounded-1 border-0"
                            style={{ backgroundColor: '#f0f2f5' }}
                            onChange={handleChangeRegisterForm}
                            name="password"
                            value={registerByEmail.password}
                        />
                    </div>
                    {invalid && (
                        <div className="col text-primary fs-6">
                            <span>{invalid}</span>
                        </div>
                    )}
                    <div className="col-12">
                        <button
                            className="btn btn-dark rounded-5 my-3 fs-4 p-2 w-100"
                            type="submit"
                            onClick={(e) => {
                                e.preventDefault();
                                handleRegister();
                            }}
                        >
                            Sign up with email
                        </button>
                    </div>
                </form>
            </div>
            <div className="mt-3 text-center text-light fs-5 fw-bold ">
                <div className="opacity-50">Already have an account?</div>
                <button
                    type="button"
                    className="btn border-0 text-light fs-4 fw-bold text-decoration-underline"
                    onClick={() => navigate('/login')}
                >
                    Let's sign in
                </button>
            </div>
        </div>
    );
};

export default Login;
