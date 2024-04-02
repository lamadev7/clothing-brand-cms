
export type Role = 'admin' | 'customer';
export interface User {
    id: string,
    firstName: string,
    lastName: string,
    mobile: string,
    dob: string,
    email: string,
    role: Role;
}