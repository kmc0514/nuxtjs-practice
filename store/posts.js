export const state = () => ({
    mainPosts: [],
    hasMorePost: true,
    imagePaths: []
});

export const getters = {

};

const limit = 10;
const totalPosts = 55;

export const mutations = {
    addMainPost(state, payload) {
        state.mainPosts.unshift(payload);
        state.imagePaths = [];
    },
    removeMainPost(state, payload) {
        const index = state.mainPosts.findIndex( v => {
            v.id === payload.id;
        });
        state.mainPosts.splice(index, 1);
    },
    addComment(state, payload) {
        const index = state.mainPosts.findIndex( v => {
            v.id === payload.postId;
        });
        state.mainPosts[index].Comments.unshift(payload);
    },
    loadPosts(state) {
        const diff = totalPosts - state.mainPosts.length; // 아직 안 불러온 게시글 수
        const fakePosts = Array(diff > limit ? limit : diff).fill().map(v => ({
            id: Math.random().toString(),
            User: {
                id: 1,
                nickname: '김명철'
            },
            content: 'asdlfjn sldfk sf woipmpdf owpfl ',
            Comments: [],
            Images: []
        }));
        state.mainPosts = state.mainPosts.concat(fakePosts);
        state.hasMorePost = fakePosts.length === limit;
    },
    concatImagePaths(state, payload) {
        state.imagePaths = state.imagePaths.concat(payload);
    },
    removeImagePaths(state, payload) {
        state.imagePaths.splice(payload, 1);
    }
};

export const actions = {
    async add({ commit, state }, payload) {
        try {
            const res = await this.$axios.post('http://localhost:3085/post', {
                content: payload.content,
                imagePaths: state.imagePaths    
            },{
                withCredentials: true
            });
            commit('addMainPost', res.data);
        } catch (err) {
            console.log(err);
        }
    },
    remove({ commit }, payload) {
        commit('removeMainPost', payload);
    },
    addComment({ commit }, payload) {
        commit('addComment', payload);
    },
    loadPosts({ commit, state }, payload) {
        commit('loadPosts')
    },
    async uploadImages({ commit }, payload) {
        try {
            const imgPath = await this.$axios.post('http://localhost:3085/post/images', payload, {
                withCredentials: true
            });
            commit('concatImagePaths', imgPath.data);
        } catch (err) {
            console.log(err);
        }

    }
};