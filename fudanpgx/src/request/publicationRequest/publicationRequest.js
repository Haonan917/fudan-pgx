import axiosInstance from "@/request/baseURL";

const publicationRequest = {
    getAllPublications() {
        return axiosInstance.get('/publications');
    },

    downloadPdfByDoi(doi) {
        console.log("doi", doi)
        axiosInstance.get('/publications/download',{
            params: {
                "doi":doi
            },
            responseType: 'blob' // 确保响应类型为 blob
        }).then(
            response => {
                const url = window.URL.createObjectURL(new Blob([response.data]));
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', `${doi.replace('/', '_')}.pdf`);
                document.body.appendChild(link);
                link.click();
            }).catch(error => {
            console.error('Download error:', error);
        });

    }
};

export default publicationRequest;