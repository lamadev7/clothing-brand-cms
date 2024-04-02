import { Access } from "payload/config";
import { ROLES } from "../constants";

export const adminAndSelf: Access = ({ req: { user } }) => {
    if (!user) return false;
    if (user.roles.includes(ROLES.ADMIN)) return true;

    return {
        id: {
            equals: user.id
        }
    }
}