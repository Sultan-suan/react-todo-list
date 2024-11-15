import React, {useState} from 'react';

function AddTaskForm({onAdd}) {
    const [title, setTitle] = useState('');
    const [deadlineDate, setDeadlineDate] = useState('');
    const [deadlineTime, setDeadlineTime] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!title) return;
        const deadline = deadlineDate && deadlineTime
            ? new Date(`${deadlineDate}T${deadlineTime}`)
            : null;

        onAdd(title, deadline);
        setTitle('');
        setDeadlineDate('');
        setDeadlineTime('');

    };
    return (
        <form onSubmit={handleSubmit} className="add-task-form">
            <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Введите задачу..."
            />
            <input
                type="date"
                value={deadlineDate}
                onChange={(e) => setDeadlineDate(e.target.value)}
            />
            <input
                type="time"
                value={deadlineTime}
                onChange={(e) => setDeadlineTime(e.target.value)}
            />
            <button type="submit">Добавить задачу</button>
        </form>
    )
}

export default AddTaskForm;