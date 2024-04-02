import { Access } from "payload/config";
import { ROLES } from "../constants";

export const customerAndSelf: Access = ({ req }) => {
    const { user } = req;

    if (!user || user.roles.includes(ROLES.ADMIN)) return false;

    return {
        "userId.value": {
            equals: user.id
        }
    }
}