import React from 'react';
import { connect } from 'react-redux';
import { createFood, destroyFood } from './store'
import axios from 'axios';

const dishes = ["Lasagna", "Biscuits and Gravy", "Black Cod with Miso", "Black Label Burger", "Carnitas Burrito", "Chicken and Waffles", "Chili Dog", "Clam Chowder", "Classic Chili", "Cuban Sandwich", "Deep Dish Pizza"];

const Foods = ({ foods, createFood, destroyFood }) => {
    return (
        <div>
            <button id='createButton'onClick={() => createFood(dishes[Math.floor(Math.random() * dishes.length)])}>Random Dish Generator</button>
            <ul>

                {
                    foods.map(food => {
                        return (
                            <li key={food.id}>
                                { food.name }
                                <button id='deleteButton'onClick={() => destroyFood(food)}>X</button>
                            </li>
                        )
                    })
                }
            </ul>
        </div>
    )
}

const mapDispatchToProps = (dispatch) => {
    return {
        createFood: (name) => {
            dispatch(createFood(name))
        },
        destroyFood: (food) => {
            dispatch(destroyFood(food))
        }
    }
}

export default connect(state => state, mapDispatchToProps)(Foods)