<template>
    <v-app>
        <nav>
            <v-toolbar dark color="green">
                <v-toolbar-title>
                    <nuxt-link to="/">Node Bird</nuxt-link>
                </v-toolbar-title>
                <v-spacer></v-spacer>
                <v-toolbar-items>
                    <v-form @submit.prevent="onSearchHashtag">
                        <div :style="{ display: 'flex', alignItems: 'center', height: '100%' }">
                            <v-text-field
                                v-model="hashtag"
                                label="검색"
                                hide-details
                                prepend-icon="mdi-magnify"
                            ></v-text-field>
                        </div>
                    </v-form>
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
    data() {
        return {
            hashtag: ''
        };
    },
    methods: {
        onSearchHashtag() {
            this.$router.push({
                path: `/hashtag/${this.hashtag}`
            });

            this.hashtag = '';
        }
    },
}
</script>

<style>

</style>