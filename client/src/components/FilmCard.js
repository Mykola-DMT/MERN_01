import React, {useContext} from 'react'
import {Link, useHistory} from 'react-router-dom'
import {useHttp} from "../hooks/http.hook";
import {AuthContext} from "../context/AuthContext";

export const FilmCard = ({ film }) => {
    const {request} = useHttp()
    const {token} = useContext(AuthContext)
    const history = useHistory()

    const deleteHandler = async () =>{
        const conf = window.confirm(`Delete ${film.name}?`)
        try{
            if(conf){
                const del = await request(`/api/film/${film._id}/delete`,'DELETE', {film},{
                    Authorization: `Bearer ${token}`
                })
                if(del.message === 'Successfully deleted!'){
                    history.push(`/film`)
                }
            }

        }catch (e) {}
    }
    return (
        <div className="row">
            <div className="col s12 m6">
                {/*<div className="card indigo lighten-3">*/}
                <div className="card blue-grey lighten-1">
                    <div className="card-content white-text">
                        <span className="card-title">{film.name}</span>
                        <h6>Genre: {film.genre}</h6>
                        <h6>Year: {film.year}</h6>
                        <p style={{paddingTop:"1rem"}}>
                            <label>
                                <input type="checkbox" checked={film.isWatched} disabled="disabled"/>
                                <span style={{color:"white"}}>isWatched</span>
                            </label>
                        </p>

                    </div>
                    <div className="card-action grey darken-2">
                        <Link to={`/film/${film._id}/edit`}>Edit</Link>

                        <Link to={'#'} onClick={deleteHandler}>Delete</Link>
                        <Link to={'/film'}>Back to list</Link>
                    </div>
                </div>
            </div>
        </div>

    )
}
