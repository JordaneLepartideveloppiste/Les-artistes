import { motion } from "framer-motion";

const Loader = () => {
  
  return (
    <div className="loader-page">
      <div className="loader">
        <motion.div
          className="loader_content content1"
          animate={{
            scale: [0, 12, 0, 4],
          }}
          transition={{
            repeat: Infinity,
            repeatType: "mirror",
            delay: 0,
            duration: 2.2,
          }}
        />
        <motion.div
          className="loader_content content2"
          animate={{
            scale: [0, 9, 0, 3],
          }}
          transition={{
            repeat: Infinity,
            repeatType: "mirror",
            delay: 0.2,
            duration: 2.3,
          }}
        />
        <motion.div
          className="loader_content content3"
          animate={{
            scale: [0, 7, 0, 4],
          }}
          transition={{
            repeat: Infinity,
            repeatType: "mirror",
            delay: 0.4,
            duration: 2.1,
          }}
        />
        <motion.div
          className="loader_content content4"
          animate={{
            scale: [0, 11, 0, 5],
          }}
          transition={{
            repeat: Infinity,
            repeatType: "mirror",
            delay: 0.6,
            duration: 2,
          }}
        />
        <motion.div
          className="loader_content content5"
          animate={{
            scale: [0, 9, 0, 4],
          }}
          transition={{
            repeat: Infinity,
            repeatType: "mirror",
            delay: 0.8,
            duration: 2.1,
          }}
        />
       </div>
    </div>
  );
};

export default Loader;
