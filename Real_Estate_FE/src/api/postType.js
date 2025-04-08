import axios from 'axios';
export default {
    getType(completion, error) {
        axios
            .get("/getPostType")
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