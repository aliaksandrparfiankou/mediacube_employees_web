import axios from 'axios'

let API_URL = `${process.env.VUE_APP_API_URL}/${process.env.VUE_APP_API_VERSION}`

// todo: make dedicated files for company, employee and departments

if (!process.env.VUE_APP_API_URL) {
    // todo: remove it
    API_URL = 'https://api.jjj.by/v1_0'
}

function genApiUrl(endpoint) {
    return `${API_URL}/${endpoint}`
}

function preparePaginationRequestParams(pageNumber, count) {
    const params = {
        count: count || 15,
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

export function fetchDepartments(pageNumber, count) {
    const params = preparePaginationRequestParams(pageNumber, count)

    return axios.get(genApiUrl('departments.get'), {
        params,
    })
}

export function fetchDepartment(id) {
    return axios.get(genApiUrl('department.get'), {
        params: {
            id
        }
    })
}

export function fetchEmployee(id) {
    return axios.get(genApiUrl('employee.get'), {
        params: {
            id
        }
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

export function editDepartment(data) {
    return axios.post(genApiUrl('department.edit'), data)
}

export function addEmployee(data) {
    return axios.post(genApiUrl('employee.add'), data)
}

export function editEmployee(data) {
    return axios.post(genApiUrl('employee.edit'), data)
}


