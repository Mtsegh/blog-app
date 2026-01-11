import { motion } from "framer-motion";

export default function HeartBurst({ burstKey }) {
  return (
    <>
      {[0, 1, 2].map((i) => {
        const x = Math.random() * 40 - 20; // left/right drift
        const y = -60 - Math.random() * 20; // upward
        const size = Math.random() * 6 + 14; // size variation

        return (
          <motion.span
            key={`${burstKey+10}-${i}`} // 🔥 re-mount per click
            initial={{ scale: 0, opacity: 1, x: 0, y: 0 }}
            animate={{
              scale: [1, 1.4, 1],
              opacity: [1, 0],
              x,
              y,
              rotate: Math.random() * 20 - 10,
            }}
            style={{ fontSize: size }}
            transition={{
              duration: 0.6,
              ease: "easeOut",
              delay: i * 0.05, // stagger for beauty
            }}
            className="absolute text-red-500 pointer-events-none"
          >
            ❤
          </motion.span>
        );
      })}
    </>
  );
}
