import React, { Component } from 'react';
import { render } from 'react-dom';
import axios from 'axios';
import { connect, Provider } from 'react-redux';
import store, { loadEmployees, loadFoods } from './store'

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
            <nav>
                <a href='#'>Home</a>
                <a href='#employees'>Employees ({employees.length})</a>
                <a href='#food'>Our Favorite Dishes ({foods.length})</a>
            </nav>
                <ul>
                    {
                        employees.map(employee => {
                            return (
                                <li key={employee.id}>
                                    { employee.name } { employee.profession }
                                </li>
                            )
                        })
                    }
                    </ul>
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
            }
        }
    }
)(_App)

render(<Provider store={ store }><App /></Provider>, document.querySelector('#root'));