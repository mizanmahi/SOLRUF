import React from 'react'
import './displayuser.css';
import logo from '../webui/images/brain-electrical-logo.png';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import LocationCityIcon from '@mui/icons-material/LocationCity';
import WifiCalling3Icon from '@mui/icons-material/WifiCalling3';
import EmailIcon from '@mui/icons-material/Email';
import Video from './video';
import LaunchIcon from '@mui/icons-material/Launch';

let url="https://drive.google.com/file/d/1qLkmViEo4-p5rcr_-VUUsgqdC57Zpdu9/view?usp=sharing"

function Displayuser() {
    return (
        <div className="displayUserContainer">
            <div className="portfheader">
                <div className="logoDiv">
                    <div className="brain-electrical">
                        <img src={logo} alt="brrain electrical" />
                    </div>
                    <div><h2>Brain Electrical</h2></div>
                </div>
                <div className="tagheader">
                    <div className="tag1">Tag #1</div>
                    <div className="tag2">Tag #2</div>
                    <div className="tag3">Tag #3</div>
                </div>
            </div>
            <div className="loremIpsum">
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor 
                incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud 
                exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure 
                dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. 
                Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit 
                anim id est laborum.</p>
            </div>
            <div className="sellarInfo">
                <div className="sellarDetails">
                    <ul>
                        <li className="sellarDetailsulli"><p className="sellarLocation"><LocationOnIcon style={{color: "#6c757d",marginRight:"10px"}}/><span className="sellarAbout">Location:- </span><span className="sellarAboutvalue">Mumbai</span></p></li>
                        <li className="sellarDetailsulli"><p className="sellarCity"><LocationCityIcon style={{color: "#6c757d",marginRight:"10px"}} /> <span className="sellarAbout">State:- </span><span className="sellarAboutvalue"> Maharashtra</span></p></li>
                        <li className="sellarDetailsulli"><p className="sellarMobile"><WifiCalling3Icon style={{color: "#6c757d",marginRight:"10px"}} /><span className="sellarAbout">Mobile Number:- </span><span className="sellarAboutvalue"> 9921456852</span></p></li>
                        <li className="sellarDetailsulli"><p className="sellarEmail"><EmailIcon style={{color: "#6c757d",marginRight:"10px"}} /><span className="sellarAbout"> Email:- </span><span className="sellarAboutvalue" > example12@gmail.com</span></p></li>
                        <li className="sellarDetailsulli">
                        <p className="sellarCertificate">Certification</p>
                            <ul>
                                <li className="sellarCertificateulli"><a href={url} target="_blank" rel="noreferrer"  >Name <LaunchIcon style={{fontSize: '15px'}} /> </a></li>
                                <li className="sellarCertificateulli"><a href={url} target="_blank" rel="noreferrer"  >Name <LaunchIcon style={{fontSize: '15px'}} /> </a></li>
                                <li className="sellarCertificateulli"><a href={url} target="_blank" rel="noreferrer"  >Name <LaunchIcon style={{fontSize: '15px'}} /> </a></li>
                            </ul>
                        </li>
                    </ul>
                </div>
                <div className="sellarImage">
                    <ul>
                        <li className="sellarImageulli"><Video/></li>
                        <li className="sellarImageulli"> <p className="sellar" ><span className="sellarAbout">Turnover:- </span><span className="sellarAboutvalue" >20lacks/year</span></p></li>
                        <li className="sellarImageulli"> <p className="sellar" ><span className="sellarAbout">Total Participation:- </span><span className="sellarAboutvalue" >300-400</span></p></li>
                        <li className="sellarImageulli"> <p className="sellar" ><span className="sellarAbout">GST Number:- </span><span className="sellarAboutvalue" >123456</span></p></li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Displayuser;
