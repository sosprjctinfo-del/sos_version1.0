import { motion, AnimatePresence } from "framer-motion";
import { AlertCircle, CheckCircle, Loader2, Info } from "lucide-react";

type StatusType = "info" | "success" | "error" | "loading";

interface StatusMessageProps {
  type: StatusType;
  message: string;
  visible: boolean;
}

const icons: Record<StatusType, React.ElementType> = {
  info: Info,
  success: CheckCircle,
  error: AlertCircle,
  loading: Loader2,
};

const styles: Record<StatusType, string> = {
  info: "bg-accent text-accent-foreground",
  success: "bg-success/10 text-success border border-success/20",
  error: "bg-primary/10 text-primary border border-primary/20",
  loading: "bg-accent text-accent-foreground",
};

const StatusMessage = ({ type, message, visible }: StatusMessageProps) => {
  const Icon = icons[type];

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium ${styles[type]}`}
        >
          <Icon className={`w-4 h-4 shrink-0 ${type === "loading" ? "animate-spin" : ""}`} />
          <span>{message}</span>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default StatusMessage;
