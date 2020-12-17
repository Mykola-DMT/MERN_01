import React, {useCallback, useContext, useEffect, useState} from 'react'
import {useHttp} from "../../hooks/http.hook";
import {AuthContext} from "../../context/AuthContext";
import {Loader} from "../../components/Loader";
import {FilmsList} from "../../components/FilmsList";

export const FilmsPage = () => {
    const [films, setFilms] = useState([])
    const {loading, request} = useHttp()
    const {token} = useContext(AuthContext)

    const fetchFilms = useCallback(async  () => {
        try{
            const fetched = await request('api/film/', 'GET', null,{
                Authorization: `Bearer ${token}`
            })
            setFilms(fetched)
        }catch (e) {}
    },[token,request])

    useEffect(() => {
        fetchFilms()
    },[fetchFilms])

    if(loading){
        return <Loader/>
    }
    return (
        <>
            {!loading && <FilmsList films={films}/>}
        </>
    )
}
