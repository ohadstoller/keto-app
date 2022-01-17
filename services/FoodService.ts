import axios, {AxiosResponse} from "axios";
import {YOUR_API_KEY, YOUR_APP_ID} from '@/services/config'
import hash from "object-hash";

export interface Food {
    name: string,
    protein: number,
    carbs: number,
    fat: number,
    quantity: number,
    units: string,
    calories: number,
    id: string
}

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
    const response = await apiClient.post(`/natural/nutrients`, {query})
    const foodData: object = response?.data?.foods[0]
    const {
        food_name,
        nf_protein,
        nf_total_carbohydrate,
        nf_total_fat,
        nf_calories,
        serving_unit,
        serving_qty
    }: Object = foodData
    const food: Food = {
        name: food_name,
        protein: nf_protein,
        carbs: nf_total_carbohydrate,
        fat: nf_total_fat,
        quantity: serving_qty,
        units: serving_unit,
        calories: nf_calories,
        id: hash(foodData)
    }
    return food
}

export const fetchSuggestions = async (query: string): Promise<AxiosResponse<string[]>> => {
    query.replace(/%20/g, " ");
    if (query.length > 0) {
        const response = await apiClient.get(`/search/instant?query=${query}`)
        const {common: commonSuggestionsData} = response.data
        const suggestions = commonSuggestionsData.map((suggestion: { food_name: string; })=> suggestion.food_name)
        return suggestions
    }
}
