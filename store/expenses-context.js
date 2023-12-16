import { createContext, useReducer } from "react";


export const ExpensesContext = createContext({
    expenses : [],
    addExpense : ({description,amount,date})=> {},
    setExpense : (expenses)=> {},
    deleteExpense : (id)=> {},
    updateExpense : (id,{description,amount,date})=> {},
});

// job of the reducer funtion is to always return a new state value 
function expensesReducer(state,action){
    switch (action.type) {
        case 'ADD':
            return [action.payload, ...state];
        case 'SET':
            const inverted = action.payload.reverse();
            return inverted;
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
  const [expensesState,dispatch] = useReducer(expensesReducer ,[]);
  
  // disptch help in passing the actions and this action are then used in 
 //  expenseReducer to perform the actions according to conditions
  function addExpense(expenseData){
    dispatch({type : 'ADD', payload : expenseData});
  }

  function setExpense(expenses){
    dispatch({type : 'SET', payload : expenses})
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
    setExpense : setExpense,
    deleteExpense : deleteExpense,
    updateExpense : updateExpense,
  };

    return <ExpensesContext.Provider value={value}>
    {children}
    </ExpensesContext.Provider>
}

export default ExpensesContextProvider;


