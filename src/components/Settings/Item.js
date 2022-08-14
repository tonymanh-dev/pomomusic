import React from 'react';

const Item = ({ children }) => {
    return (
        <div className="d-flex justify-content-between align-items-center py-3 border-bottom">
            {children}
        </div>
    );
};

export default Item;
