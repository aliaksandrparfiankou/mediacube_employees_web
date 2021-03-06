<template>
    <div class="page">
        <div class="page__body">
            <v-container grid-list-xl>
                <v-form ref="form">
                    <v-text-field
                            :autofocus="true"
                            :validate-on-blur="true"
                            :aria-required="true"
                            v-model="first_name"
                            :counter="maxFirstName"
                            :rules="firstNameRules"
                            required
                            label="First name"
                            data-vv-name="first_name"
                            :error-messages="errors.collect('first_name')"
                            v-validate="'required|max:32'"
                    ></v-text-field>
                    <v-text-field
                            :aria-required="true"
                            v-model="last_name"
                            :counter="maxLastName"
                            :rules="lastNameRules"
                            required
                            label="Last name"
                            v-validate="'required|max:64'"
                            data-vv-name="last_name"
                            :error-messages="errors.collect('last_name')"
                    ></v-text-field>
                    <v-text-field
                            :validate-on-blur="true"
                            :aria-required="false"
                            v-model="middle_name"
                            :counter="maxFirstName"
                            :rules="middleNameRules"
                            label="Middle name"
                            data-vv-name="middle_name"
                            :error-messages="errors.collect('middle_name')"
                            v-validate="'max:32'"
                    ></v-text-field>
                    <v-text-field
                            :aria-required="false"
                            v-model="salary"
                            :counter="maxSalaryCount"
                            :rules="salaryRules"
                            label="Salary"
                            data-vv-name="salary"
                            :error-messages="errors.collect('salary')"
                            v-validate="'max:6'"
                    ></v-text-field>
                    <v-select
                        :items="genderItems"
                        label="Gender"
                        v-model="gender"
                        data-vv-name="gender"
                    ></v-select>
                    <v-select
                            v-model="departmentIds"
                            :items="departmentItems"
                            :rules="departmentIdsRules"
                            attach
                            chips
                            data-vv-name="department_ids"
                            label="Departments"
                            :error-messages="errors.collect('department_ids')"
                            multiple
                            required
                            v-validate="'required'"
                    ></v-select>
                    <v-btn @click="submit" flat color="green">
                        <v-icon>edit</v-icon>
                        <span>Edit</span>
                    </v-btn>
                </v-form>
            </v-container>
        </div>
    </div>
</template>

<script>
    import { editEmployee } from '../api'
    import Vue from 'vue';
    import VeeValidate from 'vee-validate';

    Vue.use(VeeValidate);

    export default {
        $_veeValidate: {
            validator: 'new'
        },
        asyncData({ store, route }) {
            // todo: remove two requests and update API to return all required data in one request
            return Promise.all([
                store.dispatch('fetchEmployee', route.params.id),
                store.dispatch('fetchAllDepartments', route.params.id),
            ])
        },
        data() {
            return {
                first_name: this.$store.state.employee.first_name,
                last_name: this.$store.state.employee.last_name,
                middle_name: this.$store.state.employee.middle_name,
                salary: this.$store.state.employee.salary,
                maxSalaryCount: 6,
                firstNameRules: [
                    v => !!v || 'Name is required',
                    v => (v && v.length <= 32) || 'Name must be less than 32 characters'
                ],
                lastNameRules: [
                    v => !!v || 'Name is required',
                    v => (v && v.length <= 32) || 'Name must be less than 32 characters'
                ],
                middleNameRules: [
                    v => (v && v.length > 32 && 'Name must be less than 32 characters') || true
                ],
                salaryRules: [
                    v => (v && v.length > 6 && 'Name must be less than 6 characters') || true
                ],
                departmentIdsRules: [
                  v => !!v || 'Departments field is required.',
                ],
                maxFirstName: 32,
                maxLastName: 64,
                maxMiddleName: 32,
                gender: this.$store.state.employee.gender,
                genderItems: [{
                    text: 'None',
                    value: null,
                }, {
                    text: 'Male',
                    value: 1,
                }, {
                    text: 'Female',
                    value: 2,
                }, {
                    text: 'Sexless',
                    value: 3,
                }],
                departmentIds: this.$store.state.employee.departments.map(department => {
                    return department.id
                }),
            }
        },
        computed: {
            employee() {
                return this.$store.state.employee
            },
            departmentItems() {
                if (!this.$store.state.allDepartments) {
                    return []
                }

                return this.$store.state.allDepartments.departments.map(department => {
                    return {
                        text: department.name,
                        value: department.id,
                    }
                })
            }
        },
        methods: {
            submit () {
                this.$validator.validateAll()
                // todo: do not sublit while had errors
                const params = {
                    id: this.employee.id,
                    first_name: this.first_name,
                    last_name: this.last_name,
                    department_ids: this.departmentIds,
                }
                if (this.middle_name) {
                    params.middle_name = this.middle_name
                }
                if (this.gender) {
                    params.gender = this.gender
                }
                if (this.salary) {
                    params.salary = this.salary
                }
                editEmployee(params).then(() => {
                    this.$notify({
                        type: 'success',
                        title: 'Done',
                        text: 'Employee had been successfully added.'
                    })
                    this.$router.push({
                        name: 'employees'
                    })
                }).catch(error => {
                    if (error.response.status === 422) {
                        this.$notify({
                            type: 'error',
                            title: 'Error',
                            text: 'Validation error.\n' + JSON.stringify(error.response.data)
                        })
                    } else {
                        this.$notify({
                            type: 'error',
                            title: 'Error',
                            text: 'Something went wrong.'
                        })
                    }
                })
            },
        }
    }
</script>
