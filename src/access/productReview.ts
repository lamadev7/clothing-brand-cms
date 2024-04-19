import { ROLES } from "../constants";

export const productReviewAccess = ({ req }) => {
    const { user } = req;

    if (user.roles.includes(ROLES.ADMIN)) return false;

    return {
        "userId.value": {
            equals: user.id
        }
    }
}