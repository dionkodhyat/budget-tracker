import axios from 'axios'

const URL = "http://localhost:3001/"

const getAxiosInstance = () => {
    const accessToken = sessionStorage.getItem("accessToken");
    let axiosInstance = axios.create({
        headers : {
            "Authorization" : `Bearer ${accessToken}`
        }
    })
    return axiosInstance
}

export const getReq = async (endPoint) => {
    try {
        const response = await getAxiosInstance().get(URL + endPoint);
        return response;
    } catch (err) {
        return err;
    }
}

export const postReq = async (endPoint, jsonObj) => {
    try {
        const response = await getAxiosInstance().post(URL + endPoint, jsonObj);
        return response;
    } catch (err) {
        return err;
    }
}

export const deleteReq = async (endPoint, jsonObj) => {
    try {
        const response = await getAxiosInstance().delete(URL + endPoint, jsonObj);
        return response;
    } catch (err) {
        return err;
    }
}