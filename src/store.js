import { createStore } from 'redux';

const LOAD_EMPLOYEES = 'LOAD_EMPLOYEES';
const LOAD_FOODS = 'LOAD_FOODS';
const CREATE_FOODS = 'CREATE_FOODS'

const store = createStore((state = { employees: [], foods: [] }, action) => {
    console.log(action)
    if (action.type === LOAD_EMPLOYEES) {
        state = {...state, employees: action.employees}
    } else if (action.type === LOAD_FOODS) {
        state = {...state, foods: action.foods}
    } else if (action.type === CREATE_FOODS) {
        state = {...state, foods}
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

const createFoods = (name) => {
    return async(dispatch) => {
        const foods = (await axios.post('/api/foods'), { name }).data
        dispatch(_createFoods(foods))
    }
}

export default store
export { 
    loadEmployees, 
    loadFoods, 
    createFoods 
}