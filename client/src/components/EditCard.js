import React, {useContext, useEffect, useState} from 'react'
import {useHttp} from "../hooks/http.hook";
import {Link, useHistory} from 'react-router-dom'
import {AuthContext} from "../context/AuthContext";
import {useMessage} from "../hooks/message.hook";

export const EditCard = ({film}) => {
    const history = useHistory()
    const {loading, request, error, clearError,mess,clearMess} = useHttp()
    const message = useMessage()
    const {token} = useContext(AuthContext)

    const [form,setForm] = useState({
        name: film.name, genre: film.genre, year: film.year, isWatched: film.isWatched
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

    const editHandler = async () => {
        try{
            console.log(form)
            const data = await request(`/api/film/${film._id}/edit`,'PUT',{...form},{
                Authorization: `Bearer ${token}`
            })

            if(data.message === 'Successfully edited!'){
                history.push(`/film/${film._id}`)
            }
        }catch (e) {}
    }

    useEffect(() => {
        window.M.updateTextFields()
    },[])

    const changeHandler = event => {
        setForm({...form, [event.target.name]: event.target.value })
    }

    return(
        <div className="row">
            <div className="col s8 offset-s2" style={{paddingTop: '2rem',backdropFilter: "blur(3px)"}}>
                <h1>Edit Film</h1>
                <div style={{paddingBottom:'5%'}}>
                    <div className="input-field">
                        <input
                            placeholder="Name"
                            type="text"
                            name="name"
                            value={form.name}
                            onChange={changeHandler}
                        />
                        <label htmlFor="name">Name</label>
                    </div>

                    <div className="input-field">
                        <input
                            placeholder="genre"
                            type="text"
                            name="genre"
                            value={form.genre}
                            onChange={changeHandler}
                        />
                        <label htmlFor="genre">Genre</label>
                    </div>

                    <div className="input-field">
                        <input
                            placeholder="Year"
                            type="number"
                            min="1970"
                            max={new Date().getFullYear()+1}
                            name="year"
                            value={form.year}
                            onChange={changeHandler}
                        />
                        <label htmlFor="year">Year</label>
                    </div>

                    <div>
                        <label>
                            <input
                                type="checkbox"
                                name="isWatched"
                                checked={!!form.isWatched}
                                value={!form.isWatched}
                                onChange={changeHandler}
                            />
                            <span>isWatched</span>
                        </label>
                    </div>
                </div>
                <div>
                    <button
                        className="btn yellow darken-4"
                        onClick={editHandler}
                        disabled={loading}
                        style={{marginRight:'70%'}}
                    >
                        Edit
                    </button>
                    <button className="btn blue-grey lighten-4" style={{color:'white'}}>
                        <Link to={`/film/${film._id}`}>Back</Link>
                    </button>
                </div>

            </div>
        </div>
    )
}
