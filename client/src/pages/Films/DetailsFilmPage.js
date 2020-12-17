import React, {useCallback, useContext, useEffect, useState} from 'react'
import {useParams} from 'react-router-dom'
import {useHttp} from "../../hooks/http.hook";
import {AuthContext} from "../../context/AuthContext";
import {Loader} from "../../components/Loader";
import {FilmCard} from "../../components/FilmCard";

export const DetailsFilmPage = () => {
    const {token} = useContext(AuthContext)
    const {request,loading} = useHttp()
    const [film,setFilm] = useState(null)
    const filmId = useParams().id

    const getFilm = useCallback(async () => {
        try{
            const fetched = await request(`/api/film/${filmId}`,'GET',null,{
                Authorization: `Bearer ${token}`
            })
            setFilm(fetched)
        }catch (e) {}
    },[token,filmId,request])

    useEffect(() => {
        getFilm()
    },[getFilm])

    if(loading){
        <Loader/>
    }

    return (
        <>
            <h1>Film Details</h1>
            { !loading && film && <FilmCard film={film}/> }
        </>
    )
}
