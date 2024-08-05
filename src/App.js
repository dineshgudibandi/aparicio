import React, {useEffect, useState, useMemo} from 'react';
import './App.css';
import OrderForm from './components/OrderForm';
import Cart from './components/Cart';
import Menu from './components/Menu';
import {Link, Element} from 'react-scroll';
import {isOrderingOpen} from './utils';

const OPEN_HOURS_MESSAGE = `
  Monday: Closed
  Tuesday: Closed
  Wednesday: Closed
  Thursday: 3:30 PM – 10:00 PM
  Friday: 3:30 PM – 10:00 PM
  Saturday: 3:30 PM – 10:00 PM
  Sunday: 3:30 PM – 9:00 PM
`;

function App() {
    const [menuItems, setMenuItems] = useState([]);
    const [drinkItems, setDrinkItems] = useState([]);
    const [cartItems, setCartItems] = useState([]);

    useEffect(() => {
        fetch('/menu.json')
            .then(response => response.json())
            .then(data => {
                setMenuItems(data.menuItems);
                setDrinkItems(data.drinkItems);
            });
    }, []);

    const addToCart = (item) => {
        setCartItems([...cartItems, item]);
    };

    const removeFromCart = (index) => {
        setCartItems(cartItems.filter((_, i) => i !== index));
    };

    const clearCart = () => {
        setCartItems([]);
    };

    const TAX_RATE = 0.08;
    const total = useMemo(() => {
        return cartItems.reduce((acc, item) => {
            const price = parseFloat(item.selectedOption ? item.selectedOption.price.slice(1) : item.price.slice(1));
            return acc + price;
        }, 0);
    }, [cartItems]);

    const tax = total * TAX_RATE;
    const totalWithTax = total + tax;

    return (
        <div className="App">
            <header className="App-header">
                <h1>Welcome to Aparicio's</h1>
                <h2>11880 Hero Way W ste 201, Leander, TX 78641 | Ph: (512) 528-5391 </h2>
                <nav>
                    <Link to="menu" smooth={true} duration={500}>Menu</Link>
                    <Link to="order" smooth={true} duration={500}>Order Online</Link>
                </nav>
            </header>
            <Element name="menu">
                <section>
                    <Menu menuItems={menuItems} drinkItems={drinkItems} addToCart={addToCart}/>
                </section>
            </Element>
            <Element name="order">
                <section>
                    {isOrderingOpen() ? (
                        <>
                            <Cart cartItems={cartItems} removeFromCart={removeFromCart}/>
                            <OrderForm cartItems={cartItems} clearCart={clearCart} totalWithTax={totalWithTax}/>
                        </>
                    ) : (
                        <div>
                            <p>Ordering is currently closed. Please come back during our open hours:</p>
                            <pre>{OPEN_HOURS_MESSAGE}</pre>
                        </div>
                    )}
                </section>
            </Element>
        </div>
    );
}

export default App;
