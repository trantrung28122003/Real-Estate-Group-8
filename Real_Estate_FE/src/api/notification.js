import axios from './index';
const root_uri = '/notification'
export default {
    list(page, query, completion, error) {
        axios
            .get(`${root_uri}/?page=${page}`, {
                params: query
            })
            .then((response) => {
                completion(response.data)
            })
            .catch((err) => {
                if (error) {
                    error(err)
                }
            })
    },

    markAsRead(id, completion, error) {
        axios
            .put(`${root_uri}/mark-read/${id}`)
            .then((response) => {
                completion(response.data)
            })
            .catch((err) => {
                if (error) {
                    error(err.response)
                }
            })
    },

    markAsReadList(data, completion, error) {
        axios
            .put(`${root_uri}/mark-read-list`, data)
            .then((response) => {
                completion(response.data)
            })
            .catch((err) => {
                if (error) {
                    error(err.response)
                }
            })
    },
}