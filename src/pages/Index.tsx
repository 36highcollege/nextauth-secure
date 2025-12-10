import { useAuth } from "@/hooks/useAuth";
import { AuthButton } from "@/components/auth/AuthButton";
import { Shield, LogOut, User } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Index() {
  const { user, signOut, loading } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    navigate("/auth");
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
              <Shield className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="text-lg font-semibold text-foreground">SecureAuth</span>
          </div>
          
          {user ? (
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <User className="h-4 w-4" />
                <span className="hidden sm:inline">{user.email}</span>
              </div>
              <button
                onClick={handleSignOut}
                className="flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium text-foreground hover:bg-accent transition-colors"
              >
                <LogOut className="h-4 w-4" />
                <span className="hidden sm:inline">Sign Out</span>
              </button>
            </div>
          ) : (
            <AuthButton
              variant="primary"
              onClick={() => navigate("/auth")}
              className="w-auto px-6"
            >
              Sign In
            </AuthButton>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-16">
        {user ? (
          <div className="mx-auto max-w-2xl text-center">
            <div className="mb-6 inline-flex h-20 w-20 items-center justify-center rounded-full bg-primary/10">
              <Shield className="h-10 w-10 text-primary" />
            </div>
            <h1 className="mb-4 text-4xl font-bold tracking-tight text-foreground">
              Welcome to Your Dashboard
            </h1>
            <p className="mb-8 text-lg text-muted-foreground">
              You're successfully authenticated. Your session is secured with 
              JWT encryption and industry-standard security protocols.
            </p>
            <div className="rounded-xl border border-border bg-card p-6">
              <h2 className="mb-4 text-lg font-semibold text-foreground">Session Info</h2>
              <div className="space-y-3 text-left">
                <div className="flex justify-between rounded-lg bg-background p-3">
                  <span className="text-sm text-muted-foreground">Email</span>
                  <span className="text-sm font-medium text-foreground">{user.email}</span>
                </div>
                <div className="flex justify-between rounded-lg bg-background p-3">
                  <span className="text-sm text-muted-foreground">User ID</span>
                  <span className="text-sm font-mono text-foreground">{user.id.slice(0, 8)}...</span>
                </div>
                <div className="flex justify-between rounded-lg bg-background p-3">
                  <span className="text-sm text-muted-foreground">Status</span>
                  <span className="inline-flex items-center gap-1 text-sm font-medium text-primary">
                    <span className="h-2 w-2 rounded-full bg-primary animate-pulse" />
                    Authenticated
                  </span>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-6 inline-flex h-20 w-20 items-center justify-center rounded-full bg-primary/10">
              <Shield className="h-10 w-10 text-primary" />
            </div>
            <h1 className="mb-4 text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
              Secure Authentication System
            </h1>
            <p className="mb-8 text-lg text-muted-foreground">
              A modern, secure authentication solution built with React and 
              powered by enterprise-grade security. Sign in or create an account 
              to get started.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <AuthButton
                onClick={() => navigate("/auth")}
                className="w-full sm:w-auto px-8"
              >
                Get Started
              </AuthButton>
              <AuthButton
                variant="secondary"
                onClick={() => navigate("/auth")}
                className="w-full sm:w-auto px-8"
              >
                Sign In
              </AuthButton>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
