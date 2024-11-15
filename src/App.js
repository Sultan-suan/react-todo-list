import React, {useState, useEffect} from 'react';
import ToDoList from "./ToDoList";
import AddTaskForm from "./AddTaskForm";
import './App.css';

function App() {
    const [tasks, setTasks] = useState([]);
    const [filter, setFilter] = useState("all");
    const [searchQuery, setSearchQuery] = useState("");
    const [sortOrder, setSortOrder] = useState("newest");
    const [theme, setTheme] = useState(() => localStorage.getItem("theme") || "light");

    // Сохранение и применение темы
    useEffect(() => {
        localStorage.setItem("theme", theme);
        document.body.className = theme === 'dark' ? 'dark-theme' : 'light-theme';
    }, [theme]);

    const toggleTheme = () => {
        setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
    };

    // Загрузка задач из localStorage при первой загрузке
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

    // Сохранение задач в localStorage при изменении
    useEffect(() => {

        if(tasks.length > 0) {
            localStorage.setItem('tasks', JSON.stringify(tasks));
        } else {
            localStorage.removeItem('tasks')
        }

    }, [tasks]);

    // Уведомления
    useEffect(() => {
        if (Notification.permission !== 'granted') {
            Notification.requestPermission().then(permission => {
                if(permission === 'granted') {
                    console.log("Права на уведомление предоставлены")
                } else {
                    console.log("Права на уведомление отключены")
                }
            });
        }
    }, []);

    const sendNotification = (task) => {
        if (Notification.permission === 'granted') {
            new Notification(`Дедлайн: ${task.title}`, {
                body: `Время истекло для задачи "${task.title}"`,
            });
        } else {
            console.log("Уведомление не разрешены");
        }
    };

    useEffect(() => {
        const now = new Date();

        tasks.forEach((task) => {
            if (task.deadline && !task.notified) {
                const taskDeadline = new Date(task.deadline);
                const timeToNotify = taskDeadline - now;

                if (timeToNotify > 0) {
                    console.log(`Планируем уведомление для задачи "${task.title}" через ${timeToNotify / 1000} секунд`);
                    const timer = setTimeout(() => {
                        sendNotification(task);
                        setTasks((prevTasks) =>
                            prevTasks.map((t) =>
                                t.id === task.id ? {...t, notified: true} : t
                            )
                        );
                    }, timeToNotify);
                    return () => clearTimeout(timer);
                }
            }
        });

    }, [tasks]);


    const addTask = (title, deadline) => {
        const newTask = {
            id: Date.now(),
            title,
            completed: false,
            deadline: deadline ? deadline.toISOString() : null,
            notified: false,
            createdAt: new Date().toISOString(),
        };
        setTasks((prevTasks) => [...prevTasks, newTask]);
    };

    const toggleTask = (id) => {
        setTasks((prevTasks) =>
            prevTasks.map((task) =>
                task.id === id ? {...task, completed: !task.completed} : task
            )
        );
    };

    const deleteTask = (id) => {
        setTasks((prevTasks) =>
            prevTasks.filter((task) => task.id !== id)
        );
    };

    const editTask = (id, newTitle) => {
        setTasks((prevTasks) =>
            prevTasks.map((task) =>
                task.id === id ? {...task, title: newTitle} : task
            )
        );
    };

    const clearCompletedTasks = () => {
        setTasks((prevTasks) => prevTasks.filter((task) => !task.completed));
    };

    const filteredTasks = tasks
        .filter((task) => {
            if (filter === 'active') return !task.completed;
            if (filter === 'completed') return task.completed;
            return true;
        })
        .filter((task) => task.title.toLowerCase().includes(searchQuery.toLowerCase()));

    const sortedTasks = filteredTasks.sort((a, b) => {
        if (sortOrder === 'newest') {
            return new Date(b.createdAt) - new Date(a.createdAt);
        } else if (sortOrder === 'oldest') {
            return new Date(a.createdAt) - new Date(b.createdAt);
        } else if (sortOrder === 'completed') {
            return a.completed - b.completed;
        }
        return 0;
    });

    return (
        <div className="App">
            <h1>React To-Do-List с Уведомлениями</h1>
            <button onClick={toggleTheme}>
                {theme === 'light' ? "Тёмная тема" : "Светлая тема"}
            </button>

            <AddTaskForm onAdd={addTask}/>

            <input
                type="text"
                placeholder="Поиск задач..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="search-bar"
            />

            <div className="sort-filters">
                <label>Сортировать по:</label>
                <select onChange={(e) => setSortOrder(e.target.value)} value={sortOrder}>
                    <option value="newest">Сначала новые</option>
                    <option value="oldest">Сначала старые</option>
                    <option value="completed">По статусу</option>
                </select>
            </div>

            <div className="filters">
                <button onClick={() => setFilter("all")}>Все</button>
                <button onClick={() => setFilter("active")}>Активные</button>
                <button onClick={() => setFilter("completed")}>Выполненные</button>
            </div>

            <ToDoList tasks={sortedTasks} onToggle={toggleTask} onDelete={deleteTask} onEdit={editTask}/>

            <button onClick={clearCompletedTasks} className="clear-button">
                Очистить выполненные задачи
            </button>
        </div>
    );
}

export default App;
