import React from 'react';
import './Cart.css'

const Cart = (props) => {
    const cart = props.cart;
    // console.log(cart);

    // const total = cart.reduce((total, pd) => total + pd.price, 0);
    let total = 0;
    for (let i = 0; i < cart.length; i++) {
        const product = cart[i];
        total = total + product.price * product.quantity;
    }

    let shipping = 0;
    if (total > 35) {
        shipping = 0;
    }
    else if (total > 15) {
        shipping = 4.99;
    }
    else if (total > 0) {
        shipping = 12.99;
    }

    const tax = total / 10;

    const grandTotal = (total + shipping + tax);

    const formatNumber = num => {
        const precision = num.toFixed(2);
        return Number(precision);
    }
    return (
        <div style={{ position: 'fixed' }}>
            <h3 className="order">Order Summary</h3>
            <p className="order">Items ordered: {cart.length}</p>
            <p>Product Price: ${formatNumber(total)}</p>
            <p><small>Shipping Charge: ${shipping}</small></p>
            <p><small>Tax + VAT: ${formatNumber(tax)}</small></p>
            <h3 className="total">Order Total:${formatNumber(grandTotal)}</h3>
            <br />
            {
                props.children
            }
        </div>
    );
};

export default Cart;