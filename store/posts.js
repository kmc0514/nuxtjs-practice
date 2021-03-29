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
            v.id === payload;
        });
        state.mainPosts.splice(index, 1);
    },
    addComment(state, payload) {
        console.log(payload);
        const index = state.mainPosts.findIndex( v => {
            console.log(typeof v.id, typeof payload.PostId);
            return v.id === payload.PostId;
        });
        console.log(index);
        state.mainPosts[index].Comments.unshift(payload);
    },
    loadComments(state, payload) {
        console.log(payload);
        const index = state.mainPosts.findIndex( v => {
            v.id === payload.postId;
        });
        state.mainPosts[index].Comments = payload;
    },
    loadPosts(state, payload) {
        state.mainPosts = state.mainPosts.concat(payload);
        state.hasMorePost = payload.length === limit;
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
    async remove({ commit }, payload) {
        try {
            this.$axios.delete(`http://localhost:3085/post/${payload.postId}`,{
                withCredentials: true
            });
            commit('removeMainPost', payload.postId);
        } catch (error) {
            console.error(error);
        }
    },
    async addComment({ commit }, payload) {
        try {
            const comment = await this.$axios.post(`http://localhost:3085/post/${payload.postId}/comment`,
            {
                content: payload.content
            },
            {
                withCredentials: true
            });
            commit('addComment', comment.data);
        } catch (err) {
            console.error(err);
        }
    },
    async loadComments({commit}, payload) {
        try {
            const comment = await this.$axios.get(`http://localhost:3085/post/${payload.postId}/comments`);
            commit('loadComments', comment);
        } catch (error) {
            console.error(error);
        }
    },
    async loadPosts({ commit, state }, payload) {
        if (state.hasMorePost) {
            try {                
                const posts = await this.$axios.get(`http://localhost:3085/posts?offset=${state.mainPosts.length}&limit=10`)
                commit('loadPosts', posts.data);
            } catch (error) {
                console.error(error);
            }
        }
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