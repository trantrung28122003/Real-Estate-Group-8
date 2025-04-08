const root_uri = '/auth'
import axios from './index';
export default {
    login(data, completion, error) {
        axios
            .post(`${root_uri}/login`, data)
            .then((response) => {
                completion(response.data)
            })
            .catch((err) => {
                if (error) {
                    error(err.response)
                }
            })
    },

    forgotPassword(data, completion, error) {
        axios
            .post(`${root_uri}/forget-password`, data)
            .then((response) => {
                completion(response.data)
            })
            .catch((err) => {
                if (error) {
                    error(err.response)
                }
            })
    },

    resetPassword(data, completion, error) {
        axios
            .post(`${root_uri}/reset-password`, data)
            .then((response) => {
                completion(response.data)
            })
            .catch((err) => {
                if (error) {
                    error(err.response)
                }
            })
    },

    regiter(data, completion, error) {
        axios
            .post(`${root_uri}/register`, data)
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
            .put(`${root_uri}/account/update-profile`, data)
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
            .put(`${root_uri}/account/update-password`, data)
            .then((response) => {
                completion(response)
            })
            .catch((err) => {
                if (error) {
                    error(err.response)
                }
            })
    },

    deleteAccount(data, completion, error) {
        axios
            .put(`${root_uri}/account/delete-account`, data)
            .then((response) => {
                completion(response)
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

    enterpriseRegister(data, completion, error) {
        axios
            .post(`${root_uri}/enterprise-register`, data)
            .then((response) => {
                completion(response.data)
            })
            .catch((err) => {
                if (error) {
                    error(err.response)
                }
            })
    },

    brokerRegister(data, completion, error) {
        axios
            .post(`${root_uri}/broker-register`, data)
            .then((response) => {
                completion(response.data)
            })
            .catch((err) => {
                if (error) {
                    error(err.response)
                }
            })
    },

    getDetailBrokerRegistration(completion, error) {
        axios
            .get(`${root_uri}/detail-registration`)
            .then((response) => {
                completion(response.data)
            })
            .catch((err) => {
                if (error) {
                    error(err.response)
                }
            })
    },
}
