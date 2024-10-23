
import { del, get, post, put } from "./baseApi";

const taskApi = {
    create: async (data) => {
        return await post("/tasks", data);
    },
    showList: async (params) => {
        return await get("/tasks/search", params);
    },
    update: async (data) => {
        return await put(`/tasks/${data.id}`, data)
    },
    delete: async (id) => {
        return await del(`/tasks/${id}`, )
    }
}

export default taskApi;