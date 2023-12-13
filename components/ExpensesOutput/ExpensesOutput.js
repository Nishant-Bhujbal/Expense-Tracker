import { StyleSheet, View } from 'react-native'
import ExpensesSummary from './ExpensesSummary'
import ExpensesList from './ExpensesList'
import { GlobalStyles } from '../../constants/styles'

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

function ExpensesOutput({expenses , expensesPeriod}) {
  return (
    <View style={styles.container} >
        <ExpensesSummary expenses={DUMMY_EXPENSES} periodName={expensesPeriod} />
        <ExpensesList expenses={DUMMY_EXPENSES} />
    </View>
  )
}

export default ExpensesOutput;

const styles = StyleSheet.create({
    container : {
        flex : 1,
        paddingHorizontal : 24,
        paddingTop : 24,
        paddingBottom : 4,
        backgroundColor : GlobalStyles.colors.primary700,
    }
});