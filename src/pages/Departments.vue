<template>
    <div class="page">
        <div class="page__header">
            <v-btn flat :to="{name: 'department_add'}" color="green">
                <v-icon>add</v-icon>
                <span>Add</span>
            </v-btn>
        </div>
        <div class="page__body" v-if="departments">
            <v-data-table
                    :headers="headers"
                    :items="items"
                    class="elevation-1"
                    :hide-actions="true"
            >
                <template slot="items" slot-scope="props">
                    <td>{{ props.item.name }}</td>
                    <td>{{ props.item.employees_count }}</td>
                    <td>
                        <template v-if="props.item.max_salary">{{ props.item.max_salary }}$</template>
                        <template v-else>not specified</template>
                    </td>
                    <td>
                        <v-btn-toggle class="transparent">
                            <v-btn flat small color="error" @click="removeDepartment(props.item.id)">
                                <v-icon>close</v-icon>
                            </v-btn>
                            <v-btn :to="{name: 'department_edit', params: {id: props.item.id}}" flat small color="blue" @click="editDepartment(props.item.id)">
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
            return store.dispatch('fetchDepartments', route.params.pageNumber)
        },
        data() {
            return {
                pagination: {
                    page: parseInt(this.$store.state.pageNumber) || 1,
                    rowsPerPage: 15,
                },
                headers: [{
                    text: 'Name',
                    sortable: false,
                }, {
                    text: 'Employees count',
                    sortable: false,
                }, {
                    text: 'Max salary',
                    sortable: false,
                }, {
                    sortable: false,
                }]
            }
        },
        computed: {
            departments() {
                return this.$store.state.departments
            },
            pages() {
                if (this.pagination.rowsPerPage == null ||
                  this.departments.departments_count == null
                ) return 0

                return Math.ceil(this.departments.departments_count / this.pagination.rowsPerPage)
            },
            items() {
                if (!this.departments) {
                    return []
                }

                return this.departments.departments
            }
        },
        methods: {
            updatePage() {
                this.$router.push({
                    name: 'departments',
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
            removeDepartment(id) {
                const index = this.items.findIndex(employee => {
                    return employee.id === id
                })

                if (index !== -1) {
                    this.$store.dispatch('removeDepartment', {
                        id,
                        callback: () => {
                            this.items.splice(index, 1)
                            if (!this.items.length && this.pagination.page > 1) {
                                this.pagination.page--
                            }
                            this.updatePage()
                        },
                        errorCallback: (response) => {
                            if (response.status === 409) {
                                this.$notify({
                                    type: 'error',
                                    title: 'Error',
                                    text: 'Department must not contain employees to remove it.'
                                })
                            } else {
                                this.$notify({
                                    type: 'error',
                                    title: 'Error',
                                    text: 'Something went wrong.'
                                })
                            }
                        }
                    })
                }
            },
            editDepartment(id) {
                //
            }
        }
    }
</script>
