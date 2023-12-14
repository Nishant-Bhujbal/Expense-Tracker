import { createContext, useReducer } from "react";

const DUMMY_EXPENSES = [
    {
        id : 'e1',
        description : 'A Pair of Shoes',
        amount : 59.99,
        date : new Date('2021-12-19')
    },
    {
        id : 'e2',
        description : 'A Pair of trousers',
        amount : 89.99,
        date : new Date('2022-01-05')
    },
    {
        id : 'e3',
        description : 'some bananas',
        amount : 5.99,
        date : new Date('2021-12-01')
    },
    {
        id : 'e4',
        description : 'a book',
        amount : 14.99,
        date : new Date('2022-02-19')
    },
    {
        id : 'e5',
        description : 'another book',
        amount : 18.59,
        date : new Date('2022-02-18')
    },
    {
        id : 'e6',
        description : 'A Pair of trousers',
        amount : 89.99,
        date : new Date('2022-01-05')
    },
    {
        id : 'e7',
        description : 'some bananas',
        amount : 5.99,
        date : new Date('2021-12-01')
    },
    {
        id : 'e8',
        description : 'a book',
        amount : 14.99,
        date : new Date('2022-02-19')
    },
    {
        id : 'e9',
        description : 'another book',
        amount : 18.59,
        date : new Date('2022-02-18')
    },
]

export const ExpensesContext = createContext({
    expenses : [],
    addExpense : ({description,amount,date})=> {},
    deleteExpense : (id)=> {},
    updateExpense : (id,{description,amount,date})=> {},
});

// job of the reducer funtion is to always return a new state value 
function expensesReducer(state,action){
    switch (action.type) {
        case 'ADD':
            const id = new Date().toString() + Math.random().toString();
            return [{...action.payload, id : id}, ...state];
        case 'UPDATE':
            const updateableExpenseIndex = state.findIndex(
                (expense)=> expense.id === action.payload.id
                );
                const updateableExpense = state[updateableExpenseIndex];
                const updatedItem = {...updateableExpense, ...action.payload.data};
                const updatedExpenses = [...state];
                updatedExpenses[updateableExpenseIndex] = updatedItem;

                return updatedExpenses;
        case 'DELETE':
            return state.filter((expense)=> expense.id !== action.payload);
        default:
            return state;
    }
}


function ExpensesContextProvider ({children}){
  // useReducer is used for complex states rather than using useState
  const [expensesState,dispatch] = useReducer(expensesReducer , DUMMY_EXPENSES);
  
  // disptch help in passing the actions and this action are then used in 
 //  expenseReducer to perform the actions according to conditions
  function addExpense(expenseData){
    dispatch({type : 'ADD', payload : expenseData});
  }

  function deleteExpense(id){
    dispatch({type : 'DELETE',payload : id});
  }

  function updateExpense(id,expenseData){
    dispatch({type : 'UPDATE',payload : {id : id, data : expenseData}})
  }

  const value = {
    expenses : expensesState,
    addExpense : addExpense,
    deleteExpense : deleteExpense,
    updateExpense : updateExpense,
  };

    return <ExpensesContext.Provider value={value}>
    {children}
    </ExpensesContext.Provider>
}

export default ExpensesContextProvider;

