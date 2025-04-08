import axios from './index';
const root_uri = '/review'
export default {
    avgRating(completion, error) {
        axios
            .get(`${root_uri}/avg-rating`)
            .then((response) => {
                completion(response.data)
            })
            .catch((err) => {
                if (error) {
                    error(err)
                }
            })
    },

    createOrUpdate(data, completion, error) {
        axios
            .post(`${root_uri}/create-update`, data)
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