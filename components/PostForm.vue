<template>
    <v-card>
        <v-container>
            <v-form
                ref="form"
                v-model="valid"
                @submit.prevent="onSubmitForm"
            >
                <v-textarea
                    v-model="content"
                    oulined
                    auto-grow
                    clearable
                    label="어떤 신기한 일이 있었나요?"
                    :hide-details="hideDetails"
                    :success-messages="successMessage"
                    :success="success"
                    :rules="[v > !!v.trim() || '내용을 입력하세요']"
                    @input="onChangeTextarea"
                >
                </v-textarea>
                <v-btn
                    type="submit"
                    color="green"
                    absolute right
                >짹짹</v-btn>
            </v-form>
            <v-btn>이미지 업로드</v-btn>
        </v-container>
    </v-card>
</template>

<script>
import { mapState } from 'vuex';

export default {
    data() {
        return {
            hideDetail: false,
            successMessages: '',
            success: false,
            content: ''
        }
    },
    computed: {
        ...mapState(['users/me'])
    },
    methods: {
        onChangeTextarea() {
            this.hideDetail = true;
            this.success = false;
            this.successMessages = '';
        },
        onSubmitForm() {
            if (this.$refs.form.validate()) {
                this.$store.dispatch('posts/add', {
                    content: this.content,
                    User: {
                        nickname: this.me.nickname
                    },
                    Comments: [],
                    Images: [],
                    id: Date.now(),
                    createAt: Date.now()
                })
                .then(() => {
                    this.hideDetail = false;
                    this.success = true;
                    this.successMessages = "게시물 등록 성공!"
                })
                .catch(err => {
                    console.log(err);
                });
            }
        }
    }
}
</script>

<style>

</style>