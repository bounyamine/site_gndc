import { Alert, AlertDescription } from "@/components/ui/alert";

const ErrorAlert = ({ message }: { message: string }) => (
    <Alert variant="destructive">
        <AlertDescription>{message}</AlertDescription>
    </Alert>
);

export default ErrorAlert;