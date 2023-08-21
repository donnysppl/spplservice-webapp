export interface SignUp {
    name: string;
    email: string;
    mobile: string;
    password: string;
    code: string;
}
export interface userTokenData {
    name: string;
    email: string;
    id: string;
    exp: Number;
    iat: Number;
}
