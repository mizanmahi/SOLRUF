import React from 'react';
import './carousel.css'
import Carousel from 'react-bootstrap/Carousel';
import Project from './project';

function Carouselli() {
    return (
        <div className="carouselContainer">
            <Carousel variant="dark">
                <Carousel.Item >
                    <Project/>
                </Carousel.Item>
                <Carousel.Item>
                    <Project/>
                </Carousel.Item>
                <Carousel.Item >
                    <Project/>
                </Carousel.Item>
                <Carousel.Item >
                   <Project/>
                </Carousel.Item>
            </Carousel>
        </div>
    )
}

export default Carouselli;
