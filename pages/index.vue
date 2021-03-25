<template>
    <v-container>
        <post-form v-if="me"></post-form>
        <div>
            <!-- Vertualized List에 대해서 알아보기 (강의에서 안 알려줌) -->
            <post-card
                v-for="p in mainPosts"
                :key="p.id"
                :post="p"
            ></post-card>
        </div>
    </v-container>
</template>

<script>
import PostForm from '../components/PostForm.vue'
import PostCard from '../components/PostCard.vue'

export default {
    components: { PostCard, PostForm },
    head() {
        return {
            title: '메인'
        }
    },
    computed: {
        me() {
            return this.$store.state.users.me;
        },
        mainPosts() {
            return this.$store.state.posts.mainPosts;
        },
        hasMorePost() {
            return this.$store.state.posts.hasMorePost;
        }
    },
    fetch({ store }) {
        store.dispatch('posts/loadPosts');
    },
    updated() {
        console.log(this.mainPosts);
    },
    mounted() {
        window.addEventListener('scroll', this.onScroll);
        console.log(this.mainPosts);
    },
    beforeDestroy() {
        window.removeEventListener('scroll', this.onScroll);
    },
    methods: {
        onScroll() {
            if (window.scrollY + document.documentElement.clientHeight > document.documentElement.scrollHeight - 300) {
                if (this.hasMorePost) {
                    this.$store.dispatch('posts/loadPosts');
                }
            }
        }
    }
}
</script>

<style>

</style>