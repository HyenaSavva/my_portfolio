import type { FC } from "react";
import { useEffect } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "@/shared/lib";
import { Image } from "../image/image";
import { Video } from "../video/video";

interface MediaModalProps {
  media: MediaItem | null;
  onClose: () => void;
}

export const MediaModal: FC<MediaModalProps> = ({ media, onClose }) => {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    if (media) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleEscape);
    }

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleEscape);
    };
  }, [media, onClose]);

  return createPortal(
    <AnimatePresence>
      {media && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-(--z-modal) flex items-center justify-center p-2 sm:p-6"
          onClick={onClose}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/90 backdrop-blur-sm" />

          {/* Close button */}
          <button
            onClick={onClose}
            className={cn(
              "absolute top-4 right-4 z-10 p-2",
              "bg-white/10 hover:bg-white/20 rounded-full",
              "text-white/70 hover:text-white transition-colors",
            )}
          >
            <CloseIcon />
          </button>

          {/* Content */}
          <motion.div
            initial={{ scale: 0.95 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="relative max-w-6xl w-full max-h-[95vh]"
            onClick={(e) => e.stopPropagation()}
          >
            {media.type === "video" ? (
              <Video src={media.src} className="rounded-xl" modal />
            ) : (
              <Image src={media.src} className="rounded-xl" modal />
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
};

const CloseIcon = () => (
  <svg className="size-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
  </svg>
);
