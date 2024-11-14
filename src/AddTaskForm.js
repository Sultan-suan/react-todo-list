import React, {useState} from 'react';

function AddTaskForm({onAdd}) {
    const [title, setTitle] = useState('');
    const [deadline, setDeadline] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (title.trim()) {
            onAdd(title, deadline);
            setTitle('');
            setDeadline('');
        }
    };
    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Введите задачу..."
            />
            <input
                type="datetime-local"
                value={deadline}
                onChange={(e) => setDeadline(e.target.value)}
            />
            <button type="submit">Добавить задачу</button>
        </form>
    )
}

export default AddTaskForm;