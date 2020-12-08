import React, {useCallback, useState}  from 'react'

export const useHttp = () => {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    const request = useCallback( async (url, method = 'GET', body = null, headers = {}) => {
        try {
            if (body) {
                body = JSON.stringify(body)
                headers['Content-Type'] = 'application/json'

            }
            setLoading(true)
            const response = await fetch(url, {method, body, headers});
            const data = await response.json();

            if(!response.ok){
                throw new Error(data.massage || 'Что-то пошло не так')
            }
        } catch (e) {
            setLoading(false);
            setError(e.message);
            throw e
        }
    }, [])

    const clearError = () => {
        setError(null)
    }

    return {loading, request, error, clearError}
}