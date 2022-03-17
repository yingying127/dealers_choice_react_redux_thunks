import React from 'react';
import { connect } from 'react-redux';

const Nav = ({ employees, foods }) => {
    return (
        <nav>
            <a href='#'>Home</a>
            <a href='#employees'>Employees</a>
            <a href='#foods'>Our Favorite Dishes</a>
        </nav>
    )
}

export default connect(state => state)(Nav)