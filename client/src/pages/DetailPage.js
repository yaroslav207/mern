import React, {useState, useCallback, useContext, useEffect} from 'react'
import {useParams} from 'react-router-dom'
import {useHttp} from '../hooks/http.hook'
import {AuthContext} from '../context/AuthContext'
import {Loader} from '../components/Loader'
import {LinkCard} from '../components/LinkCard'



function DetailPage() {
    const {token} = useContext(AuthContext)
    const [link, setLink] = useState(null)
    const {request, loading} = useHttp()
    const linkId = useParams().id

    const getLink = useCallback(async () => {
            try {
                const fetched = await request(`/api/links/${linkId}`, 'GET', null, {
                    Authorization: `Bearer ${token}`
                })
                console.log(fetched)
                setLink({...fetched})
            } catch (e) {}

            }, [token, linkId, request])
    useEffect(() => {
        getLink()
    },[getLink])

    if (loading){
        return <Loader/>
    }
    return (
        <>
            {!loading && link && <LinkCard link={link} />}
        </>
    );
}

export default DetailPage;