import React, {useState} from 'react';

function AddTaskForm({onAdd}) {
    const [title, setTitle] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (title.trim()) {
            onAdd(title);
            setTitle('');
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
            <button type="submit">Добавить</button>
        </form>
    )
}

export default AddTaskForm;