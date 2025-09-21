
import axios from "axios";


const BASE_URL = "https://organic-certification-backend-production.up.railway.app/organic-certified";


const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});


export const createFarmer = (data) => api.post("/farmers", data);
export const createFarm = (data) => api.post("/farms", data);
export const createField = (data) => api.post("/fields", data);
export const startInspection = (data) => api.post("/inspection/start", data);
export const submitInspection = (inspectionId, data) =>
  api.post(`/inspection/submit/${inspectionId}`, data);

export default api;
