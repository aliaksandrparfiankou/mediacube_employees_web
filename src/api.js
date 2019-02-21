import axios from 'axios'

let API_URL = `${process.env.VUE_APP_API_URL}/${process.env.VUE_APP_API_VERSION}`

if (!process.env.VUE_APP_API_URL) {
    API_URL = 'https://api.jjj.by/v1_0'
}

function genApiUrl(endpoint) {
    return `${API_URL}/${endpoint}`
}

function preparePaginationRequestParams(pageNumber) {
    const params = {
        count: 15,
    }

    if (pageNumber) {
        params.page_number = pageNumber
    }

    return params
}

export function fetchCompany(pageNumber) {
    const params = preparePaginationRequestParams(pageNumber)

    return axios.get(genApiUrl('company.getEmployees'), {
        params,
    })
}

export function fetchEmployees(pageNumber) {
    const params = preparePaginationRequestParams(pageNumber)

    return axios.get(genApiUrl('employees.get'), {
        params,
    })
}

export function fetchDepartments(pageNumber) {
    const params = preparePaginationRequestParams(pageNumber)

    return axios.get(genApiUrl('departments.get'), {
        params,
    })
}

export function removeEmployee(id) {
    return axios.post(genApiUrl('employee.remove'), {
        id
    })
}

export function removeDepartment(id) {
    return axios.post(genApiUrl('department.remove'), {
        id
    })
}

export function addDepartment(data) {
    return axios.post(genApiUrl('department.add'), data)
}


