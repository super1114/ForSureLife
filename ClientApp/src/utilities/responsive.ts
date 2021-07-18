import { Mock } from "./mock";

export const desktopSize = 1080;
export const MockIsMobile = new Mock<boolean>();
export const isMobileDevice = MockIsMobile.makeAccessor(
    () => window.innerWidth < desktopSize
);
