import React, { useMemo } from 'react';

const Cart = ({ cartItems, removeFromCart }) => {
    const TAX_RATE = 0.08; // 8% tax rate, adjust as necessary

    const total = useMemo(() => {
        return cartItems.reduce((acc, item) => {
            const price = parseFloat(item.selectedOption ? item.selectedOption.price.slice(1) : item.price.slice(1));
            return acc + price;
        }, 0);
    }, [cartItems]);

    const tax = total * TAX_RATE;
    const totalWithTax = total + tax;

    return (
        <div>
            <h2>Your Cart</h2>
            <ul>
                {cartItems.map((item, index) => (
                    <li key={index} className="Cart-item">
                        {item.name} - {item.selectedOption.type ? `${item.selectedOption.type} - ${item.selectedOption.price}` : item.price}
                        <button onClick={() => removeFromCart(index)}>Remove</button>
                    </li>
                ))}
            </ul>
            <div className="Cart-summary">
                <p>Subtotal: ${total.toFixed(2)}</p>
                <p>Tax: ${tax.toFixed(2)}</p>
                <p>Total: ${totalWithTax.toFixed(2)}</p>
            </div>
        </div>
    );
};

export default Cart;
