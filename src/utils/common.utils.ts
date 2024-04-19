import moment from "moment";
import validator from "validator";
import { createHmac } from "crypto";
import { ROLES } from "../constants";

export const isValidMobileNumber = (value: string): boolean => {
    return validator.isMobilePhone(value ?? '', 'any');
}

export const isValidAge = (date: string, limit: number): boolean => {
    const twelveYearsAgo = moment().subtract(12, 'years');
    const parsedDate = moment(date);

    return parsedDate.isBefore(twelveYearsAgo);
}

export const createSignature = (message: any) => {
    const secret = "8gBm/:&EnhH.1/q";

    const hmac = createHmac("sha256", secret);
    hmac.update(message);

    const hashInBase64 = hmac.digest("base64");
    return hashInBase64;
};


export const hideAdminCollection = (args: any) => {
    const { user }: any = args ?? {};
    return user?.roles?.includes(ROLES.CUSTOMER);
}