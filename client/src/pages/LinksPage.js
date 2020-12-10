import React,{useState,useEffect,useContext,useCallback} from 'react'
import "materialize-css"
import {AuthContext} from "../context/AuthContext";
import {useHttp} from "../hooks/http.hook";
import {useParams} from "react-router-dom";
import {Loader} from "../components/Loader";
import {LinkList} from "../components/LinkList";

function LinksPage() {
    const {token} = useContext(AuthContext)
    const [links, setLinks] = useState([])
    const {request, loading} = useHttp()

    const fetchLink = useCallback(async () => {
        try {
            const fetched = await request(`/api/links/`, 'GET', null, {
                Authorization: `Bearer ${token}`
            })
            console.log(`fuck fuck fuck ${fetched}`)
            setLinks(fetched)
        } catch (e) {}

    }, [token, request])
    useEffect(() => {
        fetchLink()
    },[fetchLink])

    if (loading){
        return <Loader/>
    }
    return (
        <>
            {!loading && <LinkList links={links} />}
        </>
    );
}

export default LinksPage;