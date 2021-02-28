<template>
    <v-card style="marin-bottom: 20px">
        <v-container>
            <v-form
                ref="form"
                @submit.prevent="onSubmitForm"
            >
                <v-textarea
                    v-model="content"
                    oulined
                    auto-grow
                    clearable
                    label="어떤 신기한 일이 있었나요?"
                    :hide-details="hideDetail"
                    :success-messages="successMessages"
                    :success="success"
                    :rules="[v => !!v.trim() || '내용을 입력하세요']"
                    @input="onChangeTextarea"
                >
                </v-textarea>
                <v-btn
                    type="submit"
                    color="green"
                    absolute right
                >짹짹</v-btn>
                <v-btn>이미지 업로드</v-btn>
            </v-form>
        </v-container>
    </v-card>
</template>

<script>
import { mapState } from 'vuex';

export default {
    name: 'post_form',
    data() {
        return {
            hideDetail: false,
            successMessages: '',
            success: false,
            content: ''
        }
    },
    computed: {
        ...mapState('users', ['me'])
    },
    methods: {
        onChangeTextarea(value) {
            if (value.length) {
                this.hideDetail = true;
                this.success = false;
                this.successMessages = '';
            }
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
                    this.content = ''
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