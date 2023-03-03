import axios from "axios";
import { IFiltersFolders } from "../types/Reports.type";

// Promise<IResponseConsulta | any>
const URL = import.meta.env.VITE_URL;

export const saveFilesInFolder = async (files: any): Promise<any> => {
    const formData: FormData = new FormData();
    formData.append('documents', files);

    try {
        const response = await axios.post(
            `${URL}/api/v1/reports/`, formData
        );
        return response;
    } catch (error) {
        Promise.reject(error);
    }
};

export const getFolders = async (filters: IFiltersFolders): Promise<any> => {
    try {
        const response = await axios.get(
            `${URL}/api/v1/reports/`, {
                params: {
                    ...filters
                }
            }
        );
        return response;
    } catch (error) {
        Promise.reject(error);
    }
};

export const getFilesForFolder = async (idFolder: number): Promise<any> => {
    try {
        const response = await axios.get(
            `${URL}/api/v1/reports/`, {
                params: {
                    idFolder
                }
            }
        );
        return response;
    } catch (error) {
        Promise.reject(error);
    }
};

export const updateNameFolder = async (id: number, nameFolder: string): Promise<any> => {
    try {
        const response = await axios.put(
            `${URL}/api/v1/reports/`, nameFolder,
            {
                params: id
            }
        );
        return response;
    } catch (error) {
        Promise.reject(error);
    }
};

export const deleteFolderOrFile = async (id: number): Promise<any> => {
    try {
        const response = await axios.delete(
            `${URL}/api/v1/reports/`,
            {
                params: id
            }
        );
        return response;
    } catch (error) {
        Promise.reject(error);
    }
};

