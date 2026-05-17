import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { motion, AnimatePresence } from 'motion/react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from './ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from './ui/form';
import { AlertCircle, Loader2, Mail, ArrowRight, Eye, EyeOff, ShieldCheck } from 'lucide-react';
import { Alert, AlertDescription } from './ui/alert';
import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog";

const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password requires 6+ characters"),
});

const registerSchema = z.object({
  firstName: z.string().min(2, "First name requires 2+ characters"),
  lastName: z.string().min(2, "Last name requires 2+ characters"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password requires 6+ characters"),
  confirmPassword: z.string().min(6, "Confirm password is required"),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

export default function AuthModal() {
  const { isAuthModalOpen, closeAuthModal, signIn, signUp } = useAuth();
  const [isLogin, setIsLogin] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<{ message: string; id: number } | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showRegisterPassword, setShowRegisterPassword] = useState(false);

  // Auto-hide error after 2 seconds
  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        setError(null);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  const loginForm = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });

  const registerForm = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: { firstName: "", lastName: "", email: "", password: "", confirmPassword: "" },
  });

  const onLogin = async (data: z.infer<typeof loginSchema>) => {
    setIsSubmitting(true);
    setError(null);
    try {
      await signIn(data);
    } catch (err: any) {
      setError({ message: err.message || "Failed to sign in. Please check your credentials.", id: Date.now() });
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const onRegister = async (data: z.infer<typeof registerSchema>) => {
    setIsSubmitting(true);
    setError(null);
    try {
      await signUp(data);
    } catch (err: any) {
      setError({ message: err.message || "Failed to create account. Please try again.", id: Date.now() });
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isAuthModalOpen} onOpenChange={(open) => !open && closeAuthModal()}>
      <DialogContent className="max-w-[460px] p-0 bg-transparent  border-none shadow-none">
        <div className="relative w-full ">
          {/* Error Feedback */}
          {/* <AnimatePresence>
            {error && (
              <motion.div
                key={error.id}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="absolute -top-20 left-0 w-full z-[200] px-6 pointer-events-none"
              >
                <div className="pointer-events-auto">
                  <Alert variant="destructive" className="glass-panel border-red-500/90 bg-red-500/5 text-red-500 rounded-2xl py-4 shadow-[0_20px_40px_rgba(255,0,0,0.1)] backdrop-blur-md">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription className="text-[10px] font-mono font-bold tracking-wider">
                      {error.message}
                    </AlertDescription>
                  </Alert>
                </div>
              </motion.div>
            )}
          </AnimatePresence> */}

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            className="relative "
          >
            <Card className="relative glass-panel rounded-[40px] border-border/50 shadow-[0_64px_128px_-16px_rgba(0,0,0,0.8)] overflow-hidden ">
              <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-primary/30 to-transparent opacity-50" />

              <CardHeader className="pt-10 pb-6 px-10 text-center justify-center">
                <div className="flex items-center justify-center gap-6">
                  <button
                    type="button"
                    onClick={() => { setIsLogin(true); setError(null); }}
                    className={`text-4xl font-sans font-medium tracking-tight transition-all duration-500 ${isLogin ? "text-primary drop-shadow-md" : "text-muted-foreground/40 hover:text-foreground/80 hover:scale-105"}`}
                  >
                    Login
                  </button>
                  <span className="text-2xl text-primary/20 font-light">/</span>
                  <button
                    type="button"
                    onClick={() => { setIsLogin(false); setError(null); }}
                    className={`text-4xl font-sans font-medium tracking-tight transition-all duration-500 ${!isLogin ? "text-primary drop-shadow-md" : "text-muted-foreground/40 hover:text-foreground/80 hover:scale-105"}`}
                  >
                    Register
                  </button>
                </div>
              </CardHeader>

              <CardContent className="px-10 pb-6">
                <AnimatePresence mode="wait">
                  {isLogin ? (
                    <motion.div
                      key="login"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 10 }}
                      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    >
                      <Form {...loginForm}>
                        <form onSubmit={loginForm.handleSubmit(onLogin)} className="space-y-6">
                          <FormField
                            control={loginForm.control}
                            name="email"
                            render={({ field }) => (
                              <FormItem className="space-y-3">
                                <FormLabel className="text-sm font-sans text-muted-foreground/90 font-bold ml-1">Email</FormLabel>
                                <FormControl>
                                  <div className="group relative">
                                    <Mail className="absolute right-5 top-1/2 -translate-y-1/2 h-4 w-4 text-primary/40 group-focus-within:text-primary transition-colors duration-300" />
                                    <Input
                                      placeholder="user@gmail.com"
                                      className="h-14 bg-primary/[0.03] border-primary/20 focus:border-primary/50 focus:bg-primary/[0.08] transition-all duration-500 rounded-2xl font-sans text-[11px] font-bold tracking-widest px-6 pr-14 lowercase text-foreground focus:shadow-[0_0_20px_rgba(255,100,50,0.1)] placeholder:text-muted-foreground/60"
                                      {...field}
                                    />
                                  </div>
                                </FormControl>
                                <FormMessage className="text-[9px] font-sans text-red-500 tracking-widest" />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={loginForm.control}
                            name="password"
                            render={({ field }) => (
                              <FormItem className="space-y-3">
                                <FormLabel className="text-sm font-sans text-muted-foreground/90 font-bold ml-1">Password</FormLabel>
                                <FormControl>
                                  <div className="group relative">
                                    <button
                                      type="button"
                                      onClick={() => setShowPassword(!showPassword)}
                                      className="absolute right-5 top-1/2 -translate-y-1/2 z-20 text-primary/40 hover:text-primary transition-colors duration-300 focus:outline-none"
                                    >
                                      {showPassword ? (
                                        <EyeOff className="h-4 w-4" />
                                      ) : (
                                        <Eye className="h-4 w-4" />
                                      )}
                                    </button>
                                    <Input
                                      type={showPassword ? "text" : "password"}
                                      placeholder="••••••••"
                                      className="h-14 bg-primary/[0.03] border-primary/20 focus:border-primary/50 focus:bg-primary/[0.08] transition-all duration-500 rounded-2xl font-mono text-[11px] font-bold tracking-widest px-6 pr-14 lowercase text-foreground focus:shadow-[0_0_20px_rgba(255,100,50,0.1)] placeholder:text-muted-foreground/60"
                                      {...field}
                                    />
                                  </div>
                                </FormControl>
                                <div className="flex justify-between items-center mt-2">
                                  <FormMessage className="text-[8px] font-mono text-red-500" />
                                  <button type="button" className="text-[10px] font-sans font-medium text-muted-foreground hover:text-primary transition-colors ml-auto">
                                    Forgot Password?
                                  </button>
                                </div>
                              </FormItem>
                            )}
                          />
                          <div className="pt-4 space-y-4">
                            <Button
                              type="submit"
                              disabled={isSubmitting}
                              className="w-full h-14 rounded-full font-sans text-[12px] font-bold transition-all duration-500 bg-primary/80 hover:bg-primary/95 text-background hover:scale-105 active:scale-95 shadow-md shadow-primary/30"
                            >
                              {isSubmitting ? (
                                <Loader2 className="h-5 w-5 animate-spin" />
                              ) : "Continue"}
                            </Button>

                            <Button
                              type="button"
                              onClick={() => window.location.href = `https://server-3gru.onrender.com/api/auth/google`}
                              className="w-full h-14 rounded-full font-sans text-[12px] font-bold transition-all duration-500 bg-secondary/30 hover:bg-secondary/50 text-foreground border border-secondary/40 hover:border-secondary hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2 hover:shadow-[0_0_20px_rgba(100,100,100,0.1)]"
                            >
                              {/* <svg className="w-4 h-4" viewBox="0 0 24 24">
                                <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                                <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                                <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                                <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                              </svg> */}
                              <img src="./google.png" alt="google" className="w-4 h-4" />
                              Login with Google
                            </Button>
                          </div>
                        </form>
                      </Form>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="register"
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -10 }}
                      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    >
                      <Form {...registerForm}>
                        <form onSubmit={registerForm.handleSubmit(onRegister)} className="space-y-6">
                          <div className="grid grid-cols-2 gap-4">
                            <FormField
                              control={registerForm.control}
                              name="firstName"
                              render={({ field }) => (
                                <FormItem className="space-y-3">
                                  <FormLabel className="text-sm font-sans text-muted-foreground/90 font-bold ml-1">First name</FormLabel>
                                  <FormControl>
                                    <Input
                                      placeholder="First name"
                                      className="h-14 bg-primary/[0.03] border-primary/20 focus:border-primary/50 focus:bg-primary/[0.08] transition-all duration-500 rounded-2xl font-mono text-[11px] font-bold tracking-widest px-6 lowercase text-foreground focus:shadow-[0_0_20px_rgba(255,100,50,0.1)] placeholder:text-muted-foreground/60"
                                      {...field}
                                    />
                                  </FormControl>
                                  <FormMessage className="text-[8px] font-mono text-red-500" />
                                </FormItem>
                              )}
                            />
                            <FormField
                              control={registerForm.control}
                              name="lastName"
                              render={({ field }) => (
                                <FormItem className="space-y-3">
                                  <FormLabel className="text-sm font-sans text-muted-foreground/90 font-bold ml-1">Last name</FormLabel>
                                  <FormControl>
                                    <Input
                                      placeholder="Last name"
                                      className="h-14 bg-primary/[0.03] border-primary/20 focus:border-primary/50 focus:bg-primary/[0.08] transition-all duration-500 rounded-2xl font-mono text-[11px] font-bold tracking-widest px-6 lowercase text-foreground focus:shadow-[0_0_20px_rgba(255,100,50,0.1)] placeholder:text-muted-foreground/60"
                                      {...field}
                                    />
                                  </FormControl>
                                  <FormMessage className="text-[8px] font-mono text-red-500" />
                                </FormItem>
                              )}
                            />
                          </div>
                          <FormField
                            control={registerForm.control}
                            name="email"
                            render={({ field }) => (
                              <FormItem className="space-y-3">
                                <FormLabel className="text-sm font-sans text-muted-foreground/90 font-bold ml-1">Email</FormLabel>
                                <FormControl>
                                  <div className="group relative">
                                    <Mail className="absolute right-5 top-1/2 -translate-y-1/2 h-4 w-4 text-primary/40 group-focus-within:text-primary transition-colors duration-300" />
                                    <Input
                                      placeholder="example@gmail.com"
                                      className="h-14 bg-primary/[0.03] border-primary/20 focus:border-primary/50 focus:bg-primary/[0.08] transition-all duration-500 rounded-2xl font-mono text-[11px] font-bold tracking-widest px-6 pr-14 lowercase text-foreground focus:shadow-[0_0_20px_rgba(255,100,50,0.1)] placeholder:text-muted-foreground/60"
                                      {...field}
                                    />
                                  </div>
                                </FormControl>
                                <FormMessage className="text-[8px] font-mono text-red-500" />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={registerForm.control}
                            name="password"
                            render={({ field }) => (
                              <FormItem className="space-y-3">
                                <FormLabel className="text-sm font-sans text-muted-foreground/90 font-bold ml-1">Password</FormLabel>
                                <FormControl>
                                  <div className="group relative">
                                    <button
                                      type="button"
                                      onClick={() => setShowRegisterPassword(!showRegisterPassword)}
                                      className="absolute right-5 top-1/2 -translate-y-1/2 z-20 text-primary/40 hover:text-primary transition-colors duration-300 focus:outline-none"
                                    >
                                      {showRegisterPassword ? (
                                        <EyeOff className="h-4 w-4" />
                                      ) : (
                                        <Eye className="h-4 w-4" />
                                      )}
                                    </button>
                                    <Input
                                      type={showRegisterPassword ? "text" : "password"}
                                      placeholder="••••••••"
                                      className="h-14 bg-primary/[0.03] border-primary/20 focus:border-primary/50 focus:bg-primary/[0.08] transition-all duration-500 rounded-2xl font-mono text-[11px] font-bold tracking-widest px-6 pr-14 lowercase text-foreground focus:shadow-[0_0_20px_rgba(255,100,50,0.1)] placeholder:text-muted-foreground/60"
                                      {...field}
                                    />
                                  </div>
                                </FormControl>
                                <FormMessage className="text-[8px] font-mono text-red-500" />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={registerForm.control}
                            name="confirmPassword"
                            render={({ field }) => (
                              <FormItem className="space-y-3">
                                <FormLabel className="text-sm font-sans text-muted-foreground/90 font-bold ml-1">Confirm Password</FormLabel>
                                <FormControl>
                                  <div className="group relative">
                                    <button
                                      type="button"
                                      onClick={() => setShowRegisterPassword(!showRegisterPassword)}
                                      className="absolute right-5 top-1/2 -translate-y-1/2 z-20 text-primary/40 hover:text-primary transition-colors duration-300 focus:outline-none"
                                    >
                                      {showRegisterPassword ? (
                                        <EyeOff className="h-4 w-4" />
                                      ) : (
                                        <Eye className="h-4 w-4" />
                                      )}
                                    </button>
                                    <Input
                                      type={showRegisterPassword ? "text" : "password"}
                                      placeholder="••••••••"
                                      className="h-14 bg-primary/[0.03] border-primary/20 focus:border-primary/50 focus:bg-primary/[0.08] transition-all duration-500 rounded-2xl font-mono text-[11px] font-bold tracking-widest px-6 pr-14 lowercase text-foreground focus:shadow-[0_0_20px_rgba(255,100,50,0.1)] placeholder:text-muted-foreground/60"
                                      {...field}
                                    />
                                  </div>
                                </FormControl>
                                <FormMessage className="text-[8px] font-mono text-red-500" />
                              </FormItem>
                            )}
                          />
                          <div className="pt-2 space-y-4">
                            <p className="text-center text-[10px] font-sans text-muted-foreground/80 pb-2">
                              By registering, you agree to our Terms of Service.
                            </p>
                            <Button
                              type="submit"
                              disabled={isSubmitting}
                              className="w-full h-14 rounded-full font-sans text-[12px] font-bold transition-all duration-500 bg-primary/80 hover:bg-primary/95 text-background hover:scale-105 active:scale-95 shadow-md shadow-primary/30"
                            >
                              {isSubmitting ? (
                                <Loader2 className="h-5 w-5 animate-spin" />
                              ) : "Continue"}
                            </Button>

                            <Button
                              type="button"
                              onClick={() => window.location.href = `https://server-3gru.onrender.com/api/auth/google`}
                              className="w-full h-14 rounded-full font-sans text-[12px] font-bold transition-all duration-500 bg-secondary/30 hover:bg-secondary/50 text-foreground border border-secondary/40 hover:border-secondary hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2 hover:shadow-[0_0_20px_rgba(100,100,100,0.1)]"
                            >
                              {/* <svg className="w-4 h-4" viewBox="0 0 24 24">
                                <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                                <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                                <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                                <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                              </svg> */}
                              <img src="./google.png" alt="google" className="w-4 h-4" />
                              Sign in with Google
                            </Button>

                          </div>
                        </form>
                      </Form>
                    </motion.div>
                  )}
                </AnimatePresence>
              </CardContent>

              {/* <CardFooter className="px-10 pb-8 flex  items-center pt-8 border-t border-border/50 flex-row gap-1 text-center justify-center">
                <span className="text-[9px] font-mono text-muted-foreground/90 font-bold ml-1">{isLogin ? "Don't have an account?" : "Already have an account?"}</span>
                <button
                  onClick={() => {
                    setIsLogin(!isLogin);
                    setError(null);
                  }}
                  className="group flex items-center gap-3 text-[10px] font-mono font-bold text-primary/60 hover:text-primary transition-all duration-500"
                >
                  <span>{isLogin ? "Register" : "Login"}</span>
                  <ArrowRight className="h-3 w-3 translate-x-0 group-hover:translate-x-2 transition-transform" />
                </button>
              </CardFooter> */}
            </Card>
          </motion.div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
