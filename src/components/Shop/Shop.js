import React, { useEffect } from 'react';
// import fakeData from '../../fakeData';
import { useState } from 'react';
import './Shop.css'
import Product from '../Product/Product';
import Cart from '../Cart/Cart';
import { addToDatabaseCart, getDatabaseCart } from '../../utilities/databaseManager';
import { Link } from 'react-router-dom';
import { CircularProgress } from '@material-ui/core';

const Shop = () => {
    // const first10 = fakeData.slice(0, 10);
    // const [products, setProducts] = useState(first10);
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState([]);
    const [search, setSearch] = useState('');

    document.title = "Ema John";



    useEffect(() => {
        fetch('https://intense-waters-18558.herokuapp.com/products?search=' + search)
            .then(res => res.json())
            .then(data => setProducts(data))
    }, [search])

    useEffect(() => {
        const savedCart = getDatabaseCart();
        console.log(savedCart);
        const productKeys = Object.keys(savedCart);
        // console.log(products, productKeys);


        fetch('https://intense-waters-18558.herokuapp.com/productByKeys', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(productKeys)
        })
            .then(res => res.json())
            .then(data => {
                if (data.length) {
                    const previousCart = productKeys.map(existingKey => {
                        const product = data.find(pd => pd.key === existingKey);
                        // console.log(product);
                        // console.log(existingKey, savedCart[existingKey]);
                        product.quantity = savedCart[existingKey];
                        // console.log(product);
                        return product;
                    })
                    setCart(previousCart);
                }

            })


        // //alternative way
        // if (products.length) {
        //     const previousCart = productKeys.map(existingKey => {
        //         const product = products.find(pd => pd.key === existingKey);
        //         // console.log(product);
        //         // console.log(existingKey, savedCart[existingKey]);
        //         product.quantity = savedCart[existingKey];
        //         // console.log(product);
        //         return product;
        //     })
        //     setCart(previousCart);
        // }
    }, [])
    //[products] dependencies will be added on alternative way
    const handleSearch = event => {
        console.log(event.target.value);
        setSearch(event.target.value);
    }
    const handleAddProduct = (product) => {
        // console.log("clicked", product);
        const toBeAddedKey = product.key;
        const sameProduct = cart.find(pd => pd.key === toBeAddedKey);
        let count = 1;
        let newCart;
        if (sameProduct) {
            count = sameProduct.quantity + 1;
            sameProduct.quantity = count;
            // debugger;
            const others = cart.filter(pd => pd.key !== toBeAddedKey);
            newCart = [...others, sameProduct]
        }
        else {
            product.quantity = 1;
            newCart = [...cart, product];
        }

        // const count = sameProduct.length;

        // const newCart = [...cart, product];
        setCart(newCart);

        addToDatabaseCart(product.key, count);
    }

    return (
        <div className="shop-container">
            <div className="product-container">
                <input type="text" onBlur={handleSearch} placeholder="Search" name="search" id="" />
                {
                    products.length === 0 && <CircularProgress />
                }

                {
                    products.map(pd => <Product showAddToCart={true} product={pd} key={pd.key} handleAddProduct={handleAddProduct}></Product>)
                }

            </div>
            <div className="cart-container">
                <Cart cart={cart}>
                    <Link to="/review">
                        <button className="main-button">Review order</button>
                    </Link>
                </Cart>
            </div>
        </div>
    );
};

export default Shop;