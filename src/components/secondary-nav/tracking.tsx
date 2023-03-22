import { useEffect } from 'react';

declare global {
    interface Window {
        segment: any;
    }
}

export const useLinkTracking = (
    el: HTMLElement | undefined | null,
    callback: (e: Event) => void
) => {
    useEffect(() => {
        el?.querySelectorAll('a').forEach((anchor: HTMLAnchorElement) => {
            anchor.addEventListener('click', callback);
        });

        return () => {
            el?.querySelectorAll('a').forEach((anchor: HTMLAnchorElement) => {
                anchor.removeEventListener('click', callback);
            });
        };
    }, [el]);
};

export const trackSecondaryNavLink = (e: Event) => {
    const link = e?.target as HTMLAnchorElement;

    if (window?.segment && link) {
        const { href, textContent: label } = link;
        try {
            window.segment.track('Secondary Nav Click', {
                href,
                label,
                category: 'navigation',
            });
        } catch {
            // Just swallow these for now since they are not essential.
            // Maybe log these to sentry when it's back running.
        }
    }
};

export const trackSecondaryNavToggle = (open: boolean) => {
    if (window?.segment) {
        try {
            window.segment.track(`Secondary Nav ${open ? 'Open' : 'Close'}`, {
                category: 'navigation',
            });
        } catch {
            // Just swallow these for now since they are not essential
            // Maybe log these to sentry when it's back running.
        }
    }
};
