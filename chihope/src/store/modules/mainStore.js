// src/store/modules/chart.js
import Papa from 'papaparse';

const state = {
    barData: null,
    barChartInstance: null,
    lineData: null,
    lineChartInstance:null,
    graphNode:null,
    graphEdge:null,

    clnTable:null,
    mtbTable:null,
    prtTable:null,
    mirTable:null,

    clnMapping: null,
    mtbMapping: null,
    prtMapping: null,
    mirMapping: null,

};

const mutations = {
    setBarChartData(state, data) {
        if (state.barData ==null) {
            state.barData = data;
        }
    },

    setLineChartData(state, data) {
        if (state.lineData ==null) {
            state.lineData = data;
        }
    },

    setGraphChartNode(state, data) {
        if (state.graphNode ==null) {
            state.graphNode = data;
        }
    },

    setGraphChartEdge(state, data) {
        if (state.graphEdge ==null) {
            state.graphEdge = data;
        }
    },

    setCLNTable(state, data) {
        if (state.clnTable ==null) {
            state.clnTable = data;
        }
    },

    setMTBTable(state, data) {
        if (state.mtbTable ==null) {
            state.mtbTable = data;
        }
    },

    setPRTTable(state, data) {
        if (state.prtTable ==null) {
            state.prtTable = data;
        }
    },

    setMIRTable(state, data) {
        if (state.mirTable ==null) {
            state.mirTable = data;
        }
    },

    setCLNMapping(state, data) {
        if (state.clnMapping ==null) {
            state.clnMapping = data;
        }
    },
    setMTBMapping(state, data) {
        if (state.mtbMapping ==null) {
            state.mtbMapping = data;
        }
    },
    setMIRMapping(state, data) {
        if (state.mirMapping ==null) {
            state.mirMapping = data;
        }
    },

    setPRTMapping(state, data) {
        if (state.prtMapping ==null) {
            state.prtMapping = data;
        }
    },
};

