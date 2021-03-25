import React, { useState, useEffect } from 'react';
import { getDatabaseCart, removeFromDatabaseCart, processOrder } from '../../utilities/databaseManager';
// import fakeData from '../../fakeData';
import ReviewItem from '../ReviewItem/ReviewItem';
import Cart from '../Cart/Cart';
import happyImage from '../../images/giphy.gif'
import { useHistory } from 'react-router-dom';


const Review = () => {
    const [cart, setCart] = useState([]);
    const [orderPlaced, setOrderPlaced] = useState(false);
    const history = useHistory()

    const handleProceedCheckout = () => {

        history.push('/shipment');

        // console.log("place order clicked");
        // setCart([]);
        // setOrderPlaced(true);
        // processOrder();
    }


    const removeProduct = (productKey) => {
        // console.log('remove clicked', productKey);
        const newCart = cart.filter(pd => pd.key !== productKey);
        setCart(newCart);
        removeFromDatabaseCart(productKey);
    }

    useEffect(() => {
        //cart
        const savedCart = getDatabaseCart();
        // console.log(savedCart);
        const productKeys = Object.keys(savedCart);
        document.title = "Order Review";
        fetch('https://intense-waters-18558.herokuapp.com/productByKeys', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(productKeys)
        })
            .then(res => res.json())
            .then(data => {
                const cartProducts = productKeys.map(key => {
                    const product = data.find(pd => pd.key === key);

                    product.quantity = savedCart[key];
                    return product;

                });
                // const count = Object.values(savedCart);
                // console.log(cartProducts);
                setCart(cartProducts);

                // setCart(data)
            })

        // // alternative way with fake data
        // const cartProducts = productKeys.map(key => {
        //     const product = fakeData.find(pd => pd.key === key);

        //     product.quantity = savedCart[key];
        //     return product;

        // });
        // // const count = Object.values(savedCart);
        // // console.log(cartProducts);
        // setCart(cartProducts);

    }, []);

    let thankyou;
    if (orderPlaced) {
        thankyou = <img src={happyImage} alt="" />
    }
    return (
        <div className="shop-container">
            <div className="product-container">
                {/* <h1 style={{ textAlign: 'center' }}>Cart Items: {cart.length}</h1> */}
                {
                    cart.map(pd => <ReviewItem removeProduct={removeProduct} key={pd.key} product={pd}></ReviewItem>)
                }
                {
                    thankyou
                }
            </div>
            <div className="cart-container">
                <Cart cart={cart}>
                    <button onClick={handleProceedCheckout} className="main-button">Proceed Checkout</button>
                </Cart>
            </div>
        </div>
    );
};

export default Review;