import React, { Component } from 'react';
import { render } from 'react-dom';
import axios from 'axios';
import { connect, Provider } from 'react-redux';

class _App extends Component {
    constructor() {
        super()
        this.state = {
            employees: [],
            foods: []
        }
    }
    async componentDidMount() {
        const employees = (await axios.get('/api/employees')).data
        const foods = (await axios.get('/api/foods')).data
        this.setState({ employees, foods })
    }
    render() {
        const employees = this.state.employees
        const foods = this.state.foods
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

render(<_App />, document.querySelector('#root'));