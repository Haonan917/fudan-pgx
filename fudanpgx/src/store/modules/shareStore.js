
const state = {
    navActive:0,
};

const getters = {
    getNavActive: state => {
        return state.navActive;
    },
};

const mutations = {
    SET_NAV_ACTIVE(state, navActive) {
        state.navActive = navActive;
        console.log("nav active", state.navActive)
    },
};

const actions = {

};

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
};
