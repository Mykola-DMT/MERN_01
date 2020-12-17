import React, {useCallback, useContext, useEffect, useState} from 'react'
import {useHttp} from "../../hooks/http.hook";
import {AuthContext} from "../../context/AuthContext";
import {Loader} from "../../components/Loader";
import {UserCard} from "../../components/UserCard"

export const UserPage = () => {
    const {token} = useContext(AuthContext)
    const {request,loading} = useHttp()
    const [user,setUser] = useState(null)

    const User = useCallback(async () => {
        try{
            const fetched = await request(`/api/auth/profile`,'GET',null,{
                Authorization: `Bearer ${token}`
            })
            setUser(fetched)
        }catch (e) {console.log(e)}
    },[token,request])

    useEffect(() => {
        User()
    },[User])

    if(loading){
        <Loader/>
    }

    return (
        <>
            <h1>User Details</h1>
            { !loading && user && <UserCard user={user}/> }
        </>
    )
}
