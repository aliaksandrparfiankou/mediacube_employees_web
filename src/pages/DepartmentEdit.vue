<template>
    <div class="page">
        <div class="page__body">
            <v-container grid-list-xl>
                <v-form ref="form">
                    <v-text-field
                            :autofocus="true"
                            :validate-on-blur="true"
                            :aria-required="true"
                            v-model="name"
                            :counter="max"
                            :rules="nameRules"
                            required
                            label="Department name"
                    ></v-text-field>
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
    import { editDepartment } from '../api'

    export default {
        asyncData({ store, route }) {
            return store.dispatch('fetchDepartment', route.params.id)
        },
        data() {
            return {
                name: this.$store.state.department.name,
                nameRules: [
                    v => !!v || 'Name is required',
                    v => (v && v.length <= 64) || 'Name must be less than 64 characters'
                ],
                max: 64,
            }
        },
        computed: {
            department() {
                return this.$store.state.department
            }
        },
        methods: {
            submit () {
                editDepartment({
                    id: this.department.id,
                    name: this.name,
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
                            text: 'Validation error. \n' + JSON.stringify(error.response.data)
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
