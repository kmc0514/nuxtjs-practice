<template>
    <div>
        <v-container>
            <v-card style="margin-bottom: 20px">
                <v-container>
                    <v-subheader>내 프로필</v-subheader>
                    <v-form v-model="valid" @submit.prevent="onChangeNickname">
                        <v-text-field 
                            label="닉네임"
                            v-model="nickname"
                            :rules="nicknameRules"
                            required
                        />
                        <v-btn color="blue" type="submit">수정</v-btn>
                    </v-form>
                </v-container>
            </v-card>
            <v-card style="margin-bottom: 20px">
                <v-container>
                    <v-subheader>팔로잉</v-subheader>
                    <follow-list :data="getFollowing" :remove="removeFollowing"></follow-list>
                    <v-btn
                        v-if="hasMoreFollowing"
                        dark color="blue"
                        style="width: 100%"
                        @click="loadMoreFollwing"
                    >
                        더보기
                    </v-btn>
                </v-container>
            </v-card>
            <v-card style="margin-bottom: 20px">
                <v-container>
                    <v-subheader>팔로워</v-subheader>
                    <follow-list :data="getFollower" :remove="removeFollower"></follow-list>
                    <v-btn
                        v-if="hasMoreFollower"
                        dark color="blue"
                        style="width: 100%"
                        @click="loadMoreFollower"
                    >
                        더보기
                    </v-btn>
                </v-container>
            </v-card>
            <v-card style="margin-bottom: 20px"></v-card>
        </v-container>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
import FollowList from '../components/FollowList.vue'

export default {
    components: { FollowList },
    head() {
        return {
            title: '프로필'
        }
    },
    data() {
        return {
            valid: false,
            nickname: '',
            nicknameRules: [
                v => !!v || '닉네임을 입력하세요.'
            ]
        }
    },
    computed: {
        ...mapGetters({
            getFollowing: 'users/getFollowing',
            getFollower: 'users/getFollower',
            hasMoreFollowing: 'users/getHasMoreFollowing',
            hasMoreFollower: 'users/getHasMoreFollower'
        })
    },
    fetch({ store }) {
        store.dispatch('users/loadFollowings');
        return store.dispatch('users/loadFollowers');
    },
    methods: {
        onChangeNickname() {
            this.$store.dispatch('users/changeNickname', {
                nickname: this.nickname
            })
        },
        removeFollowing(id) {
            this.$store.dispatch('users/removeFollowing', {
                id 
            });
        },
        removeFollower(id) {
            this.$store.dispatch('users/removeFollower', {
                id 
            });
        },
        loadMoreFollwing() {
            this.$store.dispatch('users/loadFollowings');
        },
        loadMoreFollower() {
            this.$store.dispatch('users/loadFollowers');
        }
    },
    middleware: 'authenticated'

}
</script>

<style>

</style>