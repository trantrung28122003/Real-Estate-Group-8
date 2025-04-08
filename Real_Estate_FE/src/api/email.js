import axios from './index';
export default {
    sendContactEmail(data, completion, error) {
        axios
            .post(`/send-email`, data)
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