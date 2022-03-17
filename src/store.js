import { createStore, combineReducers, applyMiddleware } from 'redux';
import axios from 'axios';
import thunk from 'redux-thunk';

const LOAD_EMPLOYEES = 'LOAD_EMPLOYEES';
const LOAD_FOODS = 'LOAD_FOODS';
const SET_VIEW = 'SET_VIEW'
const CREATE_FOOD = 'CREATE_FOOD'

// const store = createStore((state = { employees: [], foods: [], view: 'home' }, action) => {
//     console.log(action)
//     if (action.type === LOAD_EMPLOYEES) {
//         state = {...state, employees: action.employees}
//     } 
//     if (action.type === LOAD_FOODS) {
//         state = {...state, foods: action.foods}
//     }
//     if (action.type === SET_VIEW) {
//         state = {...state, view: action.view}
//     }
//     return state;
// })

const employeesReducer = (state = [], action) => {
    if (action.type === LOAD_EMPLOYEES) {
        state = action.employees
    }
    return state;
}

const foodsReducer = (state = [], action) => {
    if (action.type === LOAD_FOODS) {
        state = action.foods
    }
    if (action.type === CREATE_FOOD) {
        state = [...state, action.foods]
    }
    return state;
}

const viewReducer = (state = 'home', action) => {
    if (action.type === SET_VIEW) {
        state = action.view
    }
    return state;
}



//reducer combined with middleware
const reducer = combineReducers({
    employees: employeesReducer,
    foods: foodsReducer,
    view: viewReducer
})
//store with reducer from above
const store = createStore(reducer, applyMiddleware(thunk))

const _loadEmployees = (employees) => {
    return {
        type: LOAD_EMPLOYEES,
        employees
    }
};

const loadEmployees = () => {
    return async(dispatch) => {
        const employees = (await axios.get('/api/employees')).data;
        dispatch(_loadEmployees(employees))
    }
}

const _loadFoods = (foods) => {
    return {
        type: LOAD_FOODS,
        foods
    }
};

const loadFoods = () => {
    return async(dispatch) => {
        const foods = (await axios.get('/api/foods')).data;
        dispatch(_loadFoods(foods))
    }
}


const setView = (view) => {
    return {
        type: SET_VIEW,
        view
    }
};

const _createFood = (foods) => {
    return {
        type: CREATE_FOOD,
        foods
    }
}

const createFood = (name) => {
    return async(dispatch) => {
        const foods = (await axios.post('/api/foods', { name })).data
        dispatch(_createFood(foods))
    }
} 

export default store
export { 
    loadEmployees, 
    loadFoods,
    setView,
    createFood
}