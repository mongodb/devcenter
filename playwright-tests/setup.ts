const setup = () => {
    if (process.env.NEXT_PUBLIC_API_MOCKING !== 'enabled') {
        console.warn(
            `\x1b[33m[WARNING]\x1b[0m Environment variable NEXT_PUBLIC_API_MOCKING is not set to enabled. Make sure you've built the application in mocked mode or tests may fail.`
        );
    }
};

export default setup;
