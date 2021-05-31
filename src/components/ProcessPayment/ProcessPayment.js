import React from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import MyCheckoutForm from './MyCheckoutForm';
import SplitForm from './SplitForm';

const stripePromise = loadStripe('pk_test_51IS44UK2P5c4Ot6xEQ0ItU93a51STyFd8poJbZSRaFvE8BQoesiK4Tk2vIvGDVRACDVnMVN8FOfGYcuLHM2mGjYm000HvvVE5N');
const ProcessPayment = ({ handlePayment }) => {
    return (
        <div>
            <Elements stripe={stripePromise}>
                <MyCheckoutForm handlePayment={handlePayment} />
                {/* <SplitForm></SplitForm> */}
            </Elements>
        </div>
    );
};

export default ProcessPayment;