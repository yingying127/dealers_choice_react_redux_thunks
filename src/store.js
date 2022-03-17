import { createStore, combineReducers, applyMiddleware } from 'redux';
import axios from 'axios';
import thunk from 'redux-thunk';
import logger from 'redux-logger';

const LOAD_EMPLOYEES = 'LOAD_EMPLOYEES';
const LOAD_FOODS = 'LOAD_FOODS';
const SET_VIEW = 'SET_VIEW';
const CREATE_FOOD = 'CREATE_FOOD';
const DESTROY_FOOD = 'DESTROY_FOOD';

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
    if (action.type === DESTROY_FOOD) {
        const foods = state.filter((food) => food.id !== action.food.id);
        return foods;
    }
    return state;
}

const viewReducer = (state = 'home', action) => {
    if (action.type === SET_VIEW) {
        state = action.view
    }
    return state;
}

const reducer = combineReducers({
    employees: employeesReducer,
    foods: foodsReducer,
    view: viewReducer
})
const store = createStore(reducer, applyMiddleware(thunk, logger))

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

const _destroyFood = (food) => {
    return {
        type: DESTROY_FOOD,
        food
    }
}

const destroyFood = (food) => {
    return async(dispatch) => {
        await axios.delete(`/api/foods/${food.id}`)
        dispatch(_destroyFood(food)) 
    }
}

export default store
export { 
    loadEmployees, 
    loadFoods,
    setView,
    createFood,
    destroyFood
}