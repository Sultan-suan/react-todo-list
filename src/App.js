import React, {useState, useEffect} from 'react';
import ToDoList from "./ToDoList";
import AddTaskForm from "./AddTaskForm";
import './App.css'


function App() {
    const [tasks, setTasks] = useState([]);
    const [filter, setFilter] = useState("all")

    useEffect(() => {
        const storedTasks = localStorage.getItem('tasks');
        if (storedTasks) {
            try {
                setTasks(JSON.parse(storedTasks));
            } catch (error) {
                console.error("Ошибка при загрузке задач из localStorage", error);
                localStorage.removeItem('tasks');
            }
        }
    }, []);

    useEffect(() => {
        if (tasks.length > 0) {
            localStorage.setItem('tasks', JSON.stringify(tasks));
        }
    }, [tasks]);

    const addTask = (title) => {
        const newTask = {id: Date.now(), title, completed: false};
        setTasks([...tasks, newTask]);
    }

    const toggleTask = (id) => {
        setTasks(
            tasks.map(task =>
                task.id === id ? {...task, completed: !task.completed} : task
            )
        );
    };

    const deleteTask = (id) => {
        setTasks(tasks.filter(task => task.id !== id));
    };

    const editTask = (id, newTitle) => {
        setTasks(prevTasks =>
            prevTasks.map(task =>
                task.id === id ? {...task, title: newTitle} : task
            )
        );
        // console.log("Редактирование задачи:", id, newTitle);
    };

    const filteredTasks = tasks.filter(task => {
        if(filter === 'active') return !task.completed;
        if(filter === 'completed') return task.completed
        return true
    })

    return (
        <div className="App">
            <h1>React To-Do-List</h1>
            <AddTaskForm onAdd={addTask}/>
            <div className="filters">
                <button onClick={() => setFilter("all")}>Все</button>
                <button onClick={() => setFilter("active")}>Активные</button>
                <button onClick={() => setFilter("completed")}>Выполненные</button>
            </div>
            <ToDoList
                tasks={filteredTasks}
                onToggle={toggleTask}
                onDelete={deleteTask}
                onEdit={editTask}/>
        </div>

    );
}

export default App
