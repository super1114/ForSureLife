import Cookies from 'universal-cookie';


function getParentDomain() {
    const hostnamePieces = window.location.hostname.split('.');
    return hostnamePieces.length > 2
        ? `.${hostnamePieces[hostnamePieces.length - 2]}.com`
        : 'localhost';
}

export function setCookie(cookieName: string, cookieValue: string, expireDate: Date) {
    const domain = getParentDomain();
    if (domain !== 'localhost') {
        (new Cookies()).set(
            cookieName,
            cookieValue,
            {
                domain: "americanseniordirect.com",
                path: '/',
                expires: expireDate
            });
    } else {
        (new Cookies()).set(
            cookieName,
            cookieValue,
            {
                domain: undefined,
                path: '/',
                expires: expireDate
            });
    }
}

export function removeCookie(cookieName: string) {
    const domain = getParentDomain();
    (new Cookies()).remove(cookieName, { domain: domain, path: '/' });
}

export function accessCookie(cookieName: string) {
    return (new Cookies()).get(cookieName);
}

