import React from 'react';
import './project.css';


function Project(props) {
   //console.log(props);


    return (
        <div className="projectContainer" onClick={()=>props.onSelect(props.key)} >
            {/* <div className="projectsImage">
                    <img style={{width:"350px",height:"350px"}}
                    className="d-block w-100"
                    src={props.data.image}
                    alt="First slide"
                    />
            </div>
            <div className="cityInfo">
            {props.data.state}<br/>
            {props.data.power}
            </div>
            <div className="projectName">
                {props.data.plant}
            </div> */}
        </div>
    )
}

export default Project
