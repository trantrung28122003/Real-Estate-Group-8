import axios from './index';
const root_uri = '/post'
export default {
    create(data, completion, error) {
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

    update(id, data, completion, error) {
        axios
            .put(`${root_uri}/update/${id}`, data)
            .then((response) => {
                completion(response.data)
            })
            .catch((err) => {
                if (error) {
                    error(err.response)
                }
            })
    },

    detail(id,completion, error) {
        axios
            .get(`${root_uri}/detail/${id}`)
            .then((response) => {
                completion(response.data)
            })
            .catch((err) => {
                if (error) {
                    error(err)
                }
            })
    },
    
    ownerPost(page, query, completion, error) {
        axios
            .get(`${root_uri}/list-owner/?page=${page}`, {
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

    listByUser(page, query, completion, error) {
        axios
            .get(`${root_uri}/user/list/?page=${page}`, {
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

    history(page, query, completion, error) {
        axios
            .get(`${root_uri}/history/?page=${page}`, {
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
    createHistory(data, completion, error) {
        axios
            .post(`${root_uri}/history/create`, data)
            .then((response) => {
                completion(response.data)
            })
            .catch((err) => {
                if (error) {
                    error(err)
                }
            })
    },
    location(completion, error) {
        axios
            .get(`${root_uri}/location`)
            .then((response) => {
                completion(response.data)
            })
            .catch((err) => {
                if (error) {
                    error(err)
                }
            })
    },
    listSuggestPost(page, query, completion, error) {
        axios
            .get(`${root_uri}/suggested-post/?page=${page}`, {
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
    listRentSell(page, query, completion, error) {
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
    delete(id, completion, error) {
        axios
            .delete(`${root_uri}/delete/${id}`)
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