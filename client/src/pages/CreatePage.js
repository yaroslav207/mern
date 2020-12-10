import React, {useState, useContext}from 'react'
import "materialize-css"
import {useHttp} from "../hooks/http.hook";
import {AuthContext} from "../context/AuthContext"
import {useHistory} from "react-router-dom"

function CreatePage() {
    const history = useHistory()
    const auth = useContext(AuthContext)
    const [link, setLink] = useState('')
    const {request} = useHttp()
    const pressHandler = async (event) => {
        if(event.key === 'Enter'){
            try{
                const data = await request('/api/links/generate', 'POST', {from: link}, {
                    Authorization: `Bearer ${auth.token}`
                })
                history.push(`/details/${data.link._id}`)
                console.log(data)
            }catch (e) {
                
            }
        }
    }
    return (
        <div className="row create-link-wrapper">
            <div className="row col s6 offset-s3 ">
                <div className="card blue-grey darken-1 hoverable">
                    <div className="card-content white-text">
                        <span className="card-title center-align">Создать ссылку</span>
                        <div className="row">
                            <div className="input-field col s12">
                                <input
                                    type="text"
                                    id="link"
                                    value={link}
                                    onChange={(e) => {setLink(e.target.value)}}
                                    onKeyPress={pressHandler}
                                />
                                <label htmlFor="e-mail">Ссылка</label>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CreatePage;