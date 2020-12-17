import React, {useCallback, useContext, useEffect, useState} from 'react'
import {useHttp} from "../../hooks/http.hook";
import {useParams} from 'react-router-dom'
import {AuthContext} from "../../context/AuthContext";
import {Loader} from "../../components/Loader";
import {EditCard} from "../../components/EditCard";


export const EditFilmPage = () => {

    const {token} = useContext(AuthContext)
    const {loading, request} = useHttp()
    const filmId = useParams().id
    const [film, setFilm] = useState(null)

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
        return <Loader/>
    }
    return (
        <>

            { !loading && film && <EditCard film={film}/>}
        </>
    )
}
