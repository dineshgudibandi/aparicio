import React, { useState } from 'react';

const Menu = ({ menuItems, drinkItems, addToCart }) => {
    const [selectedOptions, setSelectedOptions] = useState({});

    const handleOptionChange = (index, option) => {
        setSelectedOptions({
            ...selectedOptions,
            [index]: option
        });
    };

    const handleAddToCart = (item, index, isDrink = false) => {
        const selectedOption = selectedOptions[index] || (isDrink ? item : item.meatOptions[0]);
        addToCart({ ...item, selectedOption });
    };

    return (
        <div>
            <h2>Our Menu</h2>
            <ul>
                {menuItems.map((item, index) => (
                    <li key={index}>
                        {item.name}
                        <div>
                            <label htmlFor={`meat-select-${index}`}>Choose an option:</label>
                            <select
                                id={`meat-select-${index}`}
                                onChange={(e) => handleOptionChange(index, JSON.parse(e.target.value))}
                            >
                                {item.meatOptions.map((option, i) => (
                                    <option key={i} value={JSON.stringify(option)}>
                                        {option.type} - {option.price}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <button onClick={() => handleAddToCart(item, index)}>Add to Cart</button>
                    </li>
                ))}
            </ul>
            <h2>Drinks</h2>
            <ul>
                {drinkItems.map((item, index) => (
                    <li key={index}>
                        {item.name} - {item.price}
                        <button onClick={() => handleAddToCart(item, index, true)}>Add to Cart</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Menu;
