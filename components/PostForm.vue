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
                <input ref="imageInput" type="file" multiple hidden @change="onChangeImages">
                <v-btn @click="onClickImageUpload" type="button">이미지 업로드</v-btn>
                <div>
                    <div v-for="(p, idx) in imagePaths" :key="idx" style="display: inline-block">
                        <img :src="`http://localhost:3085/${p}`" alt="p" style="width: 200px">
                        <div>
                            <button @click="onRemoveImage(idx)" type="button">제거</button>
                        </div>
                    </div>
                </div>
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
        ...mapState('users', ['me']),
        ...mapState('posts', ['imagePaths'])
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
        },
        onClickImageUpload() {
            this.$refs.imageInput.click();
        },
        onChangeImages(e) {
            const imageFormData = new FormData();
            [].forEach.call(e.target.files, (f) => {
                imageFormData.append('image', f);
            });
            this.$store.dispatch('posts/uploadImages', imageFormData);
        },
        onRemoveImage(index) {
            this.$store.commit('posts/removeImagePaths', index);
        }
    }
}
</script>

<style>

</style>