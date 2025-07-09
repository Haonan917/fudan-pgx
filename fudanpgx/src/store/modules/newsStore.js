import axios from "axios";
// import {parseDate} from "element-plus";

const state = {

    newsList: [],
    totalNews: 0,
    currentPage: 1,
    pageSize: 5
};

const getters = {
    filteredNews: (state) => (startDate, endDate, key, tag) => {
        if (!startDate && !endDate && !key && !tag) {
            state.totalPublications = state.newsList.length; // 更新总新闻数
            return state.newsList; // 返回所有新闻
        }

        const filteredList = state.newsList.filter(item => {
            const itemDate = new Date(item.time); // 将 item.time 转换为 Date 对象
            const matchesDate = (!startDate || itemDate >= new Date(startDate)) && (!endDate || itemDate <= new Date(endDate));
            const matchesKey = key ? item.title.toLowerCase().includes(key.toLowerCase()) : true;
            const matchesTag = tag ? item.type === tag : true;

            return matchesDate && matchesKey && matchesTag;
        });

        state.totalNews = filteredList.length; // 更新总新闻数
        return filteredList;
    },
    paginatedNews: (state) => (newsList) => {
        const start = (state.currentPage - 1) * state.pageSize;
        let end = start + state.pageSize;
        if (end > newsList.length){
            end = newsList.length
        }
        return newsList.slice(start, end);
    },
    allNews: state => state.newsList,

    totalNews: state => state.newsList.length,
    currentPage: state => state.currentPage,
    pageSize: state => state.pageSize,
    getNewsById: state => id => state.newsList.find(news => news._id === id),
    recentNews:state => {
        // Sort the news list by time in descending order
        let sortedNews = state.newsList.sort((a, b) => {
            return new Date(b.time) - new Date(a.time);
        });

        // Return the latest 4 news items
        return sortedNews.slice(0, 4);
    },
};

const mutations = {
    // 可以添加对成员列表的增删改查操作的 mutations
    SET_NEWS_LIST(state, news) {
        state.newsList = news;
        console.log("news", state.newsList)
    },
    SET_CURRENT_PAGE(state, page) {
        state.currentPage = page;
    },
    SET_PAGE_SIZE(state, size) {
        state.pageSize = size;
    }
};

const actions = {
    async fetchNewsFromJson({ commit }) {
        function formatDateToYYYYMMDD(date) {
            const year = date.getFullYear();
            const month = String(date.getMonth() + 1).padStart(2, '0'); // 月份从0开始，需要+1
            const day = String(date.getDate()).padStart(2, '0');
            return `${year}-${month}-${day}`;
        }

        try {
            const response = await axios.get('./Resource/news_convert.json',{ timeout: 100000});
            console.log("response",response)
            let newsList =  await Promise.all(response.data.map(async (news) => {
                if (news.cover) {
                    news.cover = './Resource/news/'+ news.cover;
                }
                return news;
            }));

            // 按时间排序
            newsList.sort((a, b) => {
                return new Date(b.time) - new Date(a.time); // 直接比较时间戳
            });
            newsList.forEach(item => {
                item.time = formatDateToYYYYMMDD(new Date(item.time)); // 格式化日期
            });




            // 提交 mutation 设置 publication 列表
            commit('SET_NEWS_LIST', newsList);

        } catch (error) {
            console.error('Failed to fetch news:', error);
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
