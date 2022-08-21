import React from 'react';

const Button = ({ title, active, onClick }) => {
    return (
        <button
            type="button"
            className="btn btn-text-primary fs-5"
            onClick={onClick}
            style={{
                color: active ? '#f4664c' : '',
                lineHeight: '1.2',
                padding: '10px',
                fontWeight: '600',
                borderRadius: '50px',
                backgroundColor: active ? '#fff' : '',
            }}
        >
            {title}
        </button>
    );
};

export default Button;
