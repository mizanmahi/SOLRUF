import React from 'react'
// import PaginateComponent from '../pagination/pagination';
import Slider from '../slider/slider';
import './projectlist.css';

function Projectlist() {
    return (
        <>
            <div className="projectlistContainer">
            <div className="projectListheading" style={{fontWeight:"bold"}}>Project List</div>
                <div className="allprojects">
                    {/* <PaginateComponent/> */}
                    <Slider/>
                </div>
            </div>
        </>
    )
}

export default Projectlist
