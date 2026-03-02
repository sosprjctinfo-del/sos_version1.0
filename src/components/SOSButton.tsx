import { motion } from "framer-motion";

interface SOSButtonProps {
  onClick: () => void;
  disabled?: boolean;
}

const SOSButton = ({ onClick, disabled }: SOSButtonProps) => {
  return (
    <div className="relative flex items-center justify-center">
      {/* Ripple rings */}
      <div className="absolute w-48 h-48 sm:w-56 sm:h-56 rounded-full sos-ripple" />

      <motion.button
        onClick={onClick}
        disabled={disabled}
        whileTap={{ scale: 0.92 }}
        whileHover={{ scale: 1.05 }}
        className="relative z-10 w-40 h-40 sm:w-48 sm:h-48 rounded-full bg-primary text-primary-foreground font-black text-4xl sm:text-5xl tracking-wider sos-pulse shadow-2xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed select-none"
      >
        SOS
      </motion.button>
    </div>
  );
};

export default SOSButton;
