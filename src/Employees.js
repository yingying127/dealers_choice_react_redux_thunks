import React from 'react';
import { connect } from 'react-redux';

const Employees = ({ employees }) => {
    return (
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
    )
}

const mapStateToProps = ({ employees }) => {
    return {
        employees
    }
}

export default connect(mapStateToProps)(Employees)