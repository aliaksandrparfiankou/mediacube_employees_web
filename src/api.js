import axios from 'axios'

const API_URL = `${process.env.VUE_APP_API_URL}/${process.env.VUE_APP_API_VERSION}`

function genApiUrl(endpoint) {
    return `${API_URL}/${endpoint}`
}

export function fetchCompany(pageNumber) {
    const params = {
        count: 15,
    }

    if (pageNumber) {
        params.page_number = pageNumber
    }

    return axios.get(genApiUrl('company.getEmployees'), {
        params,
    })
}

