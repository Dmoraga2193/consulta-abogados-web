"use client";

import { motion } from "framer-motion";
import { Users, MapPin, ThumbsUp, BarChart, Zap } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const stats = [
  {
    title: "25",
    subtitle: "años de experiencia",
    icon: Users,
    description: "Más de dos décadas brindando servicios legales de calidad.",
  },
  {
    title: "Cobertura",
    subtitle: "en todo Chile",
    icon: MapPin,
    description:
      "Presencia en todas las regiones del país para atender tus necesidades legales.",
  },
  {
    title: "200.000",
    subtitle: "clientes satisfechos",
    icon: ThumbsUp,
    description:
      "Miles de clientes confían en nuestros servicios y experiencia.",
  },
  {
    title: "1.500.000",
    subtitle: "clientes totales",
    icon: BarChart,
    description:
      "Una gran comunidad que respalda nuestra trayectoria y calidad.",
  },
  {
    title: "Pioneros",
    subtitle: "en servicios legales online",
    icon: Zap,
    description:
      "Innovamos constantemente para ofrecerte soluciones legales modernas y eficientes.",
  },
];

export default function PorQueConfiar() {
  return (
    <section className="bg-secondary py-20">
      <div className="container mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <motion.h2
          className="text-4xl font-bold mb-12 text-center text-foreground"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Nosotros
        </motion.h2>
        <Accordion type="single" collapsible className="w-full">
          {stats.map((stat, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger>
                <div className="flex items-center">
                  <div className="bg-primary text-primary-foreground rounded-full p-3 mr-4">
                    {stat.icon && <stat.icon size={24} />}
                  </div>
                  <div className="text-left">
                    <h3 className="text-xl font-bold">{stat.title}</h3>
                    <p className="text-muted-foreground">{stat.subtitle}</p>
                  </div>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <p className="text-muted-foreground pl-16">
                  {stat.description}
                </p>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
