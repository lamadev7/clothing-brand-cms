import React from 'react';

export default function Logo() {
    const style = {
        height: '60px',
        borderRadius: '10px'
    };

    return (
        <div className="logo">
            <img
                style={style}
                src="../media/logo.png"
                alt="TRBL Design Logo"
            />
        </div>
    )
}