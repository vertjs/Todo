import  { useState, useEffect } from 'react'

export default function useJsonFetch(url) {
    const [items, setItems] = useState([])

    useEffect( () => {
        fetch(url)
        .then(response => {
            if(response.ok) {
                return response.json()
            }})
            .then(data => setItems(data))
            .catch(err => console.log(err))
    }, [url] )

    return [items];
}