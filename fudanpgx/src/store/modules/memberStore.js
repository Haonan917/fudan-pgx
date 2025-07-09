// store/modules/memberStore.js

// import memberRequest from "@/request/memberRequest/memberRequest";
import axios from "axios";

const state = {
    memberList: [
    ],
};

const getters = {
    // 获取所有成员列表
    allMembers: state => state.memberList,

    // 获取 Faculty 成员列表
    facultyList: state => state.memberList.filter(member => member.role === 'Research Faculty'),

    // 获取 PhD 学生列表
    phdList: state => state.memberList.filter(member => member.role === 'PhD Student'),

    // 获取 Master 学生列表
    masterList: state => state.memberList.filter(member => member.role === 'Master Student'),

    // 根据成员 ID 获取成员
    getMemberById: state => id => state.memberList.find(member => member._id === id),

    // 根据成员 Name 获取成员
    getMemberByName: state => name => state.memberList.find(member => member.name === name)
};

const mutations = {
    // 可以添加对成员列表的增删改查操作的 mutations
    SET_MEMBER_LIST(state, members) {
        state.memberList = members;
        console.log("members", state.memberList)
    },
};

const actions = {
    // 可以添加异步操作，如从后端获取数据的 actions
    async fetchMembersFromJson({ commit }) {
        try {
            console.time('fetchMembers'); // 记录开始时间
            const response = await axios.get('./Resource/members_convert.json', { timeout: 1000000 });
            console.log("response", response);


            let members = await Promise.all(response.data.map(async (member) => {

                member.avatar = './Resource/members/'+ member.avatar
                // 使用 fetch 加载图片文件并转换为 Base64
                // const imageBase64 = await convertImageToBase64(avatarUrl);  // 改为直接调用函数
                // console.log(imageBase64);
                // member.avatar = imageBase64;

                return member;
            }));

            // 按年份排序
            members.sort((a, b) => {
                const yearA = parseInt(a.peopleID, 10);
                const yearB = parseInt(b.peopleID, 10);
                return yearA - yearB;
            });

            // 提交 mutation 设置 publication 列表
            commit('SET_MEMBER_LIST', members);
            console.timeEnd('fetchMembers'); // 记录结束时间并计算耗时

        } catch (error) {
            console.error('Failed to fetch members:', error);
        }
    }
};

// 异步函数：将图片转换为 Base64
// async function convertImageToBase64(url) {
//     try {
//         const response = await fetch(url);
//         const blob = await response.blob();
//         const reader = new FileReader();
//
//         return new Promise((resolve, reject) => {
//             reader.onloadend = () => {
//                 resolve(reader.result); // 返回 Base64 编码的 Data URL
//             };
//             reader.onerror = reject;
//
//             // 读取文件为 Data URL（Base64 编码）
//             reader.readAsDataURL(blob);
//         });
//     } catch (error) {
//         console.error('Error in converting image to Base64:', error);
//         throw error;
//     }
// }

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
};
