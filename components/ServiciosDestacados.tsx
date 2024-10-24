"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { motion } from "framer-motion";
import { useState } from "react";
import CategoryForm from "./CategoryForm";
import { ChevronRight } from "lucide-react";

type Topic = {
  id: string;
  name: string;
  basePrice: number;
};

type Category = {
  id: string;
  title: string;
  image: string;
  description: string;
  topics: Topic[];
};

const categories: Category[] = [
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

export default function ServiciosDestacadosImproved() {
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null
  );

  return (
    <section className="py-24 bg-background" id="servicios">
      <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <motion.h2
          className="text-5xl font-bold text-center mb-16 text-foreground tracking-tight"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Servicios Legales Profesionales
        </motion.h2>
        <Card className="mb-12">
          <CardHeader className="space-y-4">
            <CardTitle className="text-3xl font-semibold">
              Asesoría Legal Integral
            </CardTitle>
            <CardDescription className="text-lg leading-relaxed">
              Ofrecemos servicios legales especializados en las áreas más
              demandadas del derecho. Nuestro equipo de abogados expertos está
              listo para brindarle la mejor asesoría y representación legal en
              asuntos civiles, familiares y laborales.
            </CardDescription>
          </CardHeader>
          <CardContent>
            {!selectedCategory ? (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {categories.map((category, index) => (
                  <motion.div
                    key={category.id}
                    className="bg-card rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300 flex flex-col h-full"
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
                    <div className="p-6 flex flex-col flex-grow space-y-4">
                      <h3 className="text-2xl font-semibold">
                        {category.title}
                      </h3>
                      <p className="text-muted-foreground text-base leading-relaxed">
                        {category.description}
                      </p>
                      <ul className="space-y-2 mt-2">
                        {category.topics.map((topic) => (
                          <li
                            key={topic.id}
                            className="flex items-center text-sm"
                          >
                            <ChevronRight className="mr-2 h-4 w-4 text-primary" />
                            <span className="text-base">{topic.name}</span>
                          </li>
                        ))}
                      </ul>
                      <div className="mt-auto pt-4">
                        <Button
                          className="w-full text-base py-5"
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
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
