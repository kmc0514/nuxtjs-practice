export const state = () => ({
    me: null,
    followerList: [],
    followingList: [],
    hasMoreFollowing: true,
    hasMoreFollower: true
});

const totalFollowers = 8;
const totalFollowings = 6;
const limit = 3;

export const getters = {
    getFollowing(state) {
        return state.followingList;
    },
    getFollower(state) {
        return state.follwerList;
    },
    getHasMoreFollowing(state) {
        return state.hasMoreFollowing;
    },
    getHasMoreFollower(state) {
        return state.hasMoreFollower;
    }
};

export const mutations = {
    setMe(state, payload) {
        state.me = payload;
    },
    changeNickname(state, payload) {
        state.me.nickname = payload.nickname;
    },
    addFollower(state, payload) {
        state.follwerList.push(payload);
    },
    addFollowing(state, payload) {
        state.followingList.push(payload);
    },
    removeFollower(state, payload) {
        let index = state.me.follwerList.findIndex(v => v.id === payload.userId);
        state.me.follwerList.splice(index, 1);
        index = state.followerList.findIndex(v => v.id === payload.userId);
        state.followerList.splice(index, 1);
    },
    removeFollowing(state, payload) {
        let index = state.me.followingList.findIndex(v => v.id === payload.userId);
        state.me.Followings.splice(index, 1);
        index = state.followingList.findIndex(v => v.id === payload.userId);
        state.followingList.splice(index, 1);
    },
    loadFollowers(state, payload) {
        if (payload.offset === 0) {
            state.followerList = payload.data;
        } else {
            state.followerList = state.followerList.concat(payload.data);
        }
        state.hasMoreFollower = payload.data.length === limit;
    },
    loadFollowings(state, payload) {
        if (payload.offset === 0) {
            state.followingList = payload.data;
        } else {
            state.followingList = state.followingList.concat(payload.data);
        }
        state.hasMoreFollowing = payload.data.length === limit;
    },
    following(state, payload) {
        state.me.Followings.push({ id: payload.userId });
    },
};

export const actions = {
    async loadUser({ commit }) {
        try {
            const res = await this.$axios.get('/user', {
                withCredentials: true
            })
            commit('setMe', res.data);
        } catch (err) {
            console.error(err);
        }
    },
    async signUp({ commit }, payload) {
        try {
            const userData = await this.$axios.post('/user', {
                email: payload.email,
                nickname: payload.nickname,
                password: payload.password
            },
            {
                withCredentials: true
            }); // REST API
        } catch (err) {
            console.log(err);
        }
    },
    async logIn({ commit }, payload) {
        try {
            console.log(payload);
            const userData = await this.$axios.post('/user/login', {
                email: payload.email,
                password: payload.password
            },
            {
                withCredentials: true
            }); // REST API

            commit('setMe', userData.data);

        } catch (err) {
            console.log(err);
        }
    },
    async logOut({ commit }) {
        try {
            await this.$axios.post('/user/logout', {}, {

                withCredentials: true
            }); // REST API
            
            commit('setMe', null);

        } catch (err) {
            console.log(err);
        }
    },
    async changeNickname({ commit }, payload) {
        try {
            const res = await this.$axios.patch('/user/nickname', {
                nickname: payload.nickname
            }, { withCredentials: true });
            commit('changeNickname', payload);
        } catch (error) {
            console.error(error);
        }
        
    },
    addFollowing({ commit }, payload) {
        commit('addFollowing', payload);
    },
    addFollower({ commit }, payload) {
        commit('addFollower', payload);
    },
    removeFollower({ commit }, payload) {
        return this.$axios.delete(`/user/${payload.userId}`/follower, {
            withCredentials: true
        })
            .then(res => {               
                commit('removeFollower', {
                    userId: payload.userId
                });
            })
            .catch(err => {
                console.error(err);
            })
    },
    loadFollowers({ commit, state }, payload) {
        if (!(payload && payload.offset === 0) || !state.hasMoreFollower) {
            return;
        }
        let offset = state.followerList.length;
        if(payload && payload.offset === 0) {
            offset = 0;
        }
        return this.$axios.get(`/user/${state.me.id}/followers?limit=3&offest=${offset}`, {
            withCredentials: true
        })
            .then((res) => {
                commit('loadFollowers', {
                    data: res.data,
                    offset
                });
            })
            .catch((err) => {
                console.error(err);
            });
    },
    loadFollowings({ commit, state }, payload) {
        if (!(payload && payload.offset === 0) || !state.hasMoreFollowing) {
            return;
        }
        let offset = state.followingList.length;
        if(payload && payload.offset === 0) {
            offset = 0;
        }
        return this.$axios.get(`/user/${state.me.id}/followings?limit=3&offest=${offset}`, {
            withCredentials: true
        })
            .then((res) => {
                commit('loadFollowings', {
                    data: res.data,
                    offset
                });
            })
            .catch((err) => {
                console.error(err);
            });
    },
    async follow({ commit, state }, payload) {
        try {
            await this.$axios.post(`/user/${payload.userId}/follow`, {}, {
                withCredentials: true
            })
            commit('following', {
                userId: payload.userId
            });
        } catch (error) {
            error(error);
        }
    },
    async Unfollow({ commit, state }, payload) {
        try {
            await this.$axios.post(`/user/${payload.userId}/follow`, {
                withCredentials: true
            });
            commit('removeFollowing', {
                userId: payload.userId
            });         
        } catch (error) {
            error(error);
        }
    }
};