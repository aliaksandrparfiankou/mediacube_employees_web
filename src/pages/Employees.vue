<template>
    <div class="page">
        <div class="page__body" v-if="employees">
            <v-data-table
                    :headers="headers"
                    :items="items"
                    class="elevation-1"
                    :hide-actions="true"
            >
                <template slot="items" slot-scope="props">
                    <td>{{ props.item.first_name }} {{ props.item.middle_name }} {{ props.item.last_name }}</td>
                    <td>
                        <template v-if="props.item.gender === 1">male</template>
                        <template v-else-if="props.item.gender === 2">female</template>
                        <template v-else-if="props.item.gender === 3">transgender</template>
                        <template v-else>not specified</template>
                    </td>
                    <td>
                        <template v-if="props.item.salary">{{ props.item.salary }}$</template>
                        <template v-else>not specified</template>
                    </td>
                    <td>
                        <span>{{ computeDepartmentNames(props.item.departments) }}</span>
                    </td>
                    <td>
                        <v-btn-toggle class="transparent">
                            <v-btn flat small color="error" @click="removeEmployee(props.item.id)">
                                <v-icon>close</v-icon>
                            </v-btn>
                            <v-btn flat small color="blue" @click="editImployee(props.item.id)">
                                <v-icon>edit</v-icon>
                            </v-btn>
                        </v-btn-toggle>
                    </td>
                </template>
            </v-data-table>
            <div class="text-xs-center pt-2">
                <v-pagination @input="updatePage" v-model="pagination.page" :length="pages"></v-pagination>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        asyncData({ store, route }) {
            return store.dispatch('fetchEmployees', route.params.pageNumber)
        },
        data() {
            return {
                pagination: {
                    page: parseInt(this.$store.state.pageNumber) || 1,
                    rowsPerPage: 15,
                },
                headers: [{
                    text: 'Full name',
                    sortable: false,
                }, {
                    text: 'Gender',
                    sortable: false,
                }, {
                    text: 'Salary',
                    sortable: false,
                }, {
                    text: 'Departments',
                    sortable: false,
                }, {
                    sortable: false,
                }]
            }
        },
        computed: {
            employees() {
                return this.$store.state.employees
            },
            pages() {
                if (this.pagination.rowsPerPage == null ||
                  this.employees.employees_count == null
                ) return 0

                return Math.ceil(this.employees.employees_count / this.pagination.rowsPerPage)
            },
            items() {
                if (!this.employees) {
                    return []
                }

                return this.employees.employees
            }
        },
        methods: {
            updatePage() {
                this.$router.push({
                    name: 'employees',
                    params: {
                        pageNumber: this.pagination.page,
                    }
                })
            },
            computeDepartmentNames(departments) {
                return departments.map(department => {
                    return department.name
                }).join(', ')
            },
            removeEmployee(id) {
                const index = this.items.findIndex(employee => {
                    return employee.id === id
                })

                if (index !== -1) {
                    this.$store.dispatch('removeEmployee', {
                        id,
                        callback: () => {
                            this.updatePage()
                            this.items.splice(index, 1)
                            if (!this.items.length && this.pagination.page > 1) {
                                this.pagination.page--
                            }
                        },
                        errorCallback: () => {
                            this.$notify({
                                type: 'error',
                                title: 'Error',
                                text: 'Something went wrong.'
                            })
                        }
                    })
                }
            },
            editImployee(id) {
                //
            }
        }
    }
</script>
