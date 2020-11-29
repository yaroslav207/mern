import React from 'react'
import "materialize-css"

function AuthPage() {
    return (
        <div className="row auth-card ">
            <div className="row col s6 offset-s3 ">
                <h1>Сократи ссылку</h1>
                <div className="card blue-grey darken-1 hoverable">
                    <div className="card-content white-text">
                        <span className="card-title center-align">Авторизация</span>
                        <div className="row">
                            <div className="input-field col s12">
                                <input type="text" id="e-mail" className="autocomplete" name="email" />
                                    <label htmlFor="e-mail">E-mail</label>
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col s12">
                                <input type="password" id="pass" className="autocomplete" name="pass"/>
                                <label htmlFor="pass">Пароль</label>
                            </div>
                        </div>
                    </div>
                    <div className="card-action ">
                        <a href="#" className="btn">Войти</a>
                        <a href="#" className="btn right">Регистрация</a>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AuthPage;