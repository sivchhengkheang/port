import React, { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import { GAMES, Game } from "../constants";
import { AntigravityCard } from "../components/AntigravityCard";
import {
  X,
  Monitor,
  Download,
  Play,
  Cpu,
  Sparkles,
  Search,
  ChevronRight,
  ExternalLink,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRequireAuth } from "../hooks/useRequireAuth";
import GameNavbar from "@/components/GameNavbar";
import AuthModal from "@/components/AuthModal";

// All unique categories + "All"
const ALL_CATEGORIES = ["All", ...Array.from(new Set(GAMES.map((g) => g.category)))];

export default function GamePortal() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeGame, setActiveGame] = useState<Game | null>(null);
  const [isHoveringClose, setIsHoveringClose] = useState(false);
  const { requireAuth } = useRequireAuth();

  // Featured game = first in list
  const featuredGame = GAMES[0];

  const filteredGames = useMemo(() => {
    return GAMES.filter((game) => {
      const matchesCategory =
        activeCategory === "All" || game.category === activeCategory;
      const matchesSearch =
        game.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        game.category.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && activeGame) handleClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeGame]);

  const handlePlay = requireAuth((game: Game) => {
    setActiveGame(game);
    document.body.style.overflow = "hidden";
  });

  const handleClose = () => {
    setActiveGame(null);
    document.body.style.overflow = "auto";
  };

  const handleDownload = requireAuth((url: string) => {
    window.open(url, "_blank");
  });

  return (
    <div className="min-h-screen bg-background text-foreground relative overflow-x-hidden">
      <AuthModal />
      <GameNavbar />

      {/* ── Background ambient glows ── */}
      <div className="fixed inset-0 -z-10 pointer-events-none">
        <div className="absolute top-[-10%] right-[-5%] w-[60vw] h-[60vw] bg-primary/8 blur-[180px] rounded-full" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-secondary/5 blur-[140px] rounded-full" />
      </div>

      {/* ══════════════════════════════════════════════
          HERO SECTION — Featured Game Spotlight
      ══════════════════════════════════════════════ */}
      <section className="relative pt-28 pb-16 md:pt-36 md:pb-24 px-6 md:px-10 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          {/* Left — Hero Text */}
          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="flex items-center gap-3"
            >
              <span className="w-8 h-[1px] bg-primary/50" />
              <span className="font-mono text-[10px] font-bold uppercase tracking-[0.4em] text-primary">
                PORT — Game Vault
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.1 }}
              className="text-5xl md:text-7xl font-display font-medium tracking-tighter leading-none text-gradient uppercase"
            >
              PORT{" "}
              <span className="italic font-bold">
                GAMES.
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.25 }}
              className="text-base md:text-lg text-muted-foreground font-sans italic leading-relaxed border-l-2 border-primary/20 pl-5 max-w-md"
            >
              "A collection of games I've created — giving you extra skills, computer thinking, and a fun time along the way."
            </motion.p>

            {/* Stats Row */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.35 }}
              className="flex items-center gap-8"
            >
              {[
                { label: "Games", value: GAMES.length },
                { label: "Categories", value: ALL_CATEGORIES.length - 1 },
                { label: "Free to Play", value: "100%" },
              ].map((stat) => (
                <div key={stat.label} className="space-y-1">
                  <div className="text-2xl font-display font-bold text-foreground">
                    {stat.value}
                  </div>
                  <div className="font-mono text-[9px] uppercase tracking-widest text-muted-foreground">
                    {stat.label}
                  </div>
                </div>
              ))}
            </motion.div>

            {/* Featured Game CTA */}
            <motion.button
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.45 }}
              onClick={() => handlePlay(featuredGame)}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="group flex items-center gap-4 px-8 py-4 bg-primary text-primary-foreground rounded-2xl font-mono text-[11px] font-bold uppercase tracking-widest shadow-lg shadow-primary/30 hover:shadow-primary/40 hover:scale-103 transition-all duration-300"
            >
              <div className="w-8 h-8 bg-primary-foreground/10 rounded-full flex items-center justify-center">
                <Play size={14} className="fill-current translate-x-0.5" />
              </div>
              Play {featuredGame.title}
              <ChevronRight size={14} className="opacity-60 group-hover:translate-x-1 transition-transform duration-300" />
            </motion.button>
          </div>

          {/* Right — Featured Game Thumbnail */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, x: 30 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 1.1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="relative group cursor-pointer"
            onClick={() => handlePlay(featuredGame)}
          >
            {/* Glow behind image */}
            <div className="absolute -inset-4 bg-primary/10 blur-3xl rounded-[40px] opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

            <div className="relative overflow-hidden rounded-[32px] md:rounded-[40px] border border-border shadow-lg shadow-black/30 group-hover:border-primary/30 transition-all duration-500">
              <motion.img
                src={featuredGame.thumbnail}
                alt={featuredGame.title}
                className="w-full aspect-[16/10] object-cover"
                whileHover={{ scale: 1.04 }}
                transition={{ duration: 0.8, ease: [0.33, 1, 0.68, 1] }}
              />
              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent" />

              {/* Play button center overlay */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-400">
                <div className="w-16 h-16 glass-panel rounded-full flex items-center justify-center shadow-2xl">
                  <Play size={24} className="fill-primary text-primary translate-x-0.5" />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          DIVIDER
      ══════════════════════════════════════════════ */}
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent" />
      </div>

      {/* ══════════════════════════════════════════════
          GAME LIBRARY SECTION
      ══════════════════════════════════════════════ */}
      <section className="pt-16 pb-24 px-6 md:px-10 max-w-7xl mx-auto">
        {/* Section header + controls */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="flex items-center gap-3 mb-2"
            >
              <Sparkles size={14} className="text-primary" />
              <span className="font-mono text-[10px] font-bold uppercase tracking-[0.4em] text-primary">
                Game Library
              </span>
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-3xl md:text-4xl font-display font-medium tracking-tight"
            >
              All Games
            </motion.h2>
          </div>

          {/* Search */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            // transition={{ duration: 0.6 }}
            className="relative w-full md:w-72"
          >
            <Search size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground/30 z-10" />
            <input
              type="text"
              placeholder="Search games..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-11 pl-10 pr-4 glass-panel rounded-2xl font-sans text-sm placeholder:text-muted-foreground/50 bg-transparent outline-none focus:border-primary/40 transition-all duration-300"
            />
          </motion.div>
        </div>

        {/* Category Filter Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="flex flex-wrap gap-2 mb-10"
        >
          {ALL_CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2 rounded-full font-mono text-[10px] font-bold uppercase tracking-widest transition-all duration-300 ${activeCategory === cat
                ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20"
                : "glass-panel text-muted-foreground hover:text-foreground hover:border-primary/20"
                }`}
            >
              {cat}
            </button>
          ))}
        </motion.div>

        {/* Games Grid */}
        <AnimatePresence mode="popLayout">
          {filteredGames.length > 0 ? (
            <div
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
            >
              {filteredGames.map((game, idx) => (
                <AntigravityCard
                  key={game.id}
                  game={game}
                  index={idx}
                  onPlay={handlePlay}
                  onDownload={handleDownload}
                />
              ))}
            </div>
          ) : (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center py-40 glass-panel rounded-[40px]"
            >
              <Cpu size={56} className="text-primary/20 mx-auto mb-6 animate-pulse" />
              <p className="text-muted-foreground font-sans italic text-xl">
                Terminal error: No games found matching your query.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      {/* ══════════════════════════════════════════════
          FOOTER BRANDING
      ══════════════════════════════════════════════ */}
      <footer className="border-t border-white/5 py-10 flex flex-col items-center gap-4">
        <Sparkles className="w-5 h-5 text-primary animate-pulse" />
        <p className="font-mono text-[9px] font-bold tracking-[1em] uppercase text-muted-foreground/30">
          PORT // GAME VAULT // 2026
        </p>
      </footer>

      {/* ══════════════════════════════════════════════
          GAME FULLSCREEN OVERLAY
      ══════════════════════════════════════════════ */}
      <AnimatePresence>
        {activeGame && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-background/95 backdrop-blur-[60px] flex flex-col"
          >
            {/* Hover zone for close button */}
            <div
              className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-16 z-[110] flex justify-center items-start pt-4 pointer-events-none"
              onMouseEnter={() => setIsHoveringClose(true)}
              onMouseLeave={() => setIsHoveringClose(false)}
            >
              <div className="absolute inset-0 pointer-events-auto rounded-b-3xl" />
              <motion.button
                onClick={handleClose}
                animate={{
                  opacity: isHoveringClose ? 1 : 0,
                  y: isHoveringClose ? 0 : -15,
                  scale: isHoveringClose ? 1 : 0.8,
                }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="relative z-[120] pointer-events-auto w-12 h-12 rounded-full glass-panel flex items-center justify-center text-foreground hover:text-primary hover:border-primary/40 transition-colors shadow-2xl shadow-black/50"
              >
                <X className="w-5 h-5" />
              </motion.button>
            </div>

            {/* iFrame */}
            <div className="flex-1 relative flex items-center justify-center">
              <motion.div
                initial={{ scale: 0.95, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="w-full h-full glass-panel overflow-hidden shadow-[0_64px_128px_-16px_rgba(0,0,0,0.6)] relative rounded-[12px] md:rounded-[24px]"
              >
                <iframe
                  src={activeGame.iframeUrl}
                  className="w-full h-full border-none"
                  title={activeGame.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </motion.div>
            </div>

            {/* Overlay Footer bar */}
            <div className="relative h-10 glass-panel border-t border-white/5 px-8 flex items-center justify-between bg-background/60 backdrop-blur-xs">
              <div className="flex items-center gap-3 text-[8px] font-mono font-bold  tracking-widest text-primary">
                <Monitor className="w-4 h-4" />
                <span className="hidden sm:block ">Press <em className="text-primary font-bold text-[10px]">ESC</em> to close the game</span>
              </div>

              <div className="flex items-center gap-3">
                <a
                  href={activeGame.iframeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="h-7 px-4 rounded-full border border-primary/20 hover:bg-primary/10 text-primary font-mono text-[8px] font-bold tracking-widest uppercase transition-all flex items-center gap-2"
                  title="Open in Browser"
                >
                  <ExternalLink className="w-3 h-3" />
                  <span className="hidden md:block">Open in Browser</span>
                </a>

                <div className="h-5 w-px bg-white/10 hidden md:block" />

                <Button
                  onClick={() => handleDownload(activeGame.appImageUrl)}
                  variant="outline"
                  className="h-7 px-4 rounded-full border-primary/20 hover:bg-primary/10 text-primary font-mono text-[8px] font-bold tracking-widest uppercase transition-all flex items-center gap-2"
                >
                  <Download className="w-3 h-3" />
                  <span className="hidden md:block">Download (.AppImage)</span>
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div >
  );
}
