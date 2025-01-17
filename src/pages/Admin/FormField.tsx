import { Label } from "@/components/ui/label";

const FormField = ({ label, children }: { label: string; children: React.ReactNode }) => (
    <div className="space-y-2">
        <Label>{label}</Label>
        {children}
    </div>
);

export default FormField;