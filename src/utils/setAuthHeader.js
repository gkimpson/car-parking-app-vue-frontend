import axios from "axios";

const setAuthHeader = (access_token) => {
    if (access_token) {
        axios.defaults.headers = {
            Accept: 'application/json',
            Authorization: 'Bearer ' + access_token,
        }
    } else {
        delete axios.defaults.headers.Authorization;
    }
}

export default setAuthHeader;