import { createStore, combineReducers } from 'redux';
import uuid from 'uuid';

//ADD_EXPENSE
const addExpense = ({ description = '', note = '',amount =0, createdAt =0 } = { }) => ({
    type: 'ADD_EXPENSE',
    expense: {
        id: uuid(),
        description,
        note,
        amount,
        createdAt
    }
});

//EDIT_EXPENSE
const editExpense = (id, updates) => ({
    type: 'EDIT_EXPENSE',   
    id,
    updates
});

//REMOVE_EXPENSE
const removeExpense = ( { id } = { }) => ({
    type: 'REMOVE_EXPENSE',
    id
});

//SET_TEXT_FILTER

const setTextFilter = (updates = '') => ({ 
    type: 'SET_TEXT_FILTER',
    updates
});

//SORT_BY_AMOUNT

const sortByAmount= () => ({
    type: 'SORT_BY_AMOUNT'
});

//SORT_BY_DATE

const sortByDate= () => ({
    type: 'SORT_BY_DATE'
});

//SET_START_DATE

const setStartDate = (startDate) =>  ({ 
    type: 'SET_START_DATE',
    startDate
});

//SET_END_DATE

const setEndDate = (endDate) =>  ({ 
    type: 'SET_END_DATE',
    endDate
});

const expenseReducerDefaultState = [];
const expenseReducer = (state = expenseReducerDefaultState, action) => {
    switch (action.type) {
        case 'ADD_EXPENSE':
            return [
                ...state,
                action.expense
            ];
        case 'REMOVE_EXPENSE':
            return state.filter( ({ id }) => id !== action.id);
        case 'EDIT_EXPENSE':
            return state.map( (expense) => {
                if (expense.id === action.id) {
                    return {
                        ...expense,
                        ...action.updates
                    };
                } else {
                    return expense;
                };

            }) 
        default: 
            return state;
    }
};

const filterReducerDefaultState = {
    text: '' ,
    sortBy: 'date', 
    startDate: undefined,
    endDate: undefined
};
const filterReducer = (state = filterReducerDefaultState, action) => {
    switch(action.type) {
        case 'SET_TEXT_FILTER':
          return {
                    ...state,
                    text: action.updates
                };
        case 'SORT_BY_AMOUNT':
            return {
                    ...state,
                    sortBy: 'amount'
                };
        case 'SORT_BY_DATE':
            return {
                    ...state,
                    sortBy: 'date'
                };
        case 'SET_START_DATE':
            return {
                    ...state,
                    startDate: action.startDate
                };
        case 'SET_END_DATE':
            return {
                    ...state,
                    endDate: action.endDate
                };
        default: 
            return state;
    }
};

//Get visibile expenses

const getVisibleExpenses = (expenses, {text, sortBy, startDate, endDate}) =>  {
    return expenses.filter((expense) => {
        const startDateMatach = typeof startDate !== 'number' || expense.createdAt >= startDate;
        const endDateMatch = typeof endDate !== 'number' || expense.createdAt <= endDate;
        const textMatch = true;
        //const textMatch = expense.description.includes('Rent');

        return startDateMatach && endDateMatch && textMatch;
    }).sort ((a,b) => {
        if (sortBy === "date") {
            return a.createdAt < b.createdAt ? 1 : -1;
        }
        if (sortBy === "amount") {
            return a.amount < b.amount ? 1 : -1;
        }
    });
}

const store = createStore( 
    combineReducers({
        expenses: expenseReducer,
        filters: filterReducer
    })
);

store.subscribe(() => {
    const state = store.getState();
    const visibleExpenes = getVisibleExpenses(state.expenses, state.filters);
    console.log(visibleExpenes);
});

const expenseOne = store.dispatch(addExpense( { description: 'Rent', amount: 500, createdAt: -21000 }));
const expenseTwo = store.dispatch(addExpense( { description: 'Coffeee', amount: 200, createdAt: -1000 }));

// store.dispatch(removeExpense({ id: expenseOne.expense.id}));
// store.dispatch(editExpense( expenseTwo.expense.id, { amount: 100}));

// store.dispatch(setTextFilter('rent'));
// store.dispatch(setTextFilter());

//store.dispatch(sortByAmount());
    store.dispatch(sortByDate());

// store.dispatch(setStartDate(2000));
// store.dispatch(setStartDate());
// store.dispatch(setEndDate(1250));

const demoState = {
    expenses: [ { 
        id: "Expense001",
        description: "January Rent",
        note: "this is the last rent for this address",
        amount: 45000,
        createdAt: 0
    }],

    filters: {
        text: "rent",
        sortBy: "amount",
        startDate: undefined,
        endDate: undefined
    }
};

// const user = {
//     name: "Sankar",
//     age: 25
// };

// console.log("test");
// console.log( 
//     { ...user,
//         location: "Chennai",
//         age:27
// });