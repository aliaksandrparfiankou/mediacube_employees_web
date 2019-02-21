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
        <div class="app_notifications">
            <notifications position="top right"/>
        </div>
    </v-app>
</template>

<script>
    export default {
        name: 'App'
    }
</script>

<style lang="scss">
    .app__content {
        padding: 50px;
    }

    .app_notifications {
        position: fixed;
        z-index: 1000;
        top: 25px;
        right: 25px;
        color: white;
    }

    .vue-notification-template {
        padding: 10px;
        box-shadow: 0 1px 10px transparentize(red, 0.5);
        border-radius: 7px;
    }
</style>

