"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useState } from "react";
import CategoryForm from "./CategoryForm";

const categories = [
  {
    id: "civil",
    title: "Derecho Civil",
    image: "/assets/images/categoria_civil.png",
    description: "Asesoría en contratos, propiedad y obligaciones civiles.",
    topics: [
      { id: "contratos", name: "Contratos", basePrice: 50000 },
      { id: "propiedad", name: "Propiedad", basePrice: 60000 },
      { id: "obligaciones", name: "Obligaciones", basePrice: 55000 },
    ],
  },
  {
    id: "familiar",
    title: "Derecho Familiar",
    image: "/assets/images/categoria_familiar.png",
    description: "Apoyo en divorcios, custodia y pensiones alimenticias.",
    topics: [
      { id: "divorcio", name: "Divorcio", basePrice: 100000 },
      { id: "custodia", name: "Custodia", basePrice: 80000 },
      { id: "pension", name: "Pensión Alimenticia", basePrice: 70000 },
    ],
  },
  {
    id: "laboral",
    title: "Derecho Laboral",
    image: "/assets/images/categoria_laboral.png",
    description: "Asistencia en despidos, contratos laborales y acoso laboral.",
    topics: [
      { id: "despidos", name: "Despidos", basePrice: 75000 },
      {
        id: "contratos_laborales",
        name: "Contratos Laborales",
        basePrice: 65000,
      },
      { id: "acoso_laboral", name: "Acoso Laboral", basePrice: 85000 },
    ],
  },
];

export default function ServiciosDestacados() {
  const [selectedCategory, setSelectedCategory] = useState(null);

  return (
    <section className="py-20 bg-background" id="servicios">
      <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <motion.h2
          className="text-4xl font-bold text-center mb-12 text-foreground"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Categorías Legales
        </motion.h2>
        {!selectedCategory ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {categories.map((category, index) => (
              <motion.div
                key={category.id}
                className="bg-card rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={category.image}
                    alt={category.title}
                    fill
                    style={{ objectFit: "cover" }}
                    className="transform hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <div className="p-6 space-y-4">
                  <h3 className="text-2xl font-semibold">{category.title}</h3>
                  <p className="text-muted-foreground">
                    {category.description}
                  </p>
                  <ul className="list-disc list-inside text-muted-foreground">
                    {category.topics.map((topic) => (
                      <li key={topic.id}>{topic.name}</li>
                    ))}
                  </ul>
                  <div className="flex space-x-4">
                    <Button
                      className="w-full"
                      onClick={() => setSelectedCategory(category)}
                    >
                      Consultar
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <CategoryForm
            category={selectedCategory}
            onBack={() => setSelectedCategory(null)}
          />
        )}
      </div>
    </section>
  );
}
