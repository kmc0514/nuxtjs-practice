<template>
    <div v-if="images.length === 0"></div>
    <div v-else-if="images.length === 1">
        <v-img
            :src="`http://localhost:3085/${images[0].src}`"
            contain
            aspect-ratio="2"
            @click="zoomImages"
        ></v-img>
        <image-zoom v-if="imageZoomed" :close-modal="closeModal" :images="images"/>
    </div>
    <div v-else-if="images.length === 2" style="display: flex">
        <v-img
            :src="`http://localhost:3085/${images[0].src}`"
            contain
            aspect-ratio="2"
            style="flex: 1"
            @click="zoomImages"
        ></v-img>
        <v-img
            :src="`http://localhost:3085/${images[1].src}`"
            contain
            aspect-ratio="2"
            style="flex: 1"
            @click="zoomImages"
        ></v-img>
        <image-zoom v-if="imageZoomed" :close-modal="closeModal" :images="images"/>
    </div>
    <div v-else-if="images.length > 2">
        <v-img
            :src="`http://localhost:3085/${images[0].src}`"
            contain
            aspect-ratio="2"
            style="flex: 1"
            @click="zoomImages"
        ></v-img>
        <div 
            style="flex: 1; align-items: center; justify-content: center; display: flex"
            @click="zoomImages"    
        >
            <v-icon>mdi-dots-horizontal</v-icon>
        </div>
        <image-zoom v-if="imageZoomed" :close-modal="closeModal" :images="images"/>
    </div>
</template>

<script>
import ImageZoom from './imageZoom.vue'
export default {
    components: { ImageZoom },
    props: {
        images: {
            type: Array,
            required: true
        }
    },
    data() {
        return {
            imageZoomed: false,
        };
    },
    methods: {
        closeModal() {
            this.imageZoomed = false;
        },
        zoomImages() {
            this.imageZoomed = true;
        }
    }
}
</script>

<style>

</style>