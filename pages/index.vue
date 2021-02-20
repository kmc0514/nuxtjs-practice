<template>
    <v-container>
        <post-form v-if="me"></post-form>
        <div>
            <post-card></post-card>
            <post-card></post-card>
            <post-card></post-card>
            <post-card></post-card>
            <post-card></post-card>
        </div>
    </v-container>
</template>

<script>
import PostCard from '../components/PostCard.vue'
export default {
  components: { PostCard },
    head() {
        return {
            title: '메인'
        }
    },
    computed: {
        me() {
            return this.$store.state.users.me;
        }
    }
}
</script>

<style>

</style>