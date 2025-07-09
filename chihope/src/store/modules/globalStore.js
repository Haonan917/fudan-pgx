
const state = {
    isAuthenticated: false,
    globalContext:[
        {
            router:'/home',
            id:'#introFir',
            text:'The Chiglitazar PGx project aimed at studying the precision treatment of the Chiglitazar.The study cohort of 835 drug-naïve patients with T2D were recruited from two randomized, double-blind, phase 3 trials of the insulin sensitizer Chiglitazar, a pan-PPAR agonist. The placebo-controlled CMAP trial (NCT02121717, ClinicalTrials.gov) included 350 patients randomly assigned to receive low dose (32 mg/day, n = 106), high dose (48 mg/day, n = 106) insulin sensitizer and placebo (n = 138) for treatment. The sitagliptin-controlled CMAS trial (NCT02173457, ClinicalTrials.gov) included 485 patients randomly assigned to receive low dose (n = 161), high dose (n = 161) insulin sensitizer and sitagliptin (n = 163) for treatment.'
        },
        {
            router:'/home',
            id:'#introSec',
            text:'Longitudinal blood samples (n = 2390) from patients at baseline, treated for 12 weeks and 24 weeks during trials were collected. Multiomic datasets, including genomic and methylomic data were generated from whole blood samples at baseline, whereas miRNAomic, proteomic and metabolomic data were generated from plasma samples at different time points. For most individuals, complete data of all omics and time points were generated. Stringent quality control (QC) procedures were implemented to generate high-quality multi-omic datasets.'
        }
    ]
};

const mutations = {
    setGlobalContext(state, data) {
        if (state.globalContext ==null) {
            state.globalContext = data;
        }
    }
};

const actions = {

};

const getters = {
    getGlobalContext(state) {
        return state.globalContext;
    }
};

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters,
};
