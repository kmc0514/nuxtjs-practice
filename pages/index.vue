<template>
    <div>
        <post-card></post-card>
        <post-card></post-card>
        <post-card></post-card>
        <post-card></post-card>
        <post-card></post-card>
    </div>
</template>

<script>
import PostCard from '../components/PostCard.vue'
export default {
  components: { PostCard },
    head() {
        return {
            title: '메인'
        }
    }
}
</script>

<style>

</style>