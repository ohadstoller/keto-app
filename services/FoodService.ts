import axios, {AxiosResponse} from "axios";
import {YOUR_APP_ID, YOUR_API_KEY} from '@/services/config'

const apiClient = axios.create({
    baseURL: 'https://trackapi.nutritionix.com/v2',
    withCredentials: false,
    headers: {
        'x-app-id': YOUR_APP_ID,
        'x-app-key': YOUR_API_KEY,
        'Content-Type': 'application/json'
    }
})


export const fetchFood = async (query: string) => {
    const body = {
        "query": query,
    }
    const response = await apiClient.post(`/natural/nutrients`, body)
    const food: object = response?.data?.foods[0]
    return food

}


export const fetchSuggestions = async (query: string): Promise<AxiosResponse<any[]>> => {
    query.replace(/%20/g, " ");
    if (query.length > 0) {
        const response = await apiClient.get(`/search/instant?query=${query}`)
        const {common: suggestions} = response.data
        return suggestions
    }
}
