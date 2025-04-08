import axios from './index'
const root_uri = '/user'
export default {
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
}