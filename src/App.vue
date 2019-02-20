<template>
    <v-app>
        <v-toolbar>
            <v-toolbar-title>App</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-toolbar-items>
                <v-btn flat :to="{name: 'company'}">
                    Grid
                </v-btn>
                <v-btn flat :to="{name: 'employees'}" tag="v-btn">
                    Employees
                </v-btn>
                <v-btn flat :to="{name: 'departments'}" tag="v-btn">
                    Departments
                </v-btn>
            </v-toolbar-items>
        </v-toolbar>
        <v-content>
            <div class="app__content">
                <router-view/>
            </div>
        </v-content>
    </v-app>
</template>

<script>
    export default {
        name: 'App'
    }
</script>

<style scoped>
    .app__content {
        padding: 50px;
    }
</style>

