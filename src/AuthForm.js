import React, {useState, useContext} from "react";
import {UserContext} from "./UserContext";

const AuthForm = () => {
    const {login} = useContext(UserContext);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [isLogin, setIsLogin] = useState(true);

    const handleSubmit = (e) => {
        e.preventDefault();
        const users = JSON.parse(localStorage.getItem("user")) || {};

        if (isLogin) {
            if (users[username] && users[username] === password) {
                login(username);
            } else {
                alert('Неправильные данные для входа');
            }
        } else {
            if (users[username]) {
                alert('Пользователь уже существует')
            } else {
                users[username] = password;
                localStorage.setItem("users", JSON.stringify(users));
                login(username);
            }
        }
    };

    return (
        <form onSubmit={handleSubmit} className="auth-form">
            <h2>{isLogin ? 'Вход' : 'Регистрация'}</h2>
            <input
                type="text"
                placeholder="Логин"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
            />
            <input
                type="password"
                placeholder="Пароль"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required/>
            <button type="submit">{isLogin ? 'Войти' : 'Зарегистрироваться'}</button>
            <button type="button" onClick={() => setIsLogin(!isLogin)}>{isLogin ? 'Перейти к регистрации' : 'Уже есть аккаунт? Войти'}</button>
        </form>
    );
};

export default AuthForm;