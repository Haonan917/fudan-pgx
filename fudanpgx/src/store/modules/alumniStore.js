// store/modules/memberStore.js

import alumniRequest from "@/request/alumniRequest/alumniRequest";
import axios from "axios";


const state = {

    alumniList: []
};

const getters = {
    allAlumnis: state => state.alumniList,
};

const mutations = {
    // 可以添加对成员列表的增删改查操作的 mutations
    SET_ALUMNI_LIST(state, alumnis) {
        state.alumniList = alumnis;
        console.log("alumnis", state.alumniList)
    },
};

const actions = {
    async fetchAlumnis({ commit }) {
        try {
            const response =  await alumniRequest.getAllAlumnis();
            let alumnis = response.data;

            // 按年份排序
            alumnis.sort((a, b) => {
                const yearA = parseInt(a.year, 10) || 0;
                const yearB = parseInt(b.year, 10) || 0;
                return yearB - yearA ;
            });

            // 提交 mutation 设置 publication 列表
            commit('SET_ALUMNI_LIST', alumnis);

        } catch (error) {
            console.error('Failed to fetch alumnis:', error);
        }
    },

    async fetchAlumnisFromJson({ commit }) {

        try {
            const response = await axios.get('./Resource/alumnis_convert.json',{ timeout: 100000});
            console.log("response",response)
            const alumnis = response.data.map(alumni => {
                return alumni;
            });

            // 按年份排序
            alumnis.sort((a, b) => {
                const yearA = parseInt(a.year, 10);
                const yearB = parseInt(b.year, 10);
                return  yearB - yearA;
            });

            // 提交 mutation 设置 publication 列表
            commit('SET_ALUMNI_LIST', alumnis);

        } catch (error) {
            console.error('Failed to fetch alumnis:', error);
        }
    },
};

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
};
