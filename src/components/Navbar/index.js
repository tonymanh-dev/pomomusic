import React, { useState, useContext } from 'react';
import Settings from '../Settings';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../../Context/UserContext';
import Spinner from '../Spinner';

import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import 'tippy.js/themes/light.css';

const links = [
    { label: 'About', to: '#about' },
    { label: 'How is work', to: '#howIsWork' },
];

const Navbar = () => {
    const [isShow, setIsShow] = useState(false);
    const { isLoading, user, handleLogout, pathname } = useContext(UserContext);
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
                    className="container-sm d-flex justify-content-space-between px-md-5 px-4"
                    style={{ maxWidth: '800px' }}
                >
                    <div className="d-flex d-md-none">
                        <button
                            type="button"
                            className="btn text-light fs-3 text me-0 border-0 px-0"
                            onClick={handleShowModal}
                        >
                            <i className="bi bi-gear-fill"></i>
                        </button>
                    </div>
                    <div>
                        <Link
                            to="/"
                            onClick={() => {
                                window.scrollTo({
                                    top: 0,
                                    left: 0,
                                    behavior: 'smooth',
                                });
                            }}
                            className="text-light navbar-brand fs-3 text fw-bold"
                        >
                            PomoMusic
                        </Link>
                    </div>

                    {pathname === '/' && (
                        <div className="collapse navbar-collapse  me-4">
                            <ul className="navbar-nav ms-auto align-items-center gap-3">
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
                                        className="btn text-light fs-4 text me-0 border-0 px-2"
                                        onClick={handleShowModal}
                                    >
                                        Settings
                                    </button>
                                </li>
                            </ul>
                        </div>
                    )}

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
                                            className="fs-5 fw-bold border-0 bg-white"
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
                                            className="fs-5 fw-bold border-0 bg-white"
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
                                            className="border-top fs-5 fw-bold w-100 border-0 bg-white pt-2 text-start"
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
                                    className="btn d-flex align-items-center rounded-pill border-0 py-0 px-0"
                                >
                                    {user.image_url ? (
                                        <img
                                            src={user.photoURL}
                                            alt=""
                                            width="28"
                                            height="28"
                                            className="d-inline-block rounded-circle border align-text-top"
                                        />
                                    ) : (
                                        <span className="fs-2 text-light">
                                            <i className="bi bi-person-circle"></i>
                                        </span>
                                    )}
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
                                className="btn d-flex align-items-center rounded-pill text-light fs-2 border-0 py-0 px-0"
                                onClick={() => navigate('/login')}
                            >
                                <i className="bi bi-person-circle"></i>
                            </button>
                        </div>
                    )}
                </div>
                {isShow && (
                    <Settings closeModal={handleCloseModal} isShow={isShow} />
                )}
            </nav>
        </>
    );
};

export default Navbar;
