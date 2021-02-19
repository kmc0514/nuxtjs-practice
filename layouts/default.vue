<template>
    <v-app>
        <nav>
            <v-toolbar dark color="green">
                <v-toolbar-title>
                    <nuxt-link to="/">Node Bird</nuxt-link>
                </v-toolbar-title>
                <v-spacer></v-spacer>
                <v-toolbar-items>
                    <v-text-field label="검색" hide-details="" prepend-icon="mdi-magnify" :style="{ display: 'flex', alignItems: 'center' }"></v-text-field>
                    <v-btn text nuxt to="/profile">
                        <div>프로필</div>
                    </v-btn>
                    <v-btn text nuxt to="/signup">
                        <div>회원가입</div>
                    </v-btn>
                </v-toolbar-items>
            </v-toolbar>
        </nav>
        <v-row>
            <v-col cols="12" md="4">
                <login-form></login-form>
            </v-col>
            <v-col cols="12" md="8">
                <nuxt></nuxt>
            </v-col>
        </v-row>
    </v-app>
</template>

<script>
import LoginForm from '../components/LoginForm.vue'
export default {
  components: { LoginForm },

}
</script>

<style>

</style>