import React from 'react';

export const Input = ({ label, type, id, value, name, onChange, min }) => {
    return (
        <div>
            {label && (
                <label
                    htmlFor={id}
                    className="form-label opacity-75 text-dark fw-bold"
                    style={{ fontSize: '14px' }}
                >
                    {label}
                </label>
            )}
            <input
                type={type}
                min={min}
                id={id}
                value={value}
                name={name}
                onChange={onChange}
                className="form-control fs-5 ps-2 p-2 text-dark rounded-1 border-0 fw-semibold"
                style={{ maxWidth: '90px', background: '#f0f2f5' }}
            />
        </div>
    );
};
