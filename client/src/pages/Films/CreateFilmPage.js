import React, {useContext, useEffect, useState} from 'react'
import {useHttp} from "../../hooks/http.hook";
import {useMessage} from "../../hooks/message.hook";
import {useHistory } from 'react-router-dom'
import {AuthContext} from "../../context/AuthContext";


export const CreateFilmPage = () => {
    const history = useHistory()
    const auth = useContext(AuthContext)
    const message = useMessage()
    const {request,loading, error, clearError,mess,clearMess} = useHttp()
    const [form,setForm] = useState({
        name: '', genre: '', year: 0, isWatched: false
    })

    useEffect(() =>{
        if(error){
            message(error)
            clearError()
        }
        else{
            message(mess)
            clearMess()
        }
    },[error, message,clearError,mess,clearMess])

    const changeHandler = event => {
        setForm({...form, [event.target.name]: event.target.value })
    }

    useEffect(() => {
        window.M.updateTextFields()
    },[])

    const addHandler = async () => {
        try{
            const data = await request('/api/film/add','POST',{...form},{
                Authorization: `Bearer ${auth.token}`
            })

            if(data.message === 'Successfully added!'){
                history.push(`/film`)
            }
        }catch (e) {}
    }

    return (
        <div className="row">
            <div className="col s8 offset-s2" style={{paddingTop: '2rem', backdropFilter: "blur(3px)"}}>
                <h1>Add Film</h1>
                <div style={{paddingBottom:'5%'}}>
                    <div className="input-field">
                        <input
                            placeholder="Name"
                            id="name"
                            type="text"
                            name="name"
                            // value={name}
                            onChange={changeHandler}
                        />
                        <label htmlFor="name">Name</label>
                    </div>

                    <div className="input-field">
                        <input
                            placeholder="genre"
                            id="email"
                            type="text"
                            name="genre"
                            //value={genre}
                            //onChange={e => setFilm(e.target.value)}
                            onChange={changeHandler}
                        />
                        <label htmlFor="genre">Genre</label>
                    </div>

                    <div className="input-field">
                        <input
                            placeholder="Year"
                            id="year"
                            type="number"
                            min="1970"
                            max={new Date().getFullYear()+1}
                            name="year"
                            // value={year}
                            // onChange={e => setFilm(e.target.value)}
                            onChange={changeHandler}
                        />
                        <label htmlFor="year">Year</label>
                    </div>

                    <div>
                        <label>
                            <input
                                type="checkbox"
                                name="isWatched"
                                id="isWatched"
                                defaultValue={!form.isWatched}
                                onChange={changeHandler}
                            />
                            <span>isWatched</span>
                        </label>
                    </div>
                </div>
                <div>
                    <button
                        className="btn yellow darken-4"
                        onClick={addHandler}
                        disabled={loading}
                    >
                        Add
                    </button>
                </div>

            </div>
        </div>
    )
}
