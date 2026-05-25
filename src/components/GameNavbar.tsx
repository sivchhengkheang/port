import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Gamepad2, ShieldCheck, LogOut, Command, LogIn } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { cn } from "@/lib/utils";
import logo from "../../public/port.png"


export default function GameNavbar() {
  const { user, signOut, openAuthModal } = useAuth();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
        scrolled
          ? "bg-background/80 backdrop-blur-2xl border-b border-white/5 shadow-lg shadow-black/10 mt-2 mx-2  rounded-3xl "
          : "bg-transparent"
      )}
    >
      <div className="max-w-[1536px] mx-auto px-6 md:px-10 h-16 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl flex items-center justify-center  bg-primary/90">
            <img src={logo} alt="Logo" className="w-full h-full rounded-xl" />
          </div>
          <div className="flex flex-col leading-none">
            <span className="font-serif font-bold text-2xl tracking-wide text-primary text-gradient ">GAME</span>
          </div>
        </div>

        {/* Right: Auth */}
        <AnimatePresence mode="wait">
          {user ? (
            <motion.div
              key="user"
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              className="flex items-center gap-3"
            >
              <div className="hidden md:flex items-center gap-3 px-4 py-2 glass-panel rounded-full">
                <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-[10px]">
                  {user.firstName[0]}
                </div>
                <span className="font-sans font-medium text-sm hidden sm:block">
                  {user.firstName}
                </span>
              </div>
              <button
                onClick={() => signOut()}
                className="w-9 h-9 glass-panel rounded-full flex items-center justify-center text-muted-foreground hover:text-red-400 hover:border-red-400/20 transition-all duration-300"
                title="Sign Out"
              >
                <LogOut size={14} />
              </button>
            </motion.div>
          ) : (
            <motion.button
              key="login"
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              onClick={() => openAuthModal()}
              className="flex items-center gap-2 px-5 py-2.5 bg-primary text-primary-foreground rounded-full font-mono text-[10px] font-bold uppercase tracking-widest hover:scale-105 hover:shadow-lg hover:shadow-primary/20 transition-all duration-300"
            >
              <LogIn className="hidden sm:block" size={12} />
              <span className="">Login</span>
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
} 
