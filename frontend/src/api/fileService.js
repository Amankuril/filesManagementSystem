// src/api/fileService.js
import axios from "axios";

const API_URL = "http://localhost:5281/api/File";

export const getAllFiles = async () => {
  return axios.get(API_URL);
};

export const uploadFile = async (file, title) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("title", title);
  return axios.post(`${API_URL}/upload`, formData);
};

export const deleteFile = async (id) => {
  return axios.delete(`${API_URL}/${id}`);
};

export const updateFileTitle = async (id, newTitle) => {
  const formData = new FormData();
  formData.append("title", newTitle);
  return axios.put(`${API_URL}/${id}`, formData);
};
