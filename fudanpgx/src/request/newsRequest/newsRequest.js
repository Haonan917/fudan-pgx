import axiosInstance from "@/request/baseURL";

const newsRequest = {
    getAllNews() {
        return axiosInstance.get('/news');
    }
};

export default newsRequest;