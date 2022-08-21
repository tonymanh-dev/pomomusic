import React from 'react';

const Spinner = () => {
    return (
        <div
            className="container-fluid bg-primary text-light position-fixed "
            style={{
                top: '0',
                left: '0',
                right: '0',
                height: '100vh',
                zIndex: '999',
                overflow: 'hidden',
            }}
        >
            <div className="d-flex justify-content-center align-items-center h-100">
                <div className="spinner-border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        </div>
    );
};

export default Spinner;
