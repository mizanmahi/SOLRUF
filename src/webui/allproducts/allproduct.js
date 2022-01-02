import React from 'react';
import Product from '../product/product';
import pannel1 from '../images/solar-pannel1.jpg';
import pannel2 from '../images/solar-pannel2.jpg';
import pannel3 from '../images/solar-pannel3.jpg';
import cable1 from '../images/cable1.jpg';
import cable2 from '../images/cable2.jpg';
import './allproducts.css';

function AllProduct() {
    return (
        <div className="allproductContainer">
            <div className="productHeading"><h2>All Products Categories</h2></div>
            <div className="allproducts">
                <Product name="Solar Pannel" image={pannel1} />
                <Product name="Solar Pannel" image={pannel2} />
                <Product name="Solar Pannel" image={pannel3} />
                <Product name="Solar Cable" image={cable1} />
                <Product name="Solar Cable" image={cable2} />
                {/* <Product name="Solar Pannel" image={pannel1} />
                <Product name="Solar Pannel" image={pannel1} />
                <Product name="Solar Pannel" image={pannel1} /> */}
            </div>
        </div>
    )
}

export default AllProduct;
