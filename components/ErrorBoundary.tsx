import * as React from 'react';

interface Props {
  children: React.ReactNode;
}

interface State {
  hasError: boolean;
}

// FIX: To resolve the error "Property 'props' does not exist on type 'ErrorBoundary'", the React import was changed to a namespace import.
// This ensures that all React types are correctly namespaced (e.g., React.Component, React.ReactNode), which can fix module resolution issues.
class ErrorBoundary extends React.Component<Props, State> {
  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(_: Error): State {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // You can also log the error to an error reporting service
    console.error("Uncaught error:", error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (
        <div className="text-center py-16 bg-red-50 text-red-700 rounded-lg border border-red-200">
           <svg className="mx-auto h-12 w-12 text-red-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          <h1 className="mt-4 text-3xl font-bold">Something went wrong.</h1>
          <p className="mt-2 text-lg">We're sorry for the inconvenience. Please try refreshing the page.</p>
           <button 
                onClick={() => window.location.reload()}
                className="mt-6 inline-block bg-red-600 text-white font-bold py-2 px-5 rounded-lg hover:bg-red-700 transition-all text-sm"
            >
                Refresh Page
            </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
