import { useState , useEffect} from 'react';

import Header from './Components/Header';
import Footer from './Components/Footer';
import Tasks from './Components/Tasks';
import AddTask from './Components/AddTask';


function App() {

  const [showAddTask, setShowAddTAsk] = useState(false);

  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const getTasks = async () => {
      const getTasksFromServer = await fetchTasks();
      setTasks(getTasksFromServer); 
    }

    getTasks();
  }, [])

  // Fetch tasks
  const fetchTasks = async () => {
    const res = await fetch('http://localhost:5000/tasks');
    const data = await res.json();

    return data;
  }

  // Fetch task
  const fetchTask = async (id) => {
    const res = await fetch(`http://localhost:5000/tasks/${id}`);
    const data = await res.json();

    return data;
  }

// Add Task
const addTask = async (task) => {

  const res = await fetch(`http://localhost:5000/tasks`, {
    method : 'POST',
    headers : {
      'Content-Type' : 'application/json'
    },
    body : JSON.stringify(task) 
  })

  const data = await res.json();
  setTasks([...tasks, data]);

  // const id = Math.floor(Math.random() * 1000 ) + 1;
  // const newTask = {id , ...task}
  // setTasks([...tasks, newTask])
}

// Delete task
const deleteTask = async (id) => {

  await fetch(`http://localhost:5000/tasks/${id}`, {
    method : 'DELETE'
  })

  setTasks(tasks.filter((task) => task.id !== id)); 
}

// Add Toggle for reminder
const toggleReminder = async (id) => {

  const taskTOToggle = await fetchTask(id)
  const updateTask = {
    ...taskTOToggle, 
    reminder : !taskTOToggle.reminder
  }

  const res = await fetch(`http://localhost:5000/tasks/${id}`,
  {
    method: 'PUT',
    headers : {
      'Content-Type' : 'application/json'
    },
    body : JSON.stringify(updateTask)
  })

  const data = await res.json()


  setTasks(tasks.map((task) => task.id === id ? {...task, reminder: data.reminder} : task))
}

  return (
    
    <div className="container">
      <Header onAdd = {()=> setShowAddTAsk(!showAddTask)} showAdd={showAddTask}/>
      {showAddTask && <AddTask onAdd={addTask}/>} 
      {tasks.length > 0 ? <Tasks tasks = {tasks} onDelete = {deleteTask} onToggle = {toggleReminder}/> : 'No tasks to show'}
      <Footer/>
    </div>
    
    
  );
}

export default App;
