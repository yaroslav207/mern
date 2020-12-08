import React, {useState, useEffect} from 'react'
import "materialize-css"
import {useHttp} from '../hooks/http.hook'
import {useMessage} from "../hooks/message.hook";

function AuthPage() {
    const message = useMessage();
    const {loading, error, request, clearError} = useHttp()
    const [form, setForm] = useState({
        email: '', password: ''
    })


    const changeHandler = (event) => {
        setForm({...form, [event.target.name]: [event.target.value]})
    }
    const registerHandler = async () => {
        try{
            const data = await request('/api/auth/register', 'POST', {...form})
            console.log(data)
        }catch (e) {

        }
    }
    useEffect(() => {
        message(error)
        clearError()
    }, [error, message])

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