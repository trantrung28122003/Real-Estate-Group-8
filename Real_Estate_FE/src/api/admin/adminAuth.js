import axios from './index'
const root_uri = '/auth'
export default {
    login(data, completion, error) {
        axios
            .post(`/login`, data)
            .then((response) => {
                completion(response.data)
            })
            .catch((err) => {
                if (error) {
                    error(err.response)
                }
            })
    },

    profile(completion, error) {
        axios
            .get(`${root_uri}/profile`)
            .then((response) => {
                completion(response.data)
            })
            .catch((err) => {
                if (error) {
                    error(err.response)
                }
            })
    },

    logout(completion, error) {
        axios
            .get(`${root_uri}/logout`)
            .then((response) => {
                completion(response)
            })
            .catch((err) => {
                if (error) {
                    error(err.response)
                }
            })
    },

    updateProfile(data, completion, error) {
        axios
            .put(`${root_uri}/update-profile`, data)
            .then((response) => {
                completion(response)
            })
            .catch((err) => {
                if (error) {
                    error(err.response)
                }
            })
    },

    updatePassword(data, completion, error) {
        axios
            .put(`${root_uri}/update-password`, data)
            .then((response) => {
                completion(response)
            })
            .catch((err) => {
                if (error) {
                    error(err.response)
                }
            })
    },
}