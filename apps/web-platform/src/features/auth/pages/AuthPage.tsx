import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '../../../components/ui/button';
import { Input } from '../../../components/ui/input';
import { useNavigate } from 'react-router';
import { ArrowRight, Mail, Lock, Gamepad2, User as UserIcon } from 'lucide-react';

export function AuthPage() {
  const [view, setView] = useState<'login' | 'register'>('login');
  const navigate = useNavigate();

  const handleAuth = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate auth success
    navigate('/');
  };

  return (
    <div className="min-h-screen w-full flex relative overflow-hidden bg-background selection:bg-primary/30">
      
      {/* Decorative Background */}
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=2070')] bg-cover bg-center opacity-20 mix-blend-overlay"></div>
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background/95 to-primary/10 backdrop-blur-[2px]"></div>

      {/* Floating Elements (Decorative) */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-primary/20 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-20 right-10 w-48 h-48 bg-accent/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>

      <div className="relative z-10 w-full flex items-center justify-center p-4">
        <motion.div 
          className="w-full max-w-5xl flex flex-col md:flex-row bg-card/60 backdrop-blur-2xl rounded-[2rem] border border-white/10 shadow-[0_8px_32px_0_rgba(0,0,0,0.3)] overflow-hidden"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
        >
          
          {/* Left Hero Panel */}
          <div className="hidden md:flex md:w-1/2 bg-gradient-to-br from-primary/80 to-blue-900/80 p-12 flex-col justify-between text-white relative overflow-hidden">
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1614294149010-950b698f72c0?q=80&w=800')] bg-cover opacity-20 mix-blend-overlay"></div>
            
            <div className="relative z-10">
              <div className="w-12 h-12 bg-white rounded-xl text-primary flex items-center justify-center font-bold text-3xl mb-8 shadow-lg">ل</div>
              <h1 className="text-4xl lg:text-5xl font-display font-bold leading-tight mb-4 drop-shadow-md">Welcome to<br/>Lametna.</h1>
              <p className="text-white/80 text-lg max-w-sm drop-shadow">The ultimate social gaming ecosystem. Play, connect, and compete.</p>
            </div>

            <div className="relative z-10 bg-black/20 p-6 rounded-2xl backdrop-blur-md border border-white/10 mt-12">
              <div className="flex gap-4 items-center">
                <Gamepad2 className="w-8 h-8 text-accent" />
                <div>
                  <h3 className="font-bold text-lg">Season 1 is Live</h3>
                  <p className="text-sm text-white/70">Join now to claim exclusive rewards.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Form Panel */}
          <div className="w-full md:w-1/2 p-8 md:p-12 lg:p-16 flex flex-col justify-center">
            
            <div className="md:hidden flex justify-center mb-8">
              <div className="w-12 h-12 bg-gradient-to-tr from-primary to-blue-600 rounded-xl text-white flex items-center justify-center font-bold text-3xl shadow-lg">ل</div>
            </div>

            <AnimatePresence mode="wait">
              {view === 'login' ? (
                <motion.div
                  key="login"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-6"
                >
                  <div>
                    <h2 className="text-3xl font-display font-bold">Welcome back</h2>
                    <p className="text-muted-foreground mt-2">Enter your credentials to access your account.</p>
                  </div>

                  <form onSubmit={handleAuth} className="space-y-4">
                    <div className="space-y-2 relative">
                      <Mail className="w-4 h-4 absolute left-3 top-[38px] text-muted-foreground" />
                      <label className="text-sm font-medium">Email Address</label>
                      <Input type="email" placeholder="name@example.com" className="pl-9 bg-background/50 h-12" required />
                    </div>
                    <div className="space-y-2 relative">
                      <Lock className="w-4 h-4 absolute left-3 top-[38px] text-muted-foreground" />
                      <label className="text-sm font-medium flex justify-between">
                        Password
                        <a href="#" className="text-primary hover:underline text-xs">Forgot password?</a>
                      </label>
                      <Input type="password" placeholder="••••••••" className="pl-9 bg-background/50 h-12" required />
                    </div>

                    <Button type="submit" className="w-full h-12 text-md mt-4 shadow-lg shadow-primary/20 group">
                      Log In <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </form>

                  <div className="text-center text-sm text-muted-foreground">
                    Don't have an account?{' '}
                    <button onClick={() => setView('register')} className="text-primary font-semibold hover:underline">
                      Sign up
                    </button>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="register"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-6"
                >
                  <div>
                    <h2 className="text-3xl font-display font-bold">Create Account</h2>
                    <p className="text-muted-foreground mt-2">Join the Lametna community today.</p>
                  </div>

                  <form onSubmit={handleAuth} className="space-y-4">
                    <div className="space-y-2 relative">
                      <UserIcon className="w-4 h-4 absolute left-3 top-[38px] text-muted-foreground" />
                      <label className="text-sm font-medium">Username</label>
                      <Input type="text" placeholder="GamerTag" className="pl-9 bg-background/50 h-12" required />
                    </div>
                    <div className="space-y-2 relative">
                      <Mail className="w-4 h-4 absolute left-3 top-[38px] text-muted-foreground" />
                      <label className="text-sm font-medium">Email Address</label>
                      <Input type="email" placeholder="name@example.com" className="pl-9 bg-background/50 h-12" required />
                    </div>
                    <div className="space-y-2 relative">
                      <Lock className="w-4 h-4 absolute left-3 top-[38px] text-muted-foreground" />
                      <label className="text-sm font-medium">Password</label>
                      <Input type="password" placeholder="••••••••" className="pl-9 bg-background/50 h-12" required />
                    </div>

                    <Button type="submit" className="w-full h-12 text-md mt-4 shadow-lg shadow-primary/20 group">
                      Create Account <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </form>

                  <div className="text-center text-sm text-muted-foreground">
                    Already have an account?{' '}
                    <button onClick={() => setView('login')} className="text-primary font-semibold hover:underline">
                      Log in
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </motion.div>
      </div>
    </div>
  );
}
