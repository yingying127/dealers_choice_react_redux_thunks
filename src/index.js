import React, { Component } from 'react';
import { render } from 'react-dom';
import axios from 'axios';
import { connect, Provider } from 'react-redux';
import store, { loadEmployees, loadFoods, createFoods } from './store'
import Employees from './Employees'
import Foods from './Foods'
import Nav from './Nav'

class _App extends Component {
    constructor() {
        super()
        // this.state = {
        //     employees: [],
        //     foods: []
        // }
    }
    async componentDidMount() {
        // const employees = (await axios.get('/api/employees')).data
        // const foods = (await axios.get('/api/foods')).data
        // this.setState({ employees, foods })
        this.props.load();
    }
    render() {
        // const employees = this.state.employees
        // const foods = this.state.foods
        const { employees, foods } = this.props
        return (            
        <div>
            <Nav />
                <Employees />
                <Foods />
            </div>
        )
    }
}

const App = connect(
    state => state,
    (dispatch) => {
        return {
            load: async() => {
                const employees = (await axios.get('/api/employees')).data
                dispatch(loadEmployees(employees))
                const foods = (await axios.get('/api/foods')).data
                dispatch(loadFoods(foods))
                const createFood = (await axios.post('/api/foods')).data
                dispatch(createFood(foods))
            }
        }
    }
)(_App)

render(<Provider store={ store }><App /></Provider>, document.querySelector('#root'));