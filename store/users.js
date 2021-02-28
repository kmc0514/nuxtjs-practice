export const state = () => ({
    me: null,
    follwerList: [],
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
        const index = state.follwerList.findIndex(v => v.id === payload.id);
        state.follwerList.splice(index, 1);
    },
    removeFollowing(state, payload) {
        const index = state.followingList.findIndex(v => v.id === payload.id);
        state.followingList.splice(index, 1);
    },
    loadMoreFollower(state, payload) {
        const diff = totalFollowers - state.follwerList.length;
        const fakeUsers = Array(diff > limit ? limit : diff).fill().map(v => ({
            id: Math.random().toString(),
            nickname: Math.floor(Math.random() * 1000)
        }));
        state.follwerList = state.follwerList.concat(fakeUsers);
        state.hasMoreFollower = fakeUsers.length === limit;
    },
    loadMoreFollowing(state, payload) {
        const diff = totalFollowings - state.followingList.length;
        const fakeUsers = Array(diff > limit ? limit : diff).fill().map(v => ({
            id: Math.random().toString(),
            nickname: Math.floor(Math.random() * 1000)
        }));
        state.followingList = state.followingList.concat(fakeUsers);
        state.hasMoreFollowing = fakeUsers.length === limit;
    },
};

export const actions = {
    signUp({ commit }, payload) {
        commit('setMe', payload);
    },
    logIn({ commit }, payload) {
        commit('setMe', payload);
    },
    logOut({ commit }, payload) {
        commit('setMe', null);
    },
    changeNickname({ commit }, payload) {
        commit('changeNickname', payload);
    },
    addFollowing({ commit }, payload) {
        commit('addFollowing', payload);
    },
    addFollower({ commit }, payload) {
        commit('addFollower', payload);
    },
    removeFollowing({ commit }, payload) {
        commit('removeFollowing', payload);
    },
    removeFollower({ commit }, payload) {
        commit('removeFollower', payload);
    },
    loadFollowers({ commit, state }, payload) {
        if(state.hasMoreFollower) {
            commit('loadMoreFollower');
        }
    },
    loadFollowings({ commit, state }, payload) {
        if (state.hasMoreFollowing) {
            commit('loadMoreFollowing');
        }
    }
};