import { addExpense, editExpense, removeExpense} from '../../actions/expenses'; 

test('Testing of remove expense', () => {
    const result = removeExpense({id: 'abcd123'});
    expect(result).toEqual({
        type: 'REMOVE_EXPENSE',
        id: 'abcd123'
    })
});

test('Testing of edit expenses', () => {
    const result = editExpense('abcd123', {note : 'New Note'} );
    expect(result).toEqual({
        type: 'EDIT_EXPENSE',
        id: 'abcd123',
        updates: {
             note: 'New Note'
        }
    });
});

test('Testing of add expense' , () => {
    const expenseObject = {
        description: 'Test',
        note: 'Test Note',
        amount: 1000,
        createdAt: 1000
    };

    const result = addExpense(expenseObject);
    expect(result).toEqual({
        type:  'ADD_EXPENSE',
        expense: {
            ...expenseObject,
            id: expect.any(String)
        }
    })
});

test('Testing of add expense with no default value', () => {
    const result = addExpense();
    expect(result).toEqual({
        type: 'ADD_EXPENSE',
        expense: {
                id: expect.any(String),
                description: '',
                note: '',
                amount: 0,
                createdAt:0
        }
    })
});