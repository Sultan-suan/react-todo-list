import React from 'react';
import ToDoItem from "./ToDoItem";
import {CSSTransition, TransitionGroup} from "react-transition-group";

function ToDoList({tasks, onToggle, onDelete, onEdit}) {

    return (
        <ul className="todo-list">
            <TransitionGroup>
                {tasks.map(task => (
                    <CSSTransition
                        key={task.id}
                        timeout={300}
                        classNames="task">
                        <ToDoItem
                            task={task}
                            onToggle={onToggle}
                            onDelete={onDelete}
                            onEdit={onEdit}
                        />
                    </CSSTransition>
                ))}
            </TransitionGroup>
        </ul>
    )
}

export default ToDoList