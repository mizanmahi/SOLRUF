import React from 'react'
import './Grid.css'
import ModeIcon from '@mui/icons-material/Mode';
import DeleteIcon from '@mui/icons-material/Delete';
import PushPinIcon from '@mui/icons-material/PushPin';

function Grid() {
    return (
        <div className="gridContainer">
            <div className="gridprojectNameAndPin">
                <div className="gridprojectName">Project Name.....</div>
                <div className="gridprojectPin"><PushPinIcon />Pin</div>
            </div>
            <div className="gridprojectCompanyRsSellar">
                <div>Company Address</div>
                <div>Rs: 12345567.78</div>
                <div>Atul Sagar</div>
            </div>
            <div className="gridprojectAllImageContainer">
               <div className="gridprojectAllImageEachDiv"><img src="#" alt="project pic first4" /></div>
               <div className="gridprojectAllImageEachDiv"><img src="#" alt="project pic first4" /></div>
               <div className="gridprojectAllImageEachDiv"><img src="#" alt="project pic first4" /></div>
               <div className="gridprojectAllImageEachDiv"><img src="#" alt="project pic first4" /></div>
            </div>
            <hr/>
            <div className="gridprojectEditAndDeletebtn">
                <div className="gridprojectEditbtn" ><ModeIcon /> Edit</div>
                <div className="gridprojectDeletebtn"><DeleteIcon/> Delete</div>
            </div>
        </div>
    )
}

export default Grid;
