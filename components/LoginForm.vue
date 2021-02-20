<template>
    <v-container v-if="!me">
        <v-card>
            <v-form ref="form" v-model="valid" @submit.prevent="onSubmitForm">
                <v-container>
                    <v-text-field
                        label="이메일"
                        type="email"
                        :rules="emailRules"
                        required
                    ></v-text-field>
                    <v-text-field
                        label="비밀번호"
                        :rules="passwordRules"
                        type="password"
                        required
                    ></v-text-field>
                    <v-btn color="green" type="submit" :disabled="!valid">로그인</v-btn>
                    <v-btn nuxt to="/signup">회원가입</v-btn>
                </v-container>
            </v-form>
        </v-card>
    </v-container>
    <v-container v-else>
        <v-card>
            {{ me.nickname }} 로그인되었습니다
            <v-btn @click="onLogOut">로그아웃</v-btn>
        </v-card>
    </v-container>
</template>

<script>
export default {
    data() {
        return {
            valid: false,
            email: '',
            password: '',
            emailRules: [
                v => !!v || '이메일을 입력하세요.',
                v => /.+@.+/.test(v) || '유효하지 않는 이메일입니다.'
            ],
            passwordRules: [
                v => !!v || '비밀번호를 입력하세요.'
            ],
        }
    },
    computed: {
        me() {
            return this.$store.state.users.me;
        }
    },
    methods: {
        async onSubmitForm() {
            if (this.$refs.form.validate()) {
                await this.$store.dispatch('users/logIn', {
                    email: this.email,
                    nickname: "mitchell"
                });

                this.$router.push({
                    path: '/',
                });
            }
        },
        onLogOut() {
            this.$store.dispatch('users/logOut');
        }
    }
}
</script>

<style>

</style>