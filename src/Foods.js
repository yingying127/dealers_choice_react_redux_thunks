import React from 'react';
import { connect } from 'react-redux';

const Foods = ({ foods }) => {
    return (
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
    )
}

const mapStateToProps = ({ foods }) => {
    return {
        foods
    }
}

export default connect(mapStateToProps)(Foods)