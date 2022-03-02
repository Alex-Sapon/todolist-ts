import React, {FC} from 'react';
import styles from './Button.module.css'

type ButtonPropsType = {
    title: string
    onClick: () => void
}

const Button: FC<ButtonPropsType> = (props) => {

    const onClickHandler = () => props.onClick();

    return (
        <button className={styles.button} onClick={onClickHandler}>{props.title}</button>
    );
};

export default Button;