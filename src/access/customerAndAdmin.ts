import { Access } from "payload/config";
import { ROLES } from "../constants";

export const customerAndAdmin: Access = ({ req: { user } }) => {
    if (!user || (!user.roles.includes(ROLES.CUSTOMER) && !user.roles.includes(ROLES.ADMIN))) return false;
    if (user.roles.includes(ROLES.ADMIN)) return true;

    return {
        userId: {
            equals: user.id
        }
    }
}