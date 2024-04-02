import { FieldAccess } from "payload/types";
import { ROLES } from "../constants";

export const customerOnlyOrAynone: FieldAccess = ({ req: { user } }) => {
    return user ? user.roles.includes(ROLES.CUSTOMER) : true;
}