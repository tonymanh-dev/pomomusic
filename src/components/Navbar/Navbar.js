import React, { useState, useContext } from 'react';
import ModalSettings from '../Settings/ModalSettings';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../../Context/UserContext';
import Spinner from '../Spinner';

import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import 'tippy.js/themes/light.css';
import { noPhoto } from '../../Utils/constant';

const links = [
    { label: 'About', to: '#about' },
    { label: 'How is work', to: '#howIsWork' },
];

const Navbar = () => {
    const [isShow, setIsShow] = useState(false);
    const { isLoading, user, handleLogout } = useContext(UserContext);
    const navigate = useNavigate();

    const handleShowModal = () => {
        setIsShow(true);
    };

    const handleCloseModal = () => {
        setIsShow(false);
    };

    const displayName = () => {
        let name = '';
        if (user) {
            name = /\s/g.test(user.displayName)
                ? user.displayName.substring(0, user.displayName.indexOf(' '))
                : user.displayName;
        }
        return name;
    };

    return (
        <>
            {isLoading && <Spinner />}

            <nav
                className="navbar bg-primary navbar-expand-md fixed-top"
                style={{ height: '54px', zIndex: '10' }}
            >
                <div
                    className="container-sm d-flex justify-content-space-between px-4 px-md-5"
                    style={{ maxWidth: '800px' }}
                >
                    <div className="d-flex d-md-none">
                        <button
                            type="button"
                            className="btn border-0 px-0 text-light fs-3 text me-0"
                            onClick={handleShowModal}
                        >
                            <i className="bi bi-gear-fill"></i>
                        </button>
                    </div>
                    <div>
                        <Link
                            to="/"
                            className="text-light navbar-brand fs-3 text fw-bold"
                        >
                            PomoMusic
                        </Link>
                    </div>

                    <div className="collapse navbar-collapse  me-4">
                        <ul className="navbar-nav ms-auto align-items-center">
                            {links.map((link) => (
                                <li key={link.to} className="nav-item">
                                    <a
                                        className="nav-link fs-4 text-light"
                                        href={link.to}
                                    >
                                        {link.label}
                                    </a>
                                </li>
                            ))}
                            <li className="nav-item">
                                <button
                                    type="button"
                                    className="btn border-0 px-2 text-light fs-4 text me-0"
                                    onClick={handleShowModal}
                                >
                                    Settings
                                </button>
                            </li>
                        </ul>
                    </div>

                    {user ? (
                        <div className="d-flex">
                            <Tippy
                                theme={'light'}
                                interactive={true}
                                trigger={'click'}
                                content={
                                    <div
                                        className="d-flex flex-column align-items-start gap-2 py-1"
                                        style={{ minWidth: '100px' }}
                                    >
                                        <button
                                            type="button"
                                            className="border-0 bg-white fs-5 fw-bold"
                                            onClick={() => {
                                                navigate('/myplaylist');
                                            }}
                                        >
                                            <span className="text-dark">
                                                My Playlist
                                            </span>
                                        </button>
                                        <button
                                            type="button"
                                            className="border-0 bg-white fs-5 fw-bold"
                                            onClick={() => {
                                                navigate('/uploadmusic');
                                            }}
                                        >
                                            <span className="text-dark">
                                                Submit music
                                            </span>
                                        </button>
                                        <button
                                            type="button"
                                            className="border-0 border-top bg-white fs-5 pt-2 fw-bold w-100 text-start"
                                            onClick={handleLogout}
                                        >
                                            <span className="text-secondary">
                                                Log out
                                            </span>
                                        </button>
                                    </div>
                                }
                            >
                                <button
                                    type="button"
                                    className="btn py-0 px-0 d-flex align-items-center rounded-pill border-0"
                                >
                                    <img
                                        src={
                                            user.photoURL === null
                                                ? noPhoto
                                                : user.photoURL
                                        }
                                        alt=""
                                        width="28"
                                        height="28"
                                        className="d-inline-block align-text-top rounded-circle"
                                    />
                                    <span
                                        className="d-none d-sm-flex fs-5 text text-light fw-bolder ms-2"
                                        style={{
                                            maxWidth: '100px',
                                            overflow: 'hidden',
                                            whiteSpace: 'nowrap',
                                        }}
                                    >
                                        {displayName()}
                                    </span>
                                </button>
                            </Tippy>
                        </div>
                    ) : (
                        <div>
                            <button
                                type="button"
                                className="btn py-0 px-0 d-flex align-items-center rounded-pill text-light fs-2 border-0"
                                onClick={() => navigate('/login')}
                            >
                                <i className="bi bi-person-circle"></i>
                            </button>
                        </div>
                    )}
                </div>
                {isShow && (
                    <ModalSettings
                        closeModal={handleCloseModal}
                        isShow={isShow}
                    />
                )}
            </nav>
        </>
    );
};

export default Navbar;
