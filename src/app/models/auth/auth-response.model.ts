import { UserModel } from "@models/user/user.model";

export interface AuthResponseModel{
    accessToken: string;
    refreshToken: string;
    user: UserModel;
}