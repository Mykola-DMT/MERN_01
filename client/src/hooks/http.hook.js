import {useState, useCallback} from 'react'

export const useHttp = () =>{
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const [mess, setMess] = useState(null)

    const request = useCallback( async (url, method = 'GET', body = null, headers = {}) => {
        setLoading(true)
        try{
            if(body){
                body = JSON.stringify(body)
                headers['Content-Type'] = 'application/json '
            }

            const response = await fetch(url,{method, body, headers})
            const data = await response.json()

            if(!response.ok){
                throw new Error(data.message || 'Something goes wrong!')
            }

            setMess(data.message)

            setLoading(false)
            console.log(data._id)
            return data
        }catch (e){
            setLoading(false)
            setError(e.message)
            throw e
        }
    },[])

    const clearError = useCallback(() => setError(null), [])
    const clearMess = useCallback(() => setMess(null),[])
    return { loading, request,error, clearError,mess,clearMess }
}
