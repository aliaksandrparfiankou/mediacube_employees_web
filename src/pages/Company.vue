<template>
    <div class="page">
        <div class="page__body" v-if="company">
            <v-data-table
                    :headers="headers"
                    :items="items"
                    class="elevation-1"
                    :hide-actions="true"
            >
                <template slot="items" slot-scope="props">
                    <td>{{ props.item.first_name }} {{ props.item.middle_name }} {{ props.item.last_name }}</td>
                    <td :key="department.id" v-for="department in company.departments">
                        <div class="icon--done" v-if="props.item.department_ids.includes(department.id)">V</div>
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
            return store.dispatch('fetchCompany', route.params.pageNumber)
        },
        data() {
            return {
                pagination: {
                    page: this.$store.state.pageNumber || 1,
                    rowsPerPage: 15,
                }
            }
        },
        computed: {
            company() {
                return this.$store.state.company
            },
            headers() {
                if (!this.company) {
                    return []
                }

                return [{
                    sortable: false,
                    align: 'left',
                    width: '400px',
                }].concat(this.company.departments.map(department => {
                    return {
                        sortable: false,
                        text: department.name,
                        value: department.id,
                    }
                }))
            },
            items() {
                if (!this.company) {
                    return []
                }

                return this.company.employees
            },
            pages () {
                if (this.pagination.rowsPerPage == null ||
                  this.company.employees_count == null
                ) return 0

                return Math.ceil(this.company.employees_count / this.pagination.rowsPerPage)
            }
        },
        methods: {
            updatePage() {
                this.$router.push({
                    name: 'company',
                    params: {
                        pageNumber: this.pagination.page,
                    }
                })
            },
            hasDepartment(id, departmentsIds) {
                console.log(id, departmentsIds)
                return this.headers.findIndex(header => {
                    return header.value === id
                }) !== -1
            }
        }
    }
</script>

<style>
    .icon--done {
        text-align: center;
    }
</style>
