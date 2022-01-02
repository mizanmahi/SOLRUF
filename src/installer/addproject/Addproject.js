import React from 'react';
import './Addproject.css';
import Grid from '../grid/Grid';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

function Addproject() {
    return (
       <div className="addprojectMainContainer">
            <div className="addprojectContainer">
                <div className="addprojectContainerButtonHeading">
                    <div className="addprojectHeading">
                        Add your project right here
                    </div>
                    <div className="addprojectHeaderButton">
                        + Add Project
                    </div>
                </div>
                <div className="addprojectAllProjectsBtn">
                    <button className="addprojectPlusButton">
                        <AddCircleOutlineIcon style={{color:"#ffba08",fontSize:"40px"}} />
                    </button>
                    <Grid/>
                </div>
            </div>
       </div>
    )
}

export default Addproject;
