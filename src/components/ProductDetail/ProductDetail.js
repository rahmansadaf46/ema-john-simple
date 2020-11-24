import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
// import fakeData from '../../fakeData';
import Product from '../Product/Product';

const ProductDetail = () => {
    const { productKey } = useParams();

    const [product, setProduct] = useState({});
    const [loading, setLoading] = useState(true);
    document.title = "Product Detail";
    useEffect(() => {
        fetch('https://intense-waters-18558.herokuapp.com/product/' + productKey)
            .then(res => res.json())
            .then(data => {
                setProduct(data);
                setLoading(false);
            })
    }, [productKey])
    // const product = products.find(pd => pd.key === productKey);
    // console.log(product);

    const productDetailStyle = {
        width: "70%",
        marginLeft: "200px",
        marginRight: "5px"
    }
    return (
        <div style={productDetailStyle}>

            {
                loading ? <p>loading...</p> :
                    <Product showAddToCart={false} product={product}></Product>
            }
        </div>
    );
};

export default ProductDetail;