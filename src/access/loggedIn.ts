import { Access } from "payload/config";

export const loggedIn: Access = ({ req: { user } }) => {
    return !!user;
}