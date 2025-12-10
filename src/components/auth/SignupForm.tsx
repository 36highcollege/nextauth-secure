import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { FormInput } from "./FormInput";
import { AuthButton } from "./AuthButton";
import { AuthCard, AuthCardHeader, AuthCardFooter } from "./AuthCard";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";

const signupSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

interface SignupFormProps {
  onSwitchToLogin: () => void;
}

export function SignupForm({ onSwitchToLogin }: SignupFormProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState<{ email?: string; password?: string; confirmPassword?: string }>({});
  const [loading, setLoading] = useState(false);
  const { signUp } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    const result = signupSchema.safeParse({ email, password, confirmPassword });
    if (!result.success) {
      const fieldErrors: { email?: string; password?: string; confirmPassword?: string } = {};
      result.error.errors.forEach((err) => {
        const field = err.path[0] as keyof typeof fieldErrors;
        fieldErrors[field] = err.message;
      });
      setErrors(fieldErrors);
      return;
    }

    setLoading(true);
    const { error } = await signUp(email, password);
    setLoading(false);

    if (error) {
      if (error.message.includes("User already registered")) {
        toast.error("An account with this email already exists");
      } else {
        toast.error(error.message);
      }
      return;
    }

    toast.success("Account created successfully!");
    navigate("/");
  };

  return (
    <AuthCard>
      <AuthCardHeader
        title="Create Account"
        description="Get started with your free account"
      />
      <form onSubmit={handleSubmit} className="space-y-5">
        <FormInput
          label="Email"
          type="email"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          error={errors.email}
          autoComplete="email"
        />
        <FormInput
          label="Password"
          type="password"
          placeholder="••••••••"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          error={errors.password}
          autoComplete="new-password"
        />
        <FormInput
          label="Confirm Password"
          type="password"
          placeholder="••••••••"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          error={errors.confirmPassword}
          autoComplete="new-password"
        />
        <AuthButton type="submit" loading={loading}>
          Create Account
        </AuthButton>
      </form>
      <AuthCardFooter>
        Already have an account?{" "}
        <button
          onClick={onSwitchToLogin}
          className="font-medium text-primary hover:text-primary/80 transition-colors"
        >
          Sign in
        </button>
      </AuthCardFooter>
    </AuthCard>
  );
}