const actions = {
    async fetchBarData({ commit }) {
        const response = await fetch('./cgzmain_barplots.csv');  // 更新路径为public文件夹中的test_barplot.csv
        const csvData = await response.text();
        const parsedData = Papa.parse(csvData, { header: true });
        commit('setBarChartData', parsedData.data);
    },

    async fetchLineData({ commit }) {
        const response = await fetch('./cgzmain_lineplots.csv');  // 更新路径为public文件夹中的test_barplot.csv
        const csvData = await response.text();
        const parsedData = Papa.parse(csvData, { header: true });
        commit('setLineChartData', parsedData.data);
    },

    async fetchGraphData({ commit }) {
        const response1 = await fetch('./cgzmain_graphplots_node.csv');  // 更新路径为public文件夹中的test_barplot.csv
        const csvData1 = await response1.text();
        const parsedData1 = Papa.parse(csvData1, { header: true });
        commit('setGraphChartNode', parsedData1.data);

        const response2 = await fetch('./cgzmain_graphplots_edge.csv');  // 更新路径为public文件夹中的test_barplot.csv
        const csvData2 = await response2.text();
        const parsedData2 = Papa.parse(csvData2, { header: true });
        let data = parsedData2.data.map(item=>{
            let newItem = { ...item };
            newItem["fdr"] = Number(newItem["fdr"]).toExponential(2);
            newItem["r"] = Number(newItem["r"]).toFixed(3);
            // newItem["Week12 vs Week0 Dunn's Test P value"] = Number(newItem["Week12 vs Week0 Dunn's Test P value"]).toExponential(2);
            // newItem["KW Test P value"] = Number(newItem["KW Test P value"]).toExponential(2);
            return newItem
        })
        commit('setGraphChartEdge', data);


    },


    async fetchTableData({ commit }) {
        const response1 = await fetch('./cgzmain_table_cln.csv');  // 更新路径为public文件夹中的test_barplot.csv
        const csvData1= await response1.text();
        const parsedData1 = Papa.parse(csvData1, { header: true });
        let data1 = parsedData1.data.map(item=>{
            let newItem = { ...item };
            newItem["Week24.vs.Week0.Dunn.s.Test.P.value"] = Number(newItem["Week24.vs.Week0.Dunn.s.Test.P.value"]).toExponential(2);
            newItem["Week12.vs.Week0.Dunn.s.Test.P.value"] = Number(newItem["Week12.vs.Week0.Dunn.s.Test.P.value"]).toExponential(2);
            newItem["KW.Test.P.value"] = Number(newItem["KW.Test.P.value"]).toExponential(2);
            return newItem
        })
        commit('setCLNTable', data1);

        const response2 = await fetch('./cgzmain_table_mtb.csv');  // 更新路径为public文件夹中的test_barplot.csv
        const csvData2 = await response2.text();
        const parsedData2 = Papa.parse(csvData2, { header: true });
        let data2 = parsedData2.data.map(item=>{
            let newItem = { ...item };
            newItem["Week24 vs Week0 Dunn's Test P value"] = Number(newItem["Week24 vs Week0 Dunn's Test P value"]).toExponential(2);
            newItem["Week12 vs Week0 Dunn's Test P value"] = Number(newItem["Week12 vs Week0 Dunn's Test P value"]).toExponential(2);
            newItem["KW Test P value"] = Number(newItem["KW Test P value"]).toExponential(2);
            return newItem
        })
        commit('setMTBTable', data2);

        const response3 = await fetch('./cgzmain_table_mir.csv');  // 更新路径为public文件夹中的test_barplot.csv
        const csvData3 = await response3.text();
        const parsedData3 = Papa.parse(csvData3, { header: true });
        let data3 = parsedData3.data.map(item=>{
            let newItem = { ...item };
            newItem["Week24 vs Week0 Dunn's Test P value"] = Number(newItem["Week24 vs Week0 Dunn's Test P value"]).toExponential(2);
            newItem["Week12 vs Week0 Dunn's Test P value"] = Number(newItem["Week12 vs Week0 Dunn's Test P value"]).toExponential(2);
            newItem["KW Test P value"] = Number(newItem["KW Test P value"]).toExponential(2);
            return newItem
        })
        commit('setMIRTable', data3);

        const response4 = await fetch('./cgzmain_table_prt.csv');  // 更新路径为public文件夹中的test_barplot.csv
        const csvData4 = await response4.text();
        const parsedData4 = Papa.parse(csvData4, { header: true });
        let data4 = parsedData4.data.map(item=>{
            let newItem = { ...item };
            newItem["KW Test P value"] = Number(newItem["KW Test P value"]).toExponential(2);
            return newItem
        })
        commit('setPRTTable', data4);
    },

    async fetchMappingData({ commit }) {
        const response1 = await fetch('./cgzmain_mapping_cln.csv');  // 更新路径为public文件夹中的test_barplot.csv
        const csvData1 = await response1.text();
        const parsedData1 = Papa.parse(csvData1, { header: true });
        commit('setCLNMapping', parsedData1.data);

        const response2 = await fetch('./cgzmain_mapping_mtb.csv');  // 更新路径为public文件夹中的test_barplot.csv
        const csvData2 = await response2.text();
        const parsedData2 = Papa.parse(csvData2, { header: true });
        commit('setMTBMapping', parsedData2.data);

        const response3 = await fetch('./cgzmain_mapping_prt.csv');  // 更新路径为public文件夹中的test_barplot.csv
        const csvData3 = await response3.text();
        const parsedData3 = Papa.parse(csvData3, { header: true });
        commit('setPRTMapping', parsedData3.data);

        const response4 = await fetch('./cgzmain_mapping_mir.csv');  // 更新路径为public文件夹中的test_barplot.csv
        const csvData4 = await response4.text();
        const parsedData4 = Papa.parse(csvData4, { header: true });
        commit('setMIRMapping', parsedData4.data);
    },
};

const getters = {
    getBarData(state) {
        return state.barData;
    },
    getLineData(state) {
        return state.lineData;
    }
};

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters,
};
