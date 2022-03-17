import React, { Component } from 'react';
import { render } from 'react-dom';
import { connect, Provider } from 'react-redux';
import store, { loadEmployees, loadFoods, setView } from './store'
import Employees from './Employees'
import Foods from './Foods'
import Nav from './Nav'
import Home from './Home'

const App = connect(
    (state) => {
        return state;
    },
    (dispatch) => {
        return {
            load: async() => {
                dispatch(loadEmployees())
                dispatch(loadFoods())
            },
            setView: function(view) {
                dispatch(setView(view))
            }
        }
    }
)(class App extends Component {
    componentDidMount() {
        this.props.load();
        window.addEventListener('hashchange', () => {
            this.props.setView(window.location.hash.slice(1))
        })
        this.props.setView(window.location.hash.slice(1))
    }
    render() {
        const { employees, foods, view } = this.props;
        return (
            <div>
                <Nav />
                { view === '' && <Home />}
                { view === 'employees' && <Employees />}
                { view === 'foods' && <Foods />}
             </div>
        )
    }
})

render(<Provider store={ store }><App /></Provider>, document.querySelector('#root'));