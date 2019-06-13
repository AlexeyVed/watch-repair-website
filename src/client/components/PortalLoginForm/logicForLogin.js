import axios from "axios";

const login = (email, password) => {

    axios.post(`http://localhost:4000/login`, { email, password })
        .then(res => {
            console.log(res.data)
        })
        .catch(error => {})
};

export {login};