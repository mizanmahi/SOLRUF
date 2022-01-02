import React from 'react';
import './gridinput.css';

function Gridinput(props) {
    return (
        <>
            <input type="text" placeholder={props.name} className="gridInput" />
        </>
    )
}

export default Gridinput;