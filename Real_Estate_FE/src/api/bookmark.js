import axios from './index';
const root_uri = '/bookmark'
export default {
    bookmark(data, completion, error) {
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
    }
}