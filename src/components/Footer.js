import React from 'react';

const Footer = () => {
    return (
        <div
            className="text-center border-top pt-2"
            style={{ margin: '50px 0' }}
        >
            <div className="d-flex justify-content-center align-items-center ">
                <button className="btn border-0 ">
                    <a
                        target="_blank"
                        href="https://twitter.com/manh_tvm"
                        rel="noreferrer noopener"
                        className="fs-2 "
                    >
                        <i className="bi bi-twitter"></i>
                    </a>
                </button>
                <button className="btn border-0 ">
                    <a
                        target="_blank"
                        rel="noreferrer noopener"
                        href="https://github.com/tonymanh-dev"
                        className="fs-2 "
                    >
                        <i className="bi bi-github"></i>
                    </a>
                </button>
                <button className="btn border-0 ">
                    <a
                        href="https://www.linkedin.com/in/tonymanh"
                        target="_blank"
                        rel="noreferrer noopener"
                        className="fs-2 "
                    >
                        <i className="bi bi-linkedin"></i>
                    </a>
                </button>
            </div>

            <div>
                <p className="fs-5 ">
                    Built by{' '}
                    <a
                        href="https://twitter.com/manh_tvm"
                        target="_blank"
                        rel="noreferrer noopener"
                        className="text-decoration-none fs-5 fw-bold"
                    >
                        Tony Manh
                    </a>
                </p>
            </div>
            <div>
                <p className="text-secondary">
                    ©Pomomusic 2022. All Rights Reserved.
                </p>
            </div>
        </div>
    );
};

export default Footer;
