import React, {useState, useEffect} from 'react';
import './App.css';
import Alert from './components/Alert'
import ExpenseForm from './components/ExpenseForm';
import ExpenseList from './components/ExpenseList';
import uuid from 'react-uuid';

// const initialExpenses = [
//   {id:uuid(), charge:'rent', amount:2000},
//   {id:uuid(), charge:'house payment', amount:5000},
//   {id:uuid(), charge:'buy ferari', amount:40000}
// ]
  const initialExpenses = localStorage.getItem('expenses') ? JSON.parse(localStorage.getItem('expenses')) : [];

function App() {

  const [expenses, setExpenses] = useState(initialExpenses);
  const [charge, setCharge] = useState('');
  const [amount, setAmount] = useState('');
  const [edit, setEdit] = useState(false);
  const [id, setId] =useState(0)
  const [alert,setAlert] = useState({show: false})

  useEffect(() => {
    localStorage.setItem('expenses', JSON.stringify(expenses))
  }, [expenses])

  const handleCharge = (e) => {
    setCharge(e.target.value)
  }
  const handleAmount = (e) => {
    setAmount(e.target.value)
  }
  const handleAlert = ({type, text}) => {
    setAlert({show:true,type,text})
    setTimeout(() => {
      setAlert({ show: false})
    }, 3000)
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    if(charge !== '' && amount > 0){
      if (edit) {
        let tempExpenses = expenses.map(item => {
          return item.id === id ? {...item, charge, amount}
            : item;
        });
        setExpenses(tempExpenses);
        setEdit(false)
        handleAlert({type:'success',text:`item has been edited`})
      } else{
        const singleExpense = {id: uuid(),charge,amount}
        setExpenses([...expenses,singleExpense])
        handleAlert({type:'success',text:`item has been added`})
      }
      setCharge('')
      setAmount('')
    }
    else{
        handleAlert({type:'danger',text:`charge can't be empty and amount valve has to be bigger than zero`})
    }
  }
  const clearExpenses = () => {
    setExpenses([]) //initial expense is an array so [] is used instead of ''
    handleAlert({type:'danger',text:`all items has been deleted`})
  }
  const handleEdit = (id) => {
      let expense = expenses.find(item => item.id === id);
      let { charge, amount } = expense;
      setCharge(charge)
      setAmount(amount)
      setEdit(true)
      setId(id)
    }
    const handleDelete = id => {
      let tempExpenses = expenses.filter(item => item.id !== id);
      setExpenses(tempExpenses);
      handleAlert({type:'danger',text:`item has been deleted`})
    };
  return (
    //  <></>react fragments
    <>      
      {alert.show && <Alert type={alert.type} text={alert.text}/>}
      <Alert />
      <h1>Budget Calculator</h1>
      <main className='App'>
        <ExpenseForm 
          charge={charge} 
          amount={amount} 
          handleAmount={handleAmount} 
          handleCharge={handleCharge} 
          handleSubmit={handleSubmit}
          edit={edit}  
        />
        <ExpenseList 
          expenses={expenses} 
          clearExpenses={clearExpenses} 
          handleEdit={handleEdit} 
          handleDelete={handleDelete}
        />
      </main>
      <h1>Total Spending: {''}
        <span className='total'>
          ${''}
          {expenses.reduce((acc,cur)=>{
            return (acc += parseInt(cur.amount));//parseInt to pass strings and return integers
          },0)}
        </span>
      </h1>
    </>
  );
}

export default App;
