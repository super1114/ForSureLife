import { accessCookie } from '../utilities/cookie_util';

const fetchSendCookieAsAuth = (cookieName: string, headerName: string) => (url: RequestInfo, init?: RequestInit) => {
    let customInit: RequestInit = { ...init };
    const cookieValue = accessCookie(cookieName);
    if (cookieValue) {
        customInit.headers = customInit.headers ? new Headers(customInit.headers) : new Headers();
        customInit.headers.append(headerName, `Bearer ${cookieValue}`);
    }
    return fetch(url, customInit);
};

export const httpWithTokenInHeader = { fetch: fetchSendCookieAsAuth('fsl_jwt', 'Authorization') };
