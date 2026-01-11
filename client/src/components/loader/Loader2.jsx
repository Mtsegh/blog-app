import { motion } from "framer-motion";

const Loader2 = () => {
  return (
    <div className="min-h-50 flex items-center justify-center">
      <div className="flex space-x-3">
        
        {/* Dot 1 */}
        <motion.span
          className="w-3 h-3 bg-black dark:bg-zinc-100 rounded-full"
          animate={{ opacity: [0.2, 1, 0.2] }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Dot 2 */}
        <motion.span
          className="w-3 h-3 bg-black dark:bg-zinc-100 rounded-full"
          animate={{ opacity: [0.2, 1, 0.2] }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.3,
          }}
        />

        {/* Dot 3 */}
        <motion.span
          className="w-3 h-3 bg-black dark:bg-zinc-100 rounded-full"
          animate={{ opacity: [0.2, 1, 0.2] }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.6,
          }}
        />

      </div>
    </div>
  );
};

export default Loader2;
