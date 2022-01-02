import React from 'react'
import './importimg.css';
import AddIcon from '@mui/icons-material/Add';
import LocationCityIcon from '@mui/icons-material/LocationCity';

function Importimg() {
    return (
        
            <div className="installerformPhoto">
                <div className="installerFormImportPhotoHeading">
                        <LocationCityIcon /> <span style={{fontWeight:"bold"}}>Add Photo</span>(3-5MB with .Jpeg .Jpg and .Png Formate)
                </div>
                <input type="file" accept="image"  className="installerformPhotoInput"/>
                <AddIcon className="installerFormImportPhotoIcon" style={{backgroundColor:"#ffba12",fontSize:"55px"}} />
            </div>
       
    )
}

export default Importimg;
