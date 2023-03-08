async function initMocks() {
    if (typeof window === 'undefined') {
        const { server } = await import('./server');

        server.listen({
            onUnhandledRequest:
                process.env.NODE_ENV === 'development' ? 'warn' : 'bypass',
        });
    } else {
        const { worker } = await import('./browser');
        worker.start({
            onUnhandledRequest:
                process.env.NODE_ENV === 'development' ? 'warn' : 'bypass',
            serviceWorker: {
                // Points to the custom location of the Service Worker file.
                url: '/developer/mockServiceWorker.js',
            },
        });
    }
}

export { initMocks };
