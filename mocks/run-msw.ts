const runMSW = async () => {
    if (process.env.NEXT_PUBLIC_API_MOCKING === 'enabled') {
        const { initMocks } = await import('./index');
        await initMocks();
    }
};

runMSW();

export { runMSW };
