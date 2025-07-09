import axiosInstance from "@/request/baseURL";

const almuniRequest = {
    getAllAlumnis() {
        return axiosInstance.get('/alumnis');
    }
};

export default almuniRequest;