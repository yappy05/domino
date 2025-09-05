import type {LoginDto} from "@domino/shared-types";
import axios from "axios";

export const authLoginApi = async (dto: LoginDto) => {
    try {
        const response = await axios.post('http://localhost:3000/api/auth/login', dto, {withCredentials: true})
        console.log(response.data)
        return response.data
    } catch (e) {
        console.log('ошибка при входе: ', e)
    }
}