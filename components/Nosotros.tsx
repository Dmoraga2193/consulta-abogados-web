"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

interface FlipCardProps {
  frontText: string;
  backImage: string;
}

const FlipCard: React.FC<FlipCardProps> = ({ frontText, backImage }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className="w-64 h-64 relative overflow-hidden rounded-lg shadow-md cursor-pointer bg-card"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <motion.div
        className="absolute inset-0 flex items-center justify-center p-6"
        animate={{ opacity: isHovered ? 0 : 1 }}
        transition={{ duration: 0.3 }}
      >
        <p className="text-xl font-bold text-card-foreground text-center">
          {frontText}
        </p>
      </motion.div>
      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: isHovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      >
        <Image src={backImage} alt="Back" layout="fill" objectFit="cover" />
      </motion.div>
    </motion.div>
  );
};

export default function Nosotros() {
  const items = [
    {
      frontText: "25 años de experiencia",
      backImage: "/assets/images/experiencia.png",
    },
    {
      frontText: "Cobertura en todo Chile",
      backImage: "/assets/images/chile.png",
    },
    {
      frontText: "150,000 causas resueltas",
      backImage: "/assets/images/resultados.png",
    },
    {
      frontText: "1,500,000 clientes",
      backImage: "/assets/images/clientes.png",
    },
    {
      frontText: "Pioneros en servicios legales Online",
      backImage: "/assets/images/serviciosonline.png",
    },
  ];

  return (
    <section className="flex flex-col items-center py-8 bg-background">
      <h2 className="text-4xl font-bold text-foreground mb-12">
        Por qué confiar en nosotros
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
        {items.map((item, index) => (
          <FlipCard
            key={index}
            frontText={item.frontText}
            backImage={item.backImage}
          />
        ))}
      </div>
    </section>
  );
}
