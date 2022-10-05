// Use Axios previously configurated
import APIRequest from "../utils/config/axios.config";

// Consume routes from backend api-rest

export const create = (title, content, categories) => {
    return APIRequest.post('/add', {
        title,
        content,
        categories
    });
}

export const getAllNotes = () => APIRequest.get('/notes');

export const getNoteById = (id) => APIRequest.get(`/noteById/${id}`);

export const getNoteByTitle = (title) => APIRequest.get(`/noteByTitle/${title}`);

export const update = (id, title, content, archivedStatus, categories) => {
    return APIRequest.put('/update', {
        id,
        title,
        content,
        archivedStatus,
        categories
    })
}

export const remove = (id) => APIRequest.delete(`/delete/${id}`);