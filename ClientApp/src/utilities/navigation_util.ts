import { animateScroll as scroll } from 'react-scroll'

export const previous = (history) => {
    history.goBack();
}
export const navigate = (history, route) => {
    history.push(route);
    scroll.scrollToTop();
}
