import React from 'react';
import { connect } from 'react-redux';

const Foods = ({ foods }) => {
    return (
        <div>            
            <ul>
                {
                    foods.map(food => {
                        return (
                            <li key={food.id}>
                                { food.name }
                            </li>
                        )
                    })
                }
            </ul>
            <button>Customers Around the World</button>

        </div>
    )
}

const mapStateToProps = ({ foods }) => {
    return {
        foods
    }
}

export default connect(mapStateToProps)(Foods)