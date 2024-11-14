import React, {useState} from 'react';

function ToDoItem({task, onToggle, onDelete, onEdit}) {
    const [isEditing, setIsEditing] = useState(false);
    const [newTitle, setNewTitle] = useState(task.title || "");

    const handleEdit = () => {
        // Если режим редактирования включён и есть текст, сохраняем изменения
        setIsEditing(true);
    };

    const handleSave = () => {
        onEdit(task.id, newTitle);
        setIsEditing(false);
    }


    return (
        <li className={task.completed ? "completed" : ""}>
            {isEditing ? (
                <>
                    <input
                        type="text"
                        value={newTitle}
                        onChange={(e) => setNewTitle(e.target.value)}
                    />
                    <button onClick={handleSave}>Сохранить</button>
                </>
            ) : (
                <>
          <span onClick={() => onToggle(task.id)}>
            {task.title}
          </span>
                    <button onClick={handleEdit}>Редактировать</button>
                </>
            )}
            <button onClick={() => onDelete(task.id)}>Удалить</button>
        </li>
    );
}

export default ToDoItem;
