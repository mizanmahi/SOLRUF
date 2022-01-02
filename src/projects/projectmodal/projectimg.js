import React from 'react'
import './projectimg.css';

function Projectimg(props) {
    return (
        <>
            <img 
                id="projectImg"
                className="d-block w-75"
                src={props.item.image}
                alt="First slide"
                /> 
        </>
    )
}

export default Projectimg
