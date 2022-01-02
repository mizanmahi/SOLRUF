import React from 'react'
import './installerform.css';
import  Input from '../input/input';
import LinkIcon from '@mui/icons-material/Link';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import FmdGoodIcon from '@mui/icons-material/FmdGood';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import LocationCityIcon from '@mui/icons-material/LocationCity';


function Installerform() {
    return (
        <div className="installerFormContainer">
                <div className="installerFormHeader">
                    My Portfolio
                </div>
                <div className="installerFormHeading">
                    Installer info
                </div>
                <div className="installerformPhotoAndInputContainer">
                    <div className="installerformPhoto">
                        {/* <img src="#" alt="import  sellar profile" /> */}
                        <div className="installerFormImportPhotoHeading">
                             <LocationCityIcon /> <span style={{fontWeight:"bold"}}>Add Photo</span>(3-5MB with .Jpeg .Jpg and .Png Formate)
                        </div>
                        <input type="file" accept="image" visibility="hidden" className="installerformPhotoInput"/>
                        <AddIcon className="installerFormImportPhotoIcon" style={{backgroundColor:"#ffba12",fontSize:"55px"}} />
                    </div>
                    <div className="installerformAllInput">
                        <div className="eachInstallerInputField">
                            <Input name={"Name"} type="text"  />
                        </div><br/>
                        <div className="eachInstallerInputField">
                            <Input name={"Phone Number"} type="text"  />
                        </div><br/>
                        <div className="eachInstallerInputField">
                            <Input name={"Email"} type="email" width />
                        </div><br/>
                        <div className="eachInstallerInputField">
                            <Input name={"State"} type="text"  /><ArrowDropDownIcon style={{color: "grey",fontSize:"30px"}} className="inputIcon"/>
                        </div><br/>
                        <div className="eachInstallerInputField">
                            <Input name={"Video Introduction"} type="url"  /><LinkIcon style={{color: "grey",fontSize:"30px"}} className="inputIcon"/>
                        </div>
                    </div>
                </div>
                <div className="installerFormDescription">
                    <div style={{fontWeight:"bold",fontSize:"18px"}}>Description</div>
                    <p >paragraph...</p> 
                </div>
                <div className="installerFormCompanyDetails">
                    <div className="installerFormCompanyAndLocation">
                       <div> <Input type="text" name={"Company"}/></div><br/>
                       <div> <Input type="text" name={"GST No"}/></div>
                    </div>
                    <div className="installerFormGstAndTurnover">
                       <div className="installerFormLocation"> <Input type="text" name={"Location"}/> <FmdGoodIcon style={{color: "grey",fontSize:"30px"}} className="inputIcon"/></div><br/>
                       <div> <Input type="text" name={"Turnover"}/></div>
                    </div>
                </div>
                <div className="installerFormTotalProject">
                        <div className="installerFormTotalProjectCounter">
                            <div className="installerFormTotalProjectHeading">Total Projects</div> 
                            <div className="installerFormTotalProjectButtonAndInput">
                                <div className="installerFormTotalProjectBtnLeftdiv"><button className="installerFormTotalProjectBtnLeft">-</button></div>
                                <div className="installerFormTotalProjectInputdiv"><input className="installerFormTotalProjectInput" type="text" /></div>
                                <div className="installerFormTotalProjectBtnRightdiv"><button className="installerFormTotalProjectBtnRight">+</button></div>
                            </div>
                        </div>
                </div>
               <div className="installerFormSearchService">
                    <Input type="text" name="Search Services" /> <SearchIcon style={{color: "grey",fontSize:"30px"}} className="inputSearchIcon" />
               </div>
               <div className="installerFormAddCertificateContainer">
                   <div className="installerFormAddCertificateHeading">Add Certificate</div>
                   <div className="installerFormAddCertificateInputAndButton">
                         <div className="installerFormAddCertificateInputdiv">
                            <input type="file" className="installerFormAddCertificateInput"/>
                         </div>
                         <div className="installerFormAddCertificateButtondiv">
                            <button className="installerFormAddCertificateButton">+Add Documents</button>
                         </div>
                   </div>
               </div>
               <div className="installerFormSaveContainer">
                    <div className="installFormSavebtndiv">
                        <button className="installerFormSaveBtn">Save</button>
                    </div>
               </div>
            
        </div>
    )
}

export default Installerform;
