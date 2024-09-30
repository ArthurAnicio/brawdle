import { InputHTMLAttributes } from "react";
import { Link } from "react-router-dom";

import './styles.css'

interface ButtonProps extends InputHTMLAttributes<HTMLInputElement> {
    path: string;
    label: string;
}
const Button:React.FC<ButtonProps> =({path, label}) => {
    return (
        <Link id="link" to={path}>
            <label htmlFor="">{label}</label>
        </Link>
    )
}

export default Button;