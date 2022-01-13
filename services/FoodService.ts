import axios, {AxiosResponse} from "axios";
import {random} from "lodash";

const nutritionix = require("nutritionix-api");
// const YOUR_APP_ID: string = '52d87ab5';
const YOUR_APP_ID: string = 'a73da295'; // Your APP ID
// const YOUR_API_KEY: string = '4517c9b99d4e8782eb5623770013b322';
const YOUR_API_KEY: string = 'df4dbe667601596879b00e5c48fe97b1'; // Your KEY

nutritionix.init(YOUR_APP_ID, YOUR_API_KEY);

export const fetchFood = async (foodQuery: string) => {
    const result = await nutritionix.natural.search(foodQuery)
    const food: object = result?.foods[0]
    return food
}

const apiClient = axios.create({
    baseURL: 'https://trackapi.nutritionix.com/v2',
    withCredentials: false,
    headers: {
        'x-app-id': YOUR_APP_ID,
        'x-app-key': YOUR_API_KEY,
    }
})



// @ts-ignore
export const fetchSuggestions = async (query: string): Promise<AxiosResponse<any[]>> => {
    query.replace(/%20/g, " ");
    if (query.length > 0) {
        const response = await apiClient.get(`/search/instant?query=${query}`)
        const {common: suggestions} = response.data
        return suggestions
    }


    // return await apiClient.get(`/search/instant?query=${query}`)
    // const headers: HeadersInit = {
    //     'x-app-id': YOUR_APP_ID,
    //     'x-app-key': YOUR_API_KEY,
    // }
    // const url = `https://trackapi.nutritionix.com/v2/search/instant?query=${query}`;
    // const opts: RequestInit = {
    //     method: 'GET',
    //     headers,
    // };
    // let result = await fetch(url, opts)
    // return result.json()
}




// export default {
//     fetchFood,
//     // postPost(post) {
//     //     return apiClient.post('/posts', post)
//     // },
//     // deletePostRequest(id) {
//     //     return apiClient.delete(`/posts/${id}`)
//     // }
//
// }