import axiosInstance from "@/request/baseURL";

const memberRequest = {
    getAllMembers() {
        return axiosInstance.get('/members');
    },
};

export default memberRequest;