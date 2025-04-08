import axios from './index';
const root_uri = '/project'
export default {
    listProject(page, query, completion, error) {
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
    },

    listFavorite(completion, error) {
        axios
            .get(`${root_uri}/list-favorite`)
            .then((response) => {
                completion(response.data)
            })
            .catch((err) => {
                if (error) {
                    error(err)
                }
            })
    },

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

    listOwnerProject(page, query, completion, error) {
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

    listProjectOptions(query, completion, error) {
        axios
            .get(`${root_uri}/list-project-options`, {
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
}