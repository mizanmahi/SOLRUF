import React from 'react';
import './input.css';

function Input(props) {
    return (
        <>
            <input width={props.width} height={props.height} type={props.type} className="installerInputField" placeholder={props.name==='undefined'? "Text":props.name} />   
        </>
      )
}

export default Input;