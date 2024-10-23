"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const servicios = [
  {
    title: "Consulta legal",
    price: "$9.990",
    image: "/assets/images/consultalegal.png",
    description:
      "Asesoría legal personalizada para tus necesidades específicas.",
    features: [
      "30 minutos de consulta",
      "Respuestas a tus dudas legales",
      "Orientación profesional",
    ],
  },
  {
    title: "Contrato de arriendo Online",
    price: "$32.990",
    image: "/assets/images/contratoarriendo.png",
    description: "Genera tu contrato de arriendo de forma rápida y segura.",
    features: [
      "Contrato personalizado",
      "Revisión por abogados",
      "Firma electrónica incluida",
    ],
  },
  {
    title: "Divorcio mutuo acuerdo",
    price: "$239.990",
    image: "/assets/images/divorcio.png",
    description: "Proceso de divorcio simplificado y eficiente.",
    features: [
      "Asesoría completa",
      "Preparación de documentos",
      "Representación en tribunales",
    ],
  },
];

export default function ServiciosDestacados() {
  return (
    <section className="py-20 bg-background" id="servicios">
      <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <motion.h2
          className="text-4xl font-bold text-center mb-12 text-foreground"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Servicios Destacados
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {servicios.map((servicio, index) => (
            <motion.div
              key={index}
              className="bg-card rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={servicio.image}
                  alt={servicio.title}
                  fill
                  style={{ objectFit: "cover" }}
                  className="transform hover:scale-110 transition-transform duration-300"
                />
              </div>
              <div className="p-6 space-y-4">
                <h3 className="text-2xl font-semibold">{servicio.title}</h3>
                <p className="text-muted-foreground">{servicio.description}</p>
                <ul className="list-disc list-inside text-muted-foreground">
                  {servicio.features.map((feature, i) => (
                    <li key={i}>{feature}</li>
                  ))}
                </ul>
                <p className="text-3xl font-bold text-primary">
                  {servicio.price}
                </p>
                <div className="flex space-x-4">
                  <Button className="w-full">Contratar</Button>
                  <Button variant="outline" className="w-full">
                    Ver más
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
