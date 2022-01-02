import React from 'react'
import './product.css';

function Product(props) {
    return (
        <div className="productContainer">
            <img src={props.image} className="productImage" alt="product pic.." />
            <h5>{props.name}</h5>
            {/* <div id="carouselExampleControls" class="carousel slide" data-ride="carousel">
                 <div className="carousel-inner">
                        <div className="carousel-item active">
                            <img className="d-block w-100" src={props.image} alt="First slide"/>
                            <h5>{props.name}</h5>
                        </div>
                        <div class="carousel-item">
                            <img className="d-block w-100" src={props.image} alt="Second slide"/>
                            <h5>{props.name}</h5>
                        </div>
                        <div className="carousel-item">
                            <img className="d-block w-100" src={props.image} alt="Third slide"/>
                            <h5>{props.name}</h5>
                        </div>
                    </div>
                    <a className="carousel-control-prev" href="#carouselExampleControls" role="button" data-slide="prev">
                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span className="sr-only">Previous</span>
                    </a>
                    <a className="carousel-control-next" href="#carouselExampleControls" role="button" data-slide="next">
                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                        <span className="sr-only">Next</span>
                    </a>
            </div> */}
        </div>
    )
}

export default Product;
