import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { GoogleAuthProvider, FacebookAuthProvider } from 'firebase/auth';
import { UserContext } from '../../Context/UserContext';
import { fbIcon, googleIcon } from '../../Utils/constant';

const googleProvider = new GoogleAuthProvider();
const fbProvider = new FacebookAuthProvider();

const Login = () => {
    const { handleLogin, loginByEmail, setLoginByEmail, invalid } =
        useContext(UserContext);
    const navigate = useNavigate();

    const handleChangeLoginForm = (e) => {
        const { value, name } = e.target;
        setLoginByEmail((prev) => {
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
                zIndex: '2000',
                paddingTop: '20px',
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
                <div className="d-flex flex-column gap-3  py-3">
                    <button
                        type="button"
                        className="btn btn-light border-0 text-secondary text-start rounded-5 w-100"
                        onClick={() => handleLogin(googleProvider)}
                    >
                        <img src={googleIcon} alt="" className="mx-4" />
                        <span className="fs-4 fw-bold ">
                            Sign in with Google
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
                            Sign in with Facebook
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
                            Email
                        </label>
                        <input
                            type="email"
                            placeholder="pomomusic@gmail.com"
                            className="form-control p-2 fs-4 rounded-1 border-0"
                            style={{ backgroundColor: '#f0f2f5' }}
                            name="email"
                            value={loginByEmail.email}
                            onChange={handleChangeLoginForm}
                        />
                    </div>
                    <div className="col-12 text-start mb-3">
                        <div className="d-flex justify-content-between">
                            <label
                                htmlFor="userForm"
                                className="form-label text-secondary fw-bold fs-5"
                            >
                                Password
                            </label>
                            <label
                                type="button"
                                className=" border-0 text-reset opacity-50 fs-5 text-decoration-underline"
                                onClick={() =>
                                    alert(
                                        'Oh, Sorry to heard that. Better luck next time 🥺🤭🤣',
                                    )
                                }
                            >
                                Forgot password?
                            </label>
                        </div>
                        <input
                            type="password"
                            className="form-control p-2 fs-4 rounded-1 border-0"
                            style={{ backgroundColor: '#f0f2f5' }}
                            onChange={handleChangeLoginForm}
                            name="password"
                            value={loginByEmail.password}
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
                                handleLogin();
                            }}
                        >
                            Sign in with email
                        </button>
                    </div>
                </form>
            </div>
            <div className="mt-3 text-center text-light fs-5 fw-bold ">
                <div className="opacity-50">Don't have an account?</div>
                <button
                    type="button"
                    className="btn border-0 text-light fs-4 fw-bold text-decoration-underline"
                    onClick={() => navigate('/signup')}
                >
                    Let's create one
                </button>
            </div>
        </div>
    );
};

export default Login;
