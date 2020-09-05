import React from 'react';

const ReviewItem = (props) => {
    const { name, quantity, img, key, price } = props.product;
    const reviewItemStyle = {
        borderBottom: "3px solid lightgray",
        marginBottom: "10px",
        paddingBottom: "10px",
        marginLeft: "200px",
        marginRight: "200px",
        display: "flex"
    }
    return (
        <div style={reviewItemStyle}>
            <div style={{ marginRight: "20px" }}>
                <img src={img} alt="" />
            </div>
            <div>
                <h3 className="product-name">{name}</h3>
                <h4>Quantity: {quantity}</h4>
                <p>Price: {price}</p>
                <button onClick={() => props.removeProduct(key)} className="main-button">Remove</button>
            </div>

        </div>
    );
};

export default ReviewItem;