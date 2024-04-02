import { ROLES } from "../constants";
import { Access } from "payload/types";

export const adminOnly: Access = ({ req }) => {
    const { user } = req;

    if (!user || user.roles.includes(ROLES.CUSTOMER)) return false;

    return true;
}
