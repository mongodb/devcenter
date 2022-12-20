import ErrorComponent from 'next/error';
import React, { ErrorInfo, ReactNode } from 'react';
import * as Sentry from '@sentry/nextjs';

interface Props {
    children?: ReactNode;
}

interface State {
    hasError: boolean;
}

class ErrorBoundary extends React.Component<Props, State> {
    public state: State = {
        hasError: false,
    };

    public static getDerivedStateFromError(): State {
        return { hasError: true };
    }

    public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
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
