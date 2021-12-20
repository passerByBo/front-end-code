import React, { useEffect } from "react";
import axios  from 'axios'
const App = () => {
    useEffect(() => {
       axios.get('/dev-api/getData')
    }, [])
    return <h1>react-ssr</h1>
}

export default App;