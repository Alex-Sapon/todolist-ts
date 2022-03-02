import React, {FC} from 'react';
import styles from './Button.module.css'

type ButtonPropsType = {
    title: string
}

const Button: FC<ButtonPropsType> = (props) => {

    return (
        <>
            <button className={styles.button}>{props.title}</button>
        </>
    );
};

export default Button;