import React from "react";

const Button = (props) => {
    const { id, type, label, buttonClass } = props;

    return (
        <>
            <button type={type} id={id} className={buttonClass}>{label}</button>
        </>
    );
};

export default Button;
