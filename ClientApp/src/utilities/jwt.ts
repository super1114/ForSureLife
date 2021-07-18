import { accessCookie, setCookie } from './cookie_util';
import queryString from 'query-string';
import { JwtDecoded } from '../models/jwt_decode';



type QueryParam = 'packageId' | 'jwt';
export interface jwt {
    applicationId: string;
    aud: string;
    exp: number;
    iss: string;
}

export function decodeJwt(encodedJwt: string): JwtDecoded | undefined {
    try {
        return (!!encodedJwt ? JSON.parse(atob(encodedJwt.split('.')[1])) : undefined);
    } catch (error) {
        console.warn(error);
        return undefined;
    }
}
export function isJwtExpired(cookieName: string): boolean {
    return getMsUntilJwtExpires(cookieName) <= 0;
}

export function getMsUntilJwtExpires(cookieName: string): number {
    const jwtCookie = accessCookie(cookieName);
    if (jwtCookie) {
        const decodedJwt = decodeJwt(jwtCookie);
        if (decodedJwt) {
            const currentDate = Date.now();
            const jwtDate = new Date(decodedJwt.exp);
            return jwtDate.getTime() - currentDate;
        }
    }

    return 0;
}

const aYearFromNow = () => {
    const now = new Date();
    return new Date(now.setFullYear(now.getFullYear() + 1));
};


export function saveJwt(jwt: string) {
    const jwtKey = "fsl_jwt";
    const dateAYearFromNow = aYearFromNow();
    setCookie(jwtKey, jwt, dateAYearFromNow);
 
}

export function loadJwt() {
    const jwtKey = "fsl_jwt";
    return accessCookie(jwtKey);
}

