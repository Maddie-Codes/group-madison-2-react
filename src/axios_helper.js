import axios from "axios";



axios.defaults.baseURL = 'http://localhost:8080/';
axios.defaults.headers.post['Content-Type'] = 'application/json';




export const getAuthToken = () => {
    const token = window.localStorage.getItem("auth_token");
    return token ? `Bearer ${token}` : null;
};


export const setAuthToken = (token) => {
    window.localStorage.setItem("auth_token", token)
}

    export const request = async (method, url, data) => {
        let headers = {};

        const authToken = getAuthToken();
        if (authToken) {
           headers = { "Authorization":  `${authToken}` };
        }

        return axios({

            method: method,
            headers: headers,
            url: url,
            data: data,
            credentials: 'include'  // Include this line if dealing with cross-origin requests and you want to send credentials.
        });
    };


    export const requestAnon = async (method, url, data) => {


        return axios({
            method: method,
            url: url,
            data: data,
            credentials: 'include'  // Include this line if dealing with cross-origin requests and you want to send credentials.
        });
    };

