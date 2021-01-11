import axios from "axios";
import {HeartbeatService} from "../types/service";
import {SearchCondition} from "../types/searchCondition";

const apiUrl = 'http://localhost:8080'

export const getServiceList = () => axios.get(`${apiUrl}/api/service`)
export const addService = (input: {name: string, url: string}) => {
    return axios.post(`${apiUrl}/api/service`, input)
}
export const modifyService = (input: {id: number, name: string, url: string}) => {
    return axios.put(`${apiUrl}/api/service`, input)
}
export const deleteService = (input: {id: number}) => {
    return axios.delete(`${apiUrl}/api/service`, { data: input })
}

export const getHookList = () => axios.get(`${apiUrl}/api/hook`)
export const addHook = (input: {name: string, url: string, type: string}) => {
    return axios.post(`${apiUrl}/api/hook`, input)
}
export const modifyHook = (input: {id: number, name: string, url: string, type: string}) => {
    return axios.put(`${apiUrl}/api/hook`, input)
}
export const deleteHook = (input: {id: number}) => {
    return axios.delete(`${apiUrl}/api/hook`, { data: input })
}

export const getHeartBeatHistory = (searchCondition: SearchCondition) => axios.get(`${apiUrl}/api/history`, { params: searchCondition})