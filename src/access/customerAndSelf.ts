import { Access } from "payload/config";
import { ROLES } from "../constants";

export const customerAndSelf: Access = ({ req }) => {
    const { user, collection } = req;
    const { config } = collection ?? {};

    if (!user || user.roles.includes(ROLES.ADMIN)) return false;

    if (config?.slug === "productReviews") {
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