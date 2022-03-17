import React from 'react';
import { connect } from 'react-redux';

const Nav = ({ employees, foods }) => {
    return (
        <nav>
            <a href='#'>Home</a>
            <a href='#employees'>Employees ({employees.length})</a>
            <a href='#foods'>Our Favorite Dishes ({foods.length})</a>
        </nav>
    )
}

export default connect((state) => state)(Nav)