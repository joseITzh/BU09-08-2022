import { useEffect, useState } from "react";

import axios from 'axios';

function useFetch(baseURL) { // In a custom hook you don't return JSX. You only return data and states you might want to use.
    
        const [data, setData] = useState(null) // Null because we don't know what kind of data we might receive, could be arrays, objects etc...
        const [loading, setLoading] = useState(false) 
        const [error, setError] = useState(null) // Holds the errors.

    // Make an API call, whenever this hook gets called.
    // And we use the useEffect, so that it triggers a function every time the component gets rendered.
    
    // Get request.
    useEffect(() => {
        setLoading(true);
        // We pass an URL whenver we call this hook.
        axios.get(baseURL).then((response) => {
            setData(response.data); // Using the .data property, we obtain the response data.
        }).catch((err) => { // setError equal to the error we grab at catch.
            setError(err);
        }).finally(() => { // A function that will run no matters what happens.
            setLoading(false);
        });
    }, [baseURL]); // If the URL changes, we want to request new data.

// Create function that triggers the API call, to refresh page.    
const refetch = () => {
    setLoading(true);
        // We pass an URL whenver we call this hook.
        axios.get(baseURL).then((response) => {
            setData(response.data); // Using the .data property, we obtain the response data.
            console.log("DATA REFRESHED")
        }).catch((err) => { // setError equal to the error we grab at catch.
            setError(err);
        }).finally(() => { // A function that will run no matters what happens.
            setLoading(false);
        });
}

return {data, loading, error, refetch};
}

export default useFetch;