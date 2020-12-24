import { useCallback, useState } from "react"

export const useHTTP = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const request = useCallback(
        async (url, method = 'GET', body = null, headers = {}) => {
            setLoading(true);
            try {
                if (body) {
                    body = JSON.stringify(body);
                    headers['content-type'] = 'application/json';
                }
                const response = await fetch(url, {method, body, headers});
                const data = await response.json();

                if (!response.ok) {
                    throw new Error(data.message || 'Sorry, Error')
                }
                setLoading(false);
                return data

            } catch (error) {
                setLoading(false);
                setError(error.message);
                throw error;
            }
        },
        [],
    );

    const clearError = useCallback(() => {setError(null)}, [])

    return ({loading, request, error, clearError});
}
