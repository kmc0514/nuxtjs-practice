<template>
    <div>
        <v-container>
            <v-card>
                <v-container>
                    <v-subheader>회원가입</v-subheader>
                    <v-form ref="form" v-model="valid" @submit.prevent="onSubmitForm">
                        <v-text-field
                            v-model="email"
                            label="이메일"
                            type="email"
                            :rules="emailRules"
                            required
                        />
                        <v-text-field
                            v-model="password"
                            label="비밀번호"
                            type="password"
                            :rules="passwordRules"
                            required
                        />
                        <v-text-field
                            v-model="passwordCheck"
                            label="비밀번호 확인"
                            type="password"
                            :rules="passwordCheckRules"
                            required
                        />
                        <v-text-field
                            v-model="nickname"
                            label="닉네임"
                            type="nickname"
                            :rules="nicknameRules"
                            required
                        />
                        <v-checkbox
                            v-model="terms"
                            required
                            label="가입에 동의하십니까?"
                            :rules="[v => !!v || '가입 동의해주세요.']"
                        />
                        <v-btn color="green" type="sumbit">가입하기</v-btn>
                    </v-form>
                </v-container>
            </v-card>
        </v-container>
    </div>
</template>

<script>
export default {
    data() {
        return {
            valid: false,
            email: '',
            password: '',
            passwordCheck: '',
            nickname: '',
            terms: false,
            emailRules: [
                v => !!v || '이메일을 입력하세요.',
                v => /.+@.+/.test(v) || '유효하지 않는 이메일입니다.'
            ],
            nicknameRules: [
                v => !!v || '닉네임을 입력하세요.'
            ],
            passwordRules: [
                v => !!v || '비밀번호를 입력하세요.'
            ],
            passwordCheckRules: [
                v => !!v || '비밀번호 확인을 입력하세요.',
                v => v === this.password || '비밀번호가 일치하지 않습니다.'
            ]
        }
    },
    watch: {
        me(val) {
            if(val) {
                this.$router.push({
                    path: '/'
                });
            }
        }  
    },
    computed: {
      me() {
          return this.$store.state.users.me;
      }  
    },
    methods: {
        onSubmitForm() {
            console.log("not ok");
            if (this.$refs.form.validate()) {
                console.log("ok");

                this.$store.dispatch('users/signUp', {
                    nickname: this.nickname,
                    email: this.email
                })
            }
        }
    },
    head() {
        return {
            title: '회원가입'
        }
    },
    middleware: 'anonymous'
}
</script>

<style>

</style>