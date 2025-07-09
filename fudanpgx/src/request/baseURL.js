import axios from 'axios'

const instance = axios.create({
    baseURL: '/api', // 替换为你的 Express.js 后端 API 地址
    timeout: 100000, // 请求超时时间
    headers: {
        'Content-Type': 'application/json',
        // 可以添加其他默认的请求头配置
    }
});

export default instance;