import axios from "axios";
import {HeartbeatService} from "../types/service";

const apiUrl = 'http://localhost:8080'

export const getServiceList = () => axios.get(`${apiUrl}/api/service`)
export const addService = (input: {name: string, url: string}) => {
    const name = input.name
    const url = input.url
    return axios.post(`${apiUrl}/api/service`, { name, url })
}
export const modifyService = (input: {id: number, name: string, url: string}) => {
    const id = input.id
    const name = input.name
    const url = input.url
    return axios.put(`${apiUrl}/api/service`, { id, name, url })
}
export const deleteService = (input: {id: number}) => {
    const id = input.id
    return axios.delete(`${apiUrl}/api/service`, { data: { id } })
}