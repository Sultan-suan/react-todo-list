import React from 'react';
import ToDoItem from "./ToDoItem";

function ToDoList({tasks, onToggle, onDelete, onEdit}) {

    return (
        <ul>
            {tasks.map(task => (
                <li key={task.id}>
                <ToDoItem
                    task={task}
                    onToggle={onToggle}
                    onDelete={onDelete}
                    onEdit={onEdit}
                />
                </li>
            ))}
        </ul>
    )
}

export default ToDoList