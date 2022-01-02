import React,{useState} from 'react';
import Carousel from 'react-elastic-carousel';
//import styled from 'styled-components';
// import './slider.css';
import jsonData from '../indiasolarproject.json';
import Project from '../project/project';
import ProjectModal from '../projectmodal/projectmodal';
import { Modal } from 'react-bootstrap'
import '../projectmodal/projectmodal.css';



const breakPoints=[
    {width:1, itemsToShow: 1},
    {width:550, itemToShow: 2},
    {width:768,itemsToShow:3},
    {width:1200,itemsToShow:4}
]

function Slidercarousel() {
    const [model,setModel]=useState(false);
    
    function handleModal(){
        setModel(!model);
    }

    return (
        <>
         <div className="reactElasticCarousel" >
              <Carousel breakPoints={breakPoints} >
                {jsonData.map((item)=>{
                    let  key=Math.floor((Math.random()*100)+1)
                    return <Project data={item} key={key} onSelect={handleModal} />                                         
                    })}
              </Carousel>
         </div>

         <Modal size="lg" show={model}   onHide={handleModal} >
            <Modal.Body style={{backgroundColor:"transparent"}} onRequestClose={()=>model(false)} >
                <ProjectModal />
            </Modal.Body>
        </Modal>
        </>
    )
}

export default Slidercarousel;
