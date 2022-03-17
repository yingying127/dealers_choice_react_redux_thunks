import React from 'react';
import { connect } from 'react-redux';

const Home = () => {
    return (
        <div id="home-page">
            <h2>Welcome to our Restaurant Page</h2>
            <p>
                Navigate to our <a href='#employees'>employees</a> and our <a href='#foods'>favorite dishes!</a>
            </p>
        </div>
    )
}


export default connect(state => state)(Home)