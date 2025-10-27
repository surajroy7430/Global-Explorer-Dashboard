import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

const ErrorMessage = ({ message = "Something went wrong", onRetry }) => {
  return (
    <div className="max-w-2xl mx-auto my-12">
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription className="mt-2">{message}</AlertDescription>
      </Alert>
      {onRetry && (
        <div className="mt-4 text-center">
          <Button onClick={onRetry} variant="outline">
            Try Again
          </Button>
        </div>
      )}
    </div>
  );
};

export default ErrorMessage;
