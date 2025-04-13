'use client'
import { motion, useAnimation } from "framer-motion";
import { useEffect, useRef, useState } from "react";

interface QuestionType {
  options: string[]; // Assuming options is an array of strings
}

interface ScrollingOptionsProps {
  Question: QuestionType;
  handleMultipleChoiceClick: (option: string) => void;
}

function ScrollingOptions({ Question, handleMultipleChoiceClick }: ScrollingOptionsProps) {
  const [isHovered, setIsHovered] = useState(false);
  const controls = useAnimation();
  const containerRef = useRef<HTMLDivElement>(null);

  // Start the scrolling animation
  useEffect(() => {
    if (!isHovered) {
      controls.start({
        x: ["0%", "-100%"],
        transition: {
          x: {
            repeat: Infinity,
            repeatType: "loop",
            duration: 10,
            ease: "linear",
          },
        },
      });
    } else {
      controls.stop(); // Pause animation on hover
    }
  }, [isHovered, controls]);

  // Duplicate the options array to ensure seamless looping
  const options = Question.options || [];
  const duplicatedOptions = [...options, ...options, ...options, ...options, ...options];

  return (
    <div className="overflow-hidden w-full" ref={containerRef}>
      <motion.div
        className="flex space-x-4"
        animate={controls}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {duplicatedOptions.map((option, index) => (
          <motion.div
            key={index}
            className="flex-shrink-0 rounded-lg min-w-[150px] text-center"
          >
            <button
              key={option + index}
              className="border-primary-lite border-2 text-slate-800 font-semibold px-4 py-5 rounded-full"
              onClick={() => handleMultipleChoiceClick(option)}
            >
              {option}
            </button>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}

export default ScrollingOptions;