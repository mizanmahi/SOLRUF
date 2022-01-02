import React from 'react';
import './projectmodal.css';
import Carousel from 'react-elastic-carousel';
import jsonData from '../indiasolarproject.json';
import Projectimg from './projectimg'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';




const breakPoints=[
    {width:1, itemsToShow: 1},
    {width:250, itemToShow: 2},
    {width:368,itemsToShow:3},
    {width:600,itemsToShow:4}
]

function Projectmodal() {
    return (
        <>
            <div className="modalHeader" style={{backgroundColor:"white"}}>
                <div className="modal-title">Project Name</div>
                <div className="modal-location">Location(city name)</div>
            </div>   
            <div className="project-description" style={{backgroundColor:"white"}}>
                <div className="descriptionHeading">Description Heading</div>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur</p>
            </div> 
            <div className="projectsModalImage" style={{backgroundColor:"white"}}>
                {/* <div className="projectImg">img1</div> */}
                <Carousel breakPoints={breakPoints} >
                    {
                        jsonData.map((item)=>{
                        return   <Projectimg item={item} />                                     
                        })
                    }
              </Carousel>
            </div>  
            <div className="costofProduts" style={{backgroundColor:"white"}}>
                <div className="costofProductHeading">Product Cost Heading</div>
                <div><label>Solar Price</label>₹: 34000</div>
                <div><label>Solar Batterie</label> ₹: 2120</div>
                <div><label>Cabels</label>₹: 4955</div>
                <div><label>Installtion charge</label>₹: 23443</div>
                <div><label>Charges</label> ₹: 3200</div>
                <div><label>Total cost</label> ₹: 102342</div>
            </div>    
            <div className="customerReview" style={{backgroundColor:"white"}}>
                <div className="customerReviewHeading">Customer Review</div>
                <div className="eachCustomerReview" >
                    <div>
                        <AccountCircleIcon style={{fontSize:"40px" }}/>
                    </div>
                    <div style={{fontWeight:"bold"}}>aryan rawat, mumbai</div>
                    <div>customer statements</div>
                </div> 
            </div> 
            <div className="designsLayouts" style={{backgroundColor:"white"}}>
                <div className="designLayoutHeading">Designs & Layout</div>
                <div className="allLayouts">
                    <div className="design">Images</div>
                    <div className="design">Images</div>
                    <div className="design">Images</div>
                    <div className="design">Images</div>
                </div>
            </div>
        </>
    )
}

export default Projectmodal;
