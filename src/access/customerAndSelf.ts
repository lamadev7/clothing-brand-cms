import { Access } from "payload/config";
import { ROLES } from "../constants";

export const customerAndSelf: Access = ({ req }) => {
    const { user, collection } = req;
    const { config } = collection ?? {};
    const { slug } = config ?? {};

    if (
        !user ||
        (!['users', 'media', 'productReviews'].includes(slug) && user.roles.includes(ROLES.ADMIN))
    ) return false;
    else if (['users', 'media', 'productReviews'].includes(slug) && user.roles.includes(ROLES.ADMIN)) return true;

    if (slug === "productReviews") {
        return {
            "userId.value": {
                equals: user.id
            }
        }
    }

    return {
        id: {
            equals: user.id
        }
    }
}