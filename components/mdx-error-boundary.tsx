"use client";

import { TriangleAlertIcon } from "lucide-react";
import React from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

interface MDXErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

interface MDXErrorBoundaryProps {
  children: React.ReactNode;
  fallback?: React.ComponentType<{ error: Error; reset: () => void }>;
}

export class MDXErrorBoundary extends React.Component<
  MDXErrorBoundaryProps,
  MDXErrorBoundaryState
> {
  constructor(props: MDXErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): MDXErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("MDX Error Boundary caught an error:", error, errorInfo);
  }

  reset = () => {
    this.setState({ hasError: false, error: undefined });
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        const FallbackComponent = this.props.fallback;
        return (
          <FallbackComponent
            error={this.state.error || new Error("Unknown error")}
            reset={this.reset}
          />
        );
      }

      return (
        <Alert variant="destructive" className="my-4">
          <TriangleAlertIcon />
          <AlertTitle>Content Error</AlertTitle>
          <AlertDescription>
            There was an error rendering this content.
            {process.env.NODE_ENV === "development" && this.state.error && (
              <details className="mt-2">
                <summary className="cursor-pointer font-medium">
                  Error Details
                </summary>
                <pre className="mt-2 text-xs overflow-auto">
                  {this.state.error.message}
                </pre>
              </details>
            )}
          </AlertDescription>
        </Alert>
      );
    }

    return this.props.children;
  }
}

// Hook version for functional components
export function useMDXErrorBoundary() {
  const [error, setError] = React.useState<Error | null>(null);

  const reset = React.useCallback(() => {
    setError(null);
  }, []);

  const captureError = React.useCallback((error: Error) => {
    setError(error);
  }, []);

  React.useEffect(() => {
    if (error) {
      throw error;
    }
  }, [error]);

  return { captureError, reset };
}
