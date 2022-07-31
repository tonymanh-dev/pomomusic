import React from 'react';

const Button = ({ title, active, _callback }) => {
    const styleBtn = `${active} btn  text`;

    return (
        <button
            type="button"
            className={styleBtn}
            onClick={_callback}
            style={{
                color: active ? '#f4664c' : '#fff',
                // minWidth: '60px',
                fontSize: '16px',
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
