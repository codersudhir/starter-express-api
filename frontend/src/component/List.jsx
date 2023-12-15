import React, { useEffect, useState } from 'react';
import Task from "./Task";
import axios from 'axios';

const List = ({id, title, onTaskDrop }) => {
  const [list,setlist]=useState([])
  useEffect(() => {
    // Fetch lists from the server
    axios.get('https://dark-trunks-foal.cyclic.app/api/tasks')
      .then((response) => setlist(response.data))
      .catch((error) => console.error(error));
  }, []);

  return (<>
   <div className="list"
    style={{border:"1px solid black",padding:"5px"}} 
   onDrop={(e) => onTaskDrop(e, list.id)} onDragOver={(e) => e.preventDefault()}>
    <p>List {id}</p>
      <h3>{title}</h3>
      {list.map((task) => task.ListId===id && <Task key={task.id} task={task} /> )}
    </div>
     </>
   
  );
};

export default List;
