import { createStore } from 'redux';

const LOAD_EMPLOYEES = 'LOAD_EMPLOYEES';
const LOAD_FOODS = 'LOAD_FOODS';
const SET_VIEW = 'SET_VIEW'

const store = createStore((state = { employees: [], foods: [], view: 'home' }, action) => {
    console.log(action)
    if (action.type === LOAD_EMPLOYEES) {
        state = {...state, employees: action.employees}
    } 
    if (action.type === LOAD_FOODS) {
        state = {...state, foods: action.foods}
    }
    if (action.type === SET_VIEW) {
        state = {...state, view: action.view}
    }
    return state;
})

const loadEmployees = (employees) => {
    return {
        type: LOAD_EMPLOYEES,
        employees
    }
};

const loadFoods = (foods) => {
    return {
        type: LOAD_FOODS,
        foods
    }
};


const setView = (view) => {
    return {
        type: SET_VIEW,
        view
    }
};

export default store
export { 
    loadEmployees, 
    loadFoods,
    setView
}