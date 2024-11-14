import React, {useState} from 'react';

function ToDoItem({task, onToggle, onDelete, onEdit}) {
    const [isEditing, setIsEditing] = useState(false);
    const [newTitle, setNewTitle] = useState(task.title || "");

    const handleEdit = () => {
        // Если режим редактирования включён и есть текст, сохраняем изменения
        if (isEditing && newTitle.trim()) {
            onEdit(task.id, newTitle);
        }
        setIsEditing(!isEditing);
    };

    const handleChange = (e) => {
        setNewTitle(e.target.value);
    };

    const handleCancel = () => {
        setNewTitle(task.title);
        setIsEditing(false);
    };

    return (
        <div className="todo-item">
            <input
                type="checkbox"
                checked={task.completed}
                onChange={() => onToggle(task.id)}
            />
            {isEditing ? (
                <>
                    <input
                        type="text"
                        value={newTitle}
                        onChange={handleChange}
                        autoFocus
                    />
                    <button onClick={handleEdit}>Сохранить</button>
                    <button onClick={handleCancel}>Отменить</button>
                </>
            ) : (
                <>
          <span className={task.completed ? 'completed' : ''}>
            {task.title}
          </span>
                    <button onClick={handleEdit}>Редактировать</button>
                </>
            )}
            <button onClick={() => onDelete(task.id)}>Удалить</button>
        </div>
    );
}

export default ToDoItem;
