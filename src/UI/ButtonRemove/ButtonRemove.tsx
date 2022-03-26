import React, {FC} from 'react'
import styles from './ButtonRemove.module.css'
import {FaTrashAlt} from 'react-icons/all';

type ButtonRemoveProps = {
    onClick: () => void
    className?: string
}

const ButtonRemove: FC<ButtonRemoveProps> = ({onClick, className}) => {
    return <FaTrashAlt className={`${styles.button_remove} ${className}`} onClick={onClick}/>
}

export default ButtonRemove