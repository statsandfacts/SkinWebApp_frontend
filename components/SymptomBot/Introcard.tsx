import React from "react";
import Image from "next/image";
import { Button } from "@heroui/button";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

type Props = {
  onStart: () => void;
};

const IntroScreen: React.FC<Props> = ({ onStart }) => {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center h-screen text-center px-4">
      <p className="text-lg md:text-xl font-medium mb-4">
        <span className="text-purple-600 font-bold">Dr. Avika</span> is here to
        assist you with your health concerns. <br />
        Can I ask you a few questions?
      </p>
      <div className="relative mb-6">
        {/* Simulated hand wave (whole image) */}
        <motion.div
          animate={{ rotate: [0, 5, -5, 5, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <Image
            src="/symptombot/symp_image.jpg"
            alt="Dr. Avika"
            width={200}
            height={200}
            className="rounded"
          />
        </motion.div>

        {/* Simulated mouth animation (tiny div on mouth area) */}
        

        {/* Speech bubble */}
        
      </div>

      <div className="flex gap-6">
        <Button
          onClick={onStart}
          className="bg-blue-600 text-white px-6 py-2 rounded-full shadow"
        >
          YES
        </Button>
        {/* <Button
          onClick={() => alert("Alright! Feel free to come back anytime.")}
          className="bg-blue-600 text-white px-6 py-2 rounded-full shadow"
        >
          NO
        </Button> */}
        <Button
          onClick={() => router.push("/")}
          className="bg-blue-600 text-white px-6 py-2 rounded-full shadow"
        >
          NO
        </Button>
      </div>
    </div>
  );
};

export default IntroScreen;
