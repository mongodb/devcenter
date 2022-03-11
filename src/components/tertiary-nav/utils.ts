export const scrollListener = (e: Event) => {
    const { offsetWidth, scrollLeft, scrollWidth }: HTMLElement =
        e.target as HTMLElement;
    const fadeRight = document.getElementById('navScrollFadeRight');
    const fadeLeft = document.getElementById('navScrollFadeLeft');

    if (fadeRight === null || fadeLeft === null) return;

    if (offsetWidth + scrollLeft === scrollWidth) {
        fadeRight.style.display = 'none';
        return;
    }
    if (scrollLeft === 0) {
        fadeLeft.style.display = 'none';
        return;
    }
    fadeRight.style.display = 'inline-block';
    fadeLeft.style.display = 'inline-block';
};
