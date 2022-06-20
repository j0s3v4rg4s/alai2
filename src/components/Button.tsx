import * as React from 'react';
import Btn, { ButtonProps } from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';

export type ButtonProp = ButtonProps & { load?: boolean };

const Button: React.FC<ButtonProp> = (props) => {
    const { load, children, disabled, ...defaultProps } = props;
    return (
        <Btn {...defaultProps} disabled={disabled || load}>
            {load ? <CircularProgress size={25} color='inherit' /> : children }
        </Btn>
    );
};

export default Button;
