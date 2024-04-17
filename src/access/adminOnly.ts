import { ROLES } from "../constants";
import { Access } from "payload/types";

export const adminOnly: Access = ({ req }) => {
    const { user, headers } = req;
    const { cookie } = headers ?? {};

    if (!user) {
        for (const a of (cookie?.split(";") ?? [])) {
            const [cookieName, cookieValue] = a.split('=');
            if (cookieName?.trim() === 'token' && cookieValue) return true;
        }
    }

    if (!user || user.roles.includes(ROLES.CUSTOMER)) return false;

    return true;
}
