"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const sections = [
  {
    id: "productos-pyme",
    title: "Productos Pyme",
    description:
      "Cuenta con un nuevo socio para tu empresa, con nuestros planes especialmente pensados para pequeñas y medianas empresas.",
    image: "/assets/images/pyme.png",
  },
  {
    id: "juicio-arriendo",
    title: "Juicio de arriendo",
    description:
      "¿Tu arrendatario no te pagó? Deja tu juicio de arriendo en manos de expertos. ¡Revisa cómo funciona!",
    image: "/assets/images/juicioarriendo.png",
  },
  {
    id: "posesion-efectiva",
    title: "Posesión efectiva",
    description:
      "Despreocúpate y sólo envíanos información básica para que podamos tramitar la posesión efectiva que necesitas realizar",
    image: "/assets/images/posesionefectiva.png",
  },
];

export default function ProductosPyme() {
  const [activeSection, setActiveSection] = useState(sections[0].id);

  return (
    <div className="w-full max-w-4xl mx-auto p-4">
      <Card className="overflow-hidden">
        <CardContent className="p-0">
          <AnimatePresence mode="wait">
            {sections.map(
              (section) =>
                section.id === activeSection && (
                  <motion.div
                    key={section.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                    className="flex flex-col md:flex-row items-center"
                  >
                    <div className="md:w-1/2 p-6">
                      <Image
                        src={section.image}
                        alt={section.title}
                        width={400}
                        height={300}
                        className="rounded-lg"
                      />
                    </div>
                    <div className="md:w-1/2 p-6">
                      <h2 className="text-2xl font-bold mb-4 text-primary">
                        {section.title}
                      </h2>
                      <p className="text-muted-foreground mb-6">
                        {section.description}
                      </p>
                      <Button>Ver más</Button>
                    </div>
                  </motion.div>
                )
            )}
          </AnimatePresence>
        </CardContent>
      </Card>
      <div className="flex justify-center mt-4">
        {sections.map((section) => (
          <Button
            key={section.id}
            variant={activeSection === section.id ? "default" : "outline"}
            className="mx-1"
            onClick={() => setActiveSection(section.id)}
          >
            {section.title}
          </Button>
        ))}
      </div>
    </div>
  );
}
