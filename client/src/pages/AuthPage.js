import React, {useState, useEffect, useContext} from 'react'
import "materialize-css"
import {useHttp} from '../hooks/http.hook'
import {useMessage} from "../hooks/message.hook";
import {AuthContext} from "../context/AuthContext";

function AuthPage() {
    const auth = useContext(AuthContext)
    const message = useMessage();
    const {loading, error, request, clearError} = useHttp()
    const [form, setForm] = useState({
        email: '', password: ''
    })

    const changeHandler = (event) => {
        setForm({...form, [event.target.name]: event.target.value})
    }

    const registerHandler = async () => {
        try{
            const data = await request('/api/auth/register', 'POST', {...form})
            message(data.message)
        }catch (e) {
            console.log(e)
        }
    }
    const loginHandler = async () => {
        try{
            const data = await request('/api/auth/login', 'POST', {...form})
            console.log(data)
            auth.login(data.token, data.userId)
        }catch (e) {
            console.log(e)
        }
    }

    useEffect(() => {
        message(error)
        clearError()
    }, [error, message, clearError])

    return (
        <div className="row auth-card ">
            <div className="row col s6 offset-s3 ">
                <h1>pips</h1>
                <div className="card blue-grey darken-1 hoverable">
                    <div className="card-content white-text">
                        <span className="card-title center-align">Авторизация</span>
                        <div className="row">
                            <div className="input-field col s12">
                                <input
                                    type="text"
                                    id="e-mail"
                                    className="autocomplete"
                                    name="email"
                                    value={form.email}
                                    onChange={changeHandler}
                                />
                                    <label htmlFor="e-mail">E-mail</label>
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col s12">
                                <input
                                    type="password"
                                    id="pass"
                                    className="autocomplete"
                                    name="password"
                                    value={form.password}
                                    onChange={changeHandler}
                                />
                                <label htmlFor="pass">Пароль</label>
                            </div>
                        </div>
                    </div>
                    <div className="card-action ">
                        <a
                            className="btn"
                            disabled={loading}
                            onClick={loginHandler}
                        >
                            Войти
                        </a>
                        <a
                            className="btn right"
                            onClick={registerHandler}
                            disabled={loading}
                        >
                            Регистрация
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AuthPage;