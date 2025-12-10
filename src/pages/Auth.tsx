import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { LoginForm } from "@/components/auth/LoginForm";
import { SignupForm } from "@/components/auth/SignupForm";
import { useAuth } from "@/hooks/useAuth";
import { Shield } from "lucide-react";

export default function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && user) {
      navigate("/");
    }
  }, [user, loading, navigate]);

  return (
    <div className="flex min-h-screen">
      {/* Left side - Branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-primary relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary to-secondary opacity-90" />
        <div className="relative z-10 flex flex-col justify-center px-12 xl:px-20">
          <div className="flex items-center gap-3 mb-8">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary-foreground/10 backdrop-blur-sm">
              <Shield className="h-6 w-6 text-primary-foreground" />
            </div>
            <span className="text-2xl font-bold text-primary-foreground">SecureAuth</span>
          </div>
          <h2 className="text-4xl xl:text-5xl font-bold text-primary-foreground leading-tight mb-6">
            Secure Authentication
            <br />
            Made Simple
          </h2>
          <p className="text-lg text-primary-foreground/80 max-w-md">
            Experience enterprise-grade security with a beautiful, 
            user-friendly interface. Your data is protected with 
            industry-leading encryption standards.
          </p>
          <div className="mt-12 flex items-center gap-6">
            <div className="flex flex-col">
              <span className="text-3xl font-bold text-primary-foreground">256-bit</span>
              <span className="text-sm text-primary-foreground/70">Encryption</span>
            </div>
            <div className="h-12 w-px bg-primary-foreground/20" />
            <div className="flex flex-col">
              <span className="text-3xl font-bold text-primary-foreground">JWT</span>
              <span className="text-sm text-primary-foreground/70">Token Based</span>
            </div>
            <div className="h-12 w-px bg-primary-foreground/20" />
            <div className="flex flex-col">
              <span className="text-3xl font-bold text-primary-foreground">100%</span>
              <span className="text-sm text-primary-foreground/70">Secure</span>
            </div>
          </div>
        </div>
        {/* Decorative elements */}
        <div className="absolute -bottom-32 -right-32 h-96 w-96 rounded-full bg-secondary/30 blur-3xl" />
        <div className="absolute -top-32 -left-32 h-96 w-96 rounded-full bg-primary-foreground/5 blur-3xl" />
      </div>

      {/* Right side - Form */}
      <div className="flex w-full lg:w-1/2 items-center justify-center p-8 bg-background">
        <div className="w-full max-w-md">
          {/* Mobile logo */}
          <div className="flex lg:hidden items-center justify-center gap-3 mb-8">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary">
              <Shield className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold text-foreground">SecureAuth</span>
          </div>

          {isLogin ? (
            <LoginForm onSwitchToSignup={() => setIsLogin(false)} />
          ) : (
            <SignupForm onSwitchToLogin={() => setIsLogin(true)} />
          )}
        </div>
      </div>
    </div>
  );
}
