import React, { useState, useEffect } from 'react';
import axios from 'axios';
import List from './component/List';
import "./component/styles.css"
const App = () => {
  const [user,setuser]=useState({username:"",password:""})
  const [isloggedin,setisloggedin]=useState(false)
  const [lists, setLists] = useState([]);
  const [listitle,setlisttitle]=useState("")
// Fetch api functions Here
const Register = async (data) => {
  try {
    const response = await fetch('https://dark-trunks-foal.cyclic.app/api/users/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    const newList = await response.json();
    console.log(newList);
    setisloggedin(true)
  } catch (error) {
    console.error('Error adding list:', error);

  }
};
const Login = async (data) => {
  try {
    const response = await fetch('https://dark-trunks-foal.cyclic.app/api/users/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    const newList = await response.json();
    console.log(newList);
    setisloggedin(true)
  } catch (error) {
    Register(data)
    console.error('Error adding list:', error);
  }
};
const Drageetonewlist = async (title,listId ) => {
  try {
    const response = await fetch('https://dark-trunks-foal.cyclic.app/api/tasks', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({title,listId}),
    });

    const newList = await response.json();
    console.log(newList);
  } catch (error) {
    console.error('Error adding list:', error);
  }
};
const handleAddnelist=async()=>{
  axios.post('https://dark-trunks-foal.cyclic.app/api/lists',{title:listitle})
  .then((response) => console.log(response.data))
  .catch((error) => console.error(error));
}
const GetList = async ( ) => {
  try {
    const response = await fetch('https://dark-trunks-foal.cyclic.app/api/lists', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      // body: JSON.stringify({listId}),
    });

    const newList = await response.json();
    return newList
  } catch (error) {
    console.error('Error adding list:', error);
  }
};


// make function callable here

  const Handlesubmit=(e)=>{
    e.preventDefault()
    Login(user)
    
}
const HandleLogout=async()=>{
  try {
    const response = await fetch('https://dark-trunks-foal.cyclic.app/api/users/logout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    });

    const newList = await response.json();
    console.log(newList);
    setisloggedin(false)
  } catch (error) {
    console.error('Error adding list:', error);
  }
}

const handleTaskDrop = (e, newListId) => {
    const taskId = e.dataTransfer.getData('text/plain');
    console.log(e.dataTransfer.getData('text/plain'),newListId);
   
    Drageetonewlist(e.dataTransfer.getData('text/plain'),newListId)
window.location.reload()
};

// useffect update states Here
  useEffect(() => {
    // Fetch lists from the server
    // GetList().then((res)=>console.log(res))
    axios.get('https://dark-trunks-foal.cyclic.app/api/lists',{
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
      },
    })
      .then((response) => setLists(response.data))
      .catch((error) => console.error(error));
  }, []);


  return (
    <div >
    {true ? 
     ( <>
     <div style={{display:"flex",justifyContent:"space-between"}}>
      <h1 style={{margin:"auto"}}>Task Board</h1>
     <button onClick={()=>HandleLogout()}
     style={{width:"200px",height:"40px",margin:"auto"}}>Logout</button>
     </div>

       <div style={{display:"flex",flexDirection:"row",gap:"10px"}} >
       {lists.map((list) => (
         <List key={list.id} id={list.id} title={list.title}
          onTaskDrop={(e)=>handleTaskDrop(e,list.id)} />
       ))}
       <div className='listform'>
       <input className='Aaddnewlistinput' onChange={(e)=>setlisttitle(e.target.value)} type="text" name="" placeholder='List Name' id="" />
      <button className='Aaddnewlistbutton'
       onClick={handleAddnelist} disabled={listitle===""} >ADD New List</button>
       </div>  
     </div>
      </>) : 
      <form onSubmit={(e)=>Handlesubmit(e)}>  <center> <h1>  Login / Signup </h1> </center>   
        <div class="container">   
            <label>Username : </label>   
            <input type="text" onChange={(e)=>setuser({...user,username:e.target.value})} placeholder="Enter Username" name="username" required/>  
            <label>Password : </label>   
            <input type="password" onChange={(e)=>setuser({...user,password:e.target.value})} placeholder="Enter Password" name="password" required/>  
            <button type="submit" >Login</button>   
        </div>   
       </form> }
    </div>
  );
};

export default App
