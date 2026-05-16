import React from "react";
import { motion } from "motion/react";
import { Game } from "../constants";
import { Play, Download, Cpu, ExternalLink } from "lucide-react";
import { useRequireAuth } from "../hooks/useRequireAuth";

export function AntigravityCard({
  game,
  index,
  onPlay,
  onDownload,
}: {
  game: Game;
  index: number;
  onPlay: (game: Game) => void;
  onDownload: (url: string) => void;
}) {
  const { requireAuth } = useRequireAuth();

  const protectedOnPlay = requireAuth(onPlay);
  const protectedOnDownload = requireAuth(onDownload);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{
        duration: 0.8,
        delay: index * 0.05,
        ease: [0.22, 1, 0.36, 1]
      }}
      className="relative w-full group"
    >
      <motion.div
        whileHover={{ y: -10 }}
        transition={{ duration: 0.5, ease: [0.33, 1, 0.68, 1] }}
        className="relative h-full flex flex-col bg-white/50 dark:bg-white/5 backdrop-blur-2xl rounded-[32px] md:rounded-[40px] border border-border shadow-sm hover:shadow-xl hover:border-primary/20 transition-all duration-500 overflow-hidden cursor-pointer"
        onClick={() => protectedOnPlay(game)}
      >
        {/* Glow Effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />

        {/* Thumbnail Wrapper */}
        <div className="relative aspect-[16/10] overflow-hidden">


          <motion.img
            src={game.thumbnail}
            alt={game.title}
            className="w-full h-full object-cover group-hover:opacity-100 transition-all duration-1000"
            whileHover={{ scale: 1.05 }}
          />

          {/* Restored Pronounced Gradient Overlay */}
          {/* <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent opacity-80 group-hover:opacity-40 transition-opacity duration-700" /> */}


          {/* Category Tag */}

        </div>

        {/* Content Section */}
        <div className="p-6 md:p-8 flex flex-col gap-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">

              <h3 className="text-2xl md:text-3xl font-display font-medium tracking-tight text-foreground group-hover:text-primary transition-colors duration-500">
                {game.title}
              </h3>
              <div className="flex items-center gap-2 px-3 py-1.5 glass-panel rounded-full border-white/10 backdrop-blur-md">
                <span className="font-mono text-[8px] font-bold uppercase tracking-widest text-primary/80">
                  {game.category}
                </span>
              </div>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed italic line-clamp-3 font-sans opacity-70 group-hover:opacity-100 transition-opacity">
              "{game.description}"
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={(e) => {
                e.stopPropagation();
                protectedOnPlay(game);
              }}
              className="flex-1 h-12 bg-primary/10 hover:bg-primary text-primary hover:text-background rounded-2xl flex items-center justify-center gap-3 transition-all duration-500 group/btn overflow-hidden relative"
            >
              <motion.div
                className="flex items-center gap-3"
                whileHover={{ x: 3 }}
                transition={{ duration: 0.3 }}
              >
                <Play size={14} className="fill-current" />
                <span className="font-mono text-[10px] font-bold uppercase tracking-widest">Play</span>
              </motion.div>
            </button>

            <a
              href={game.iframeUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="w-12 h-12 glass-panel rounded-2xl flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/30 transition-all duration-500"
              title="Open in Browser"
            >
              <ExternalLink size={16} />
            </a>

            {/* <button
              onClick={(e) => {
                e.stopPropagation();
                protectedOnDownload(game.appImageUrl);
              }}
              className="w-12 h-12 glass-panel rounded-2xl flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/30 transition-all duration-500"
              title="Download Build"
            >
              <Download size={16} />
            </button> */}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
