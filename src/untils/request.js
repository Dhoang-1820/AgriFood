import axios from 'axios'

const request = axios.create({
    baseURL: 'http://localhost:8080/api/',
})

export const get = async (path, options = {}) => {
    const response = await request.get(path, options)
    return response
}

export const post = async (path, data, options = {}) => {
    const response = await request.post(path, data, options)
    return response
}

export const put = async (path, data) => {
    const response = await request.put(path, data)
    return response
}

export const remove = async (path, data) => {
    const response = await request.delete(path, data)
    return response
}

export const uploadfiles = async (file) => {
    try {
        const response = await request.post('uploadfiles', file)
        return response.data.data
    } catch (error) {
        return error
    }
}

export const getImages = (filename) => {
    return request.defaults.baseURL + `uploadfiles/files/${filename}`
}

export default request
