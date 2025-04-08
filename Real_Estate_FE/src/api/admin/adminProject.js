import axios from './index'
const root_uri = '/project'
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

    detail(id,completion, error) {
        axios
            .get(`${root_uri}/detail/${id}`)
            .then((response) => {
                completion(response.data)
            })
            .catch((err) => {
                if (error) {
                    error(err)
                }
            })
    },

    listRequest(page, query, completion, error) {
        axios
            .get(`${root_uri}/list-request/?page=${page}`, {
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

    rejectRequest(id, completion, error) {
        axios
            .put(`${root_uri}/reject-request/${id}`)
            .then((response) => {
                completion(response.data)
            })
            .catch((err) => {
                if (error) {
                    error(err)
                }
            })
    },

    acceptRequest(id, completion, error) {
        axios
            .put(`${root_uri}/accept-request/${id}`)
            .then((response) => {
                completion(response.data)
            })
            .catch((err) => {
                if (error) {
                    error(err)
                }
            })
    },

    delete(id, completion, error) {
        axios
            .delete(`${root_uri}/delete/${id}`)
            .then((response) => {
                completion(response.data)
            })
            .catch((err) => {
                if (error) {
                    error(err)
                }
            })
    },
}