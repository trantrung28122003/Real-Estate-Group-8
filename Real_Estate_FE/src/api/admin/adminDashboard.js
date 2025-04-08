import axios from './index'
const root_uri = '/dashboard'
export default {
    overview(completion, error) {
        axios
            .get(`${root_uri}/overview`)
            .then((response) => {
                completion(response.data)
            })
            .catch((err) => {
                if (error) {
                    error(err)
                }
            })
    },

    
    listReview(page, completion, error) {
        axios
            .get(`${root_uri}/list-review/?page=${page}`)
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