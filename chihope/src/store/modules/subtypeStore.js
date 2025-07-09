// src/store/modules/chart.js
import Papa from 'papaparse';

const state = {
    pointData: null,
    pointChartInstance: null,
    subtypeTable:null,

};

const mutations = {
    setPointChartData(state, data) {
        if (state.pointData ==null) {
            state.pointData = data;
        }
    },

    setSubtypeTable(state, data) {
        if (state.subtypeTable ==null) {
            state.subtypeTable = data;
        }
    },
};

const actions = {
    async fetchPointData({ commit }) {
        const response = await fetch('./cgzsubtype_pointplots.csv');  // 更新路径为public文件夹中的test_barplot.csv
        const csvData = await response.text();
        const parsedData = Papa.parse(csvData, { header: true });
        commit('setPointChartData', parsedData.data);
    },
    async fetchSubtypeTable({ commit }) {
        const response = await fetch('./cgzsubtype_table.csv');  // 更新路径为public文件夹中的test_barplot.csv
        const csvData = await response.text();
        const parsedData = Papa.parse(csvData, { header: true });
        let data = parsedData.data.map(item=>{
            let newItem = { ...item };
            newItem["KW test Padj"] = Number(newItem["KW test Padj"]).toExponential(2);
            newItem["Dunn's test Padj (MARD vs MOD)"] = Number(newItem["Dunn's test Padj (MARD vs MOD)"]).toExponential(2);
            newItem["Dunn's test Padj (MARD vs SIDD)"] = Number(newItem["Dunn's test Padj (MARD vs SIDD)"]).toExponential(2);
            newItem["Dunn's test Padj (MOD vs SIDD)"] = Number(newItem["Dunn's test Padj (MOD vs SIDD)"]).toExponential(2);
            newItem["Dunn's test Padj (MARD vs SIRD)"] = Number(newItem["Dunn's test Padj (MARD vs SIRD)"]).toExponential(2);
            newItem["Dunn's test Padj (MOD vs SIRD)"] = Number(newItem["Dunn's test Padj (MOD vs SIRD)"]).toExponential(2);
            newItem["Dunn's test Padj (SIDD vs SIRD)"] = Number(newItem["Dunn's test Padj (SIDD vs SIRD)"]).toExponential(2);
            return newItem
        })
        commit('setSubtypeTable', data);
    }

};

const getters = {
    getPointData(state) {
        return state.pointData;
    }
};

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters,
};
