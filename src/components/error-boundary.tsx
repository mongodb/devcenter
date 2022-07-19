import ErrorComponent from 'next/error';
import React, { ErrorInfo } from 'react';
import * as Sentry from '@sentry/nextjs';

interface State {
    hasError: boolean;
}

class ErrorBoundary extends React.Component {
    public state: State = {
        hasError: false,
    };

    public static getDerivedStateFromError(_: Error): State {
        // Update state so the next render will show the fallback UI.
        return { hasError: true };
    }

    public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        console.log({ error, errorInfo });
        Sentry.captureException(errorInfo);
    }

    public render() {
        if (this.state.hasError) {
            // TODO: Custom fallback error UI.
            return <ErrorComponent statusCode={400} />;
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
