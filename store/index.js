export const state = () => {

};

export const getters = {

};

export const mutations = {

};

export const actions = {
    nuxtServerInit({ commit, dispatch, state }, { req }) {
        return dispatch('users/loadUser');
    }
};
