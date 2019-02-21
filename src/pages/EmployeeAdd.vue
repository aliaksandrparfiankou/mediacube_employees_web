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
                            :autofocus="true"
                            :validate-on-blur="true"
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
                            :autofocus="true"
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
                        <v-icon>add</v-icon>
                        <span>Create</span>
                    </v-btn>
                </v-form>
            </v-container>
        </div>
    </div>
</template>

<script>
    import { addEmployee } from '../api'
    import Vue from 'vue';
    import VeeValidate from 'vee-validate';

    Vue.use(VeeValidate);

    export default {
        $_veeValidate: {
            validator: 'new'
        },
        asyncData({ store }) {
            return store.dispatch('fetchAllDepartments')
        },
        data() {
            return {
                first_name: '',
                last_name: '',
                middle_name: '',
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
                departmentIdsRules: [
                  v => !!v || 'Departments field is required.',
                ],
                maxFirstName: 32,
                maxLastName: 64,
                maxMiddleName: 32,
                gender: null,
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
                departmentIds: [],
            }
        },
        computed: {
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
                addEmployee({
                    first_name: this.first_name,
                    last_name: this.last_name,
                    middle_name: this.middle_name,
                    gender: this.gender,
                    department_ids: this.department_ids,
                }).then(() => {
                    this.$notify({
                        type: 'success',
                        title: 'Done',
                        text: 'Department had been successfully added.'
                    })
                    this.$router.push({
                        name: 'departments'
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
