import {createStore} from 'redux';

const incrementCount = ({incrementBy = 1} = {}) => ({
    type: 'INCREMENT',
    incrementBy
});

const decrementCount = ({ decrementBy = 1} = {}) => ({
    type: 'DECREMENT',
    decrementBy
 });

 const setCount = ({ setValue = 101 } = {}) => ({ 
     type: 'SET',
     setValue
 });

 const reset = () => ({ 
    type: 'RESET'
 });

const store = createStore( (state= { count:0 }, action ) => {
    
    switch (action.type) {
        case 'INCREMENT': {
           return {
                count: state.count + action.incrementBy
            };
        }
        case 'DECREMENT': {
            return {
                count: state.count - action.decrementBy
            };
        }
        case 'RESET': {
            return {
                count: 0
            };
        }
         case 'SET': {
            return {
                count: action.setValue
            };
        }
        default: {
            return state;
        }
    }
});

// const unsubscribe = store.subscribe( () => {
//     console.log(store.getState());
// });

store.dispatch(incrementCount({ incrementBy: 5}));

// store.dispatch({
//     type: 'INCREMENT',
//     incrementBy: 5
// });

// unsubscribe();

store.dispatch(incrementCount());

// store.dispatch({
//     type: 'INCREMENT'
// });
store.dispatch(reset());

// store.dispatch({
//     type: 'RESET'
// });

store.dispatch(decrementCount());

// store.dispatch({
//     type: 'DECREMENT'
// });

store.dispatch(decrementCount({ decrementBy: 10}));

// store.dispatch({
//     type: 'DECREMENT',
//     decrementBy: 10
// });

store.dispatch(setCount( { setValue: 100 }));

