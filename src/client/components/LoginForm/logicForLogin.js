import axios from "axios";

const login = (email, password) => {
    return axios.post(`http://localhost:4000/login`, { email, password })
        .then(res => (
            res.data
        ))
        .then(data => {
            console.log(data)
        })
        .catch(error => {})
};

export {login};