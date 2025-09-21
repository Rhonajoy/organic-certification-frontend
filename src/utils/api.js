import axios from "axios";
import { auth } from "../../firebase"; 

const BASE_URL =
  "https://organic-certification-backend-production.up.railway.app/organic-certified";


const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});



export const createFarmer = (data) => api.post("/farmers", data);
export const createFarm = (data) => api.post("/farms", data);
export const createField = (data) => api.post("/fields", data);
export const getFarmers = () => api.get("/farmers");
export const getFarmsByFarmer = (farmerId) => api.get(`/farms/farmer/${farmerId}`);
export const getFieldsByFarm = (farmId) => api.get(`/fields/farm/${farmId}`);
export const startInspection = (data) => api.post("/inspection/start", data);
export const submitInspection = (inspectionId, data) =>
  api.post(`/inspection/submit/${inspectionId}`, data);
export const getInspections = () => api.get("/inspection");
export const getRecentInspections = () => api.get("/inspection/recent");
export const getPendingApprovals = () => api.get("/inspection/draft/count");
export const createcertificate = (data) => api.post(`/certificate`, data);
export const getCertificateDownloadUrl = (certificateId) =>
  `${BASE_URL}/certificate/download/${certificateId}`;

export default api;
