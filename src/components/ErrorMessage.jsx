import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";

const ErrorMessage = ({
  title = "Error",
  message = "Something went wrong",
  onRetry,
}) => {
  return (
    <div className="max-w-2xl my-4">
      <Alert variant="destructive">
        <AlertTitle>{title}</AlertTitle>
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
