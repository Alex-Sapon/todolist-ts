import React, {FC} from 'react';
import styles from './Button.module.css';

type ButtonPropsType = {
    title: string
    onClick: () => void
    className?: string
}

const Button: FC<ButtonPropsType> = (props) => {
    // const onClickHandler = () => props.onClick();

    return (
        <button className={`${props.className} ${styles.button}`} onClick={props.onClick}>{props.title}</button>
    );
};

export default Button;