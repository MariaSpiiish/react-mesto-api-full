import { Link } from "react-router-dom";
import { useState } from 'react';


function Register({onRegister}) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    function handleSubmit(e) {
        e.preventDefault();
        onRegister({
            email,
            password
        });
    }

    return (
        <div className="auth">
            <h2 className="auth__title">Регистрация</h2>
            <form className="auth__form" onSubmit={handleSubmit}>
                <input 
                    name="email"
                    id="email-input"
                    type="email"
                    required
                    placeholder="Email" 
                    className="auth__input auth__input_type_email"
                    value={email}
                    onChange={(e) => {
                        return setEmail(e.target.value);
                    }}
                />
                <span id="email-error" className="email-input-error auth__input-error"></span>
                <input 
                    name="password"
                    id="password-input" 
                    type="password" 
                    required
                    minLength="8"
                    maxLength="30"
                    placeholder="Пароль" 
                    className="auth__input auth__input_type_password"
                    value={password}
                    onChange={(e) => {
                        return setPassword(e.target.value);
                    }}
                />
                <span id="password-error" className="password-input-error auth__input-error"></span>
                <button type="submit" className="auth__submit-button opacity">Зарегистрироваться</button>
            </form>
            
            <p className="auth__is-registered">Уже зарегистрированы? <Link to="/sign-in" className="auth__login-link opacity">Войти</Link></p>

        </div>
    )
}

export default Register;