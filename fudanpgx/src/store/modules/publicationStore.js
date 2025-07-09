import axios from 'axios';
import publicationRequest from "@/request/publicationRequest/publicationRequest";

const state = {
    publicationList:[

    ],
    pageList: [],
    totalPublications: 0,
    currentPage: 1,
    pageSize: 5
};

const getters = {
    filteredPublications: (state) => (year, key, journal) => {
        if (!year && !key && !journal) {
            state.totalPublications = state.publicationList.length; // 更新总出版物数
            return state.publicationList; // 返回所有文献
        }

        const selectedYear = year ? year.getFullYear() : null; // 提取年份
        const filteredList = state.publicationList.filter(item => {
            const matchesYear = selectedYear ? String(item.year) === String(selectedYear) : true;
            const matchesKey = key ? item.title.toLowerCase().includes(key.toLowerCase()) : true;
            const matchesJournal = journal ? item.journal.toLowerCase().includes(journal.toLowerCase()) : true;
            return matchesYear && matchesKey && matchesJournal;
        });

        state.totalPublications = filteredList.length; // 更新总出版物数
        return filteredList;
    },

    paginatedPublications: (state) => (pubList) => {
        const start = (state.currentPage - 1) * state.pageSize;
        let end = start + state.pageSize;
        if (end > pubList.length){
            end = pubList.length
        }
        return pubList.slice(start, end);
    },

    // 获取所有文献列表
    allPublications: state => state.publicationList,

    highlightPublications:state => {
        let highlightPubs = state.publicationList.filter(item=>{
            return item.journal === 'Nature Biotechnology' & item.type === 'Article' &item.year >= 2023
        })
        highlightPubs.sort((a, b) => {
            const yearA = parseInt(a.year, 10);
            const yearB = parseInt(b.year, 10);
            return yearB - yearA;
        });

        return highlightPubs;
    },
    totalPublications: state => state.totalPublications,
    currentPage: state => state.currentPage,
    pageSize: state => state.pageSize,



};

const mutations = {
    // 可以添加对成员列表的增删改查操作的 mutations
    SET_PUBLICATION_LIST(state, publications) {
        state.publicationList = publications;
        console.log("publications", state.publicationList)
    },

    SET_TOTAL_PUBLICATIONS(state, total) {
        state.totalPublications = total;
    },
    SET_CURRENT_PAGE(state, page) {
        state.currentPage = page;
    },
    SET_PAGE_SIZE(state, size) {
        state.pageSize = size;
    }
};

const actions = {
    // 可以添加异步操作，如从后端获取数据的 actions
    async fetchPublications({ commit }) {
        try {
            const response = await publicationRequest.getAllPublications();
            const publications = response.data.map(pub => {
                if (pub.img) {
                    pub.img = `data:image/png;base64,${pub.img}`;
                }

                if (pub.pdf) {
                    const pdfBlob = new Blob([new Uint8Array(atob(pub.pdf).split("").map(char => char.charCodeAt(0)))], { type: 'application/pdf' });
                    pub.pdfUrl = URL.createObjectURL(pdfBlob);
                }

                // 将 author 字段从列表转换为字符串
                if (Array.isArray(pub.author)) {
                    pub.author = pub.author.join(', ');
                }

                return pub;
            });

            // 按年份排序
            publications.sort((a, b) => {
                const yearA = parseInt(a.year, 10);
                const yearB = parseInt(b.year, 10);
                return yearB - yearA;
            });

            // 提交 mutation 设置 publication 列表
            commit('SET_PUBLICATION_LIST', publications);
            // 设置总记录数
            commit('SET_TOTAL_PUBLICATIONS', publications.length);
        } catch (error) {
            console.error('Failed to fetch publications:', error);
        }
    },

    async fetchPublicationsFromJson({ commit }) {
        try {
            console.time('fetchPublication'); // 记录开始时间
            // 使用并行化获取多个数据源（如果有其他需要获取的资源）
            const response = await axios.get('./Resource/scopus_convert.json', { timeout: 100000 });

            const publications = await Promise.all(response.data.map(async (pub) => {
                // 避免重复的转换操作
                if (pub.img) {
                    // pub.img = `data:image/png;base64,${pub.img}`;
                    pub.img = './Resource/publication/webps/'+ pub.img
                    // const imageBase64 = await convertImageToBase64(imgUrl);  // 改为直接调用函数
                    // // console.log(imageBase64);
                    // pub.img = imageBase64;
                }

                if (Array.isArray(pub.author)) {
                    pub.author = pub.author.join(', ');
                }

                return pub;
            }));

            // 使用优化的排序方法（尽量减少转换次数）
            publications.sort((a, b) => {
                return parseInt(b.year, 10) - parseInt(a.year, 10);
            });

            // 提交 mutation 设置 publication 列表
            commit('SET_PUBLICATION_LIST', publications);
            // 设置总记录数
            commit('SET_TOTAL_PUBLICATIONS', publications.length);
            console.timeEnd('fetchPublication'); // 记录结束时间并计算耗时
        } catch (error) {
            console.error('Failed to fetch data:', error);
        }
    },

    // 根据 DOI 下载 PDF 的 action
    async downloadPdfByDoi({ commit },doi) {
        console.log(commit)
        const publicationList = state.publicationList;
        const publicationItem = publicationList.find(item => item.doi === doi);

        if (!publicationItem) {
            alert(`未找到 DOI 为 ${doi} 的出版物。`);
            return;
        }
        let pdf_name = publicationItem.pdf
        let pdf_path = '/Resource/pdfs/'+pdf_name

        const link = document.createElement('a');
        link.href = pdf_path;
        link.download = pdf_name;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

    },


};
// async function convertImageToBase64(url) {
//     try {
//         const response = await fetch(url);
//         const blob = await response

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
};
