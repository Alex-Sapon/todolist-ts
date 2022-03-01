import React from 'react';

type ButtonPropsType = {
    title: string
}

const Button = (props: ButtonPropsType) => {
    return (
        <div>
            <button>{props.title}</button>
        </div>
    );
};

export default Button;