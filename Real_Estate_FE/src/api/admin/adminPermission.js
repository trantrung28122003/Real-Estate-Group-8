import axios from './index'
const root_uri = '/permission'
export default {
    list(completion, error) {
        axios
            .get(`${root_uri}`)
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