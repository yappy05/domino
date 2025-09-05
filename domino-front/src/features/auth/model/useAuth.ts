import type {LoginDto} from "@domino/shared-types";
import {authLoginApi} from "../api/auth.api.ts";

export const useAuth = () => {
    const register = async (dto: LoginDto) => {
        return await authLoginApi(dto)
    }
    return {register}
}