import axios from './index'
const root_uri = '/subadmin'
export default {
    createAccount(data, completion, error) {
        axios
            .post(`${root_uri}/create-account`, data)
            .then((response) => {
                completion(response.data)
            })
            .catch((err) => {
                if (error) {
                    error(err)
                }
            })
    },

    list(page, query, completion, error) {
        axios
            .get(`${root_uri}/list/?page=${page}`, {
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

    blockAccount(id, completion, error) {
        axios
            .put(`${root_uri}/block/${id}`)
            .then((response) => {
                completion(response.data)
            })
            .catch((err) => {
                if (error) {
                    error(err)
                }
            })
    },
    updateRole(id, data, completion, error) {
        axios
            .put(`${root_uri}/update-role/${id}`, data)
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