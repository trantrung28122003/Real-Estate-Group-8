import axios from './index'
const root_uri = '/role'
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

    listOption(completion, error) {
        axios
            .get(`${root_uri}/list-option`)
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

    create(data, completion, error) {
        axios
            .post(`${root_uri}/create`, data)
            .then((response) => {
                completion(response.data)
            })
            .catch((err) => {
                if (error) {
                    error(err)
                }
            })
    },

    update(id, data, completion, error) {
        axios
            .put(`${root_uri}/update/${id}`, data)
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