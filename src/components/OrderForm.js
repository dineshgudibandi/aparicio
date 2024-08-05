import React, { useState } from 'react';
import axios from 'axios';

const OrderForm = ({ cartItems, clearCart, totalWithTax }) => {
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await axios.post('/submit_order', {
                name,
                phone,
                order: cartItems,
                total: totalWithTax.toFixed(2)
            });
            setMessage(response.data.message);
            clearCart();
        } catch (error) {
            setMessage('An error occurred. Please try again.');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Name:
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
            </label>
            <label>
                Phone:
                <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                    pattern="[0-9]{10}"
                    placeholder="Enter 10-digit phone number"
                />
            </label>
            <button type="submit">Submit Order</button>
            {message && <p>{message}</p>}
        </form>
    );
};

export default OrderForm;
