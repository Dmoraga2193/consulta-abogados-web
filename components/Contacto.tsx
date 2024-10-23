"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Mail, Phone, MapPin } from "lucide-react";
import Image from "next/image";

export default function Contacto() {
  return (
    <section
      className="py-20 bg-gradient-to-r from-primary/10 to-secondary/10 relative overflow-hidden min-h-screen flex items-center"
      id="contacto"
    >
      <motion.div
        className="absolute inset-0 z-0"
        animate={{
          backgroundPosition: ["0% 0%", "100% 100%"],
        }}
        transition={{
          duration: 20,
          ease: "linear",
          repeat: Infinity,
          repeatType: "reverse",
        }}
        style={{
          backgroundImage:
            "linear-gradient(45deg, hsl(var(--primary)) 25%, transparent 25%, transparent 50%, hsl(var(--primary)) 50%, hsl(var(--primary)) 75%, transparent 75%, transparent 100%)",
          backgroundSize: "60px 60px",
          opacity: 0.05,
        }}
      />
      <div className="container mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.h2
          className="text-5xl font-bold text-center mb-16 text-foreground"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Contáctanos
        </motion.h2>
        <Card className="shadow-xl overflow-hidden">
          <CardContent className="p-0 grid grid-cols-1 lg:grid-cols-2">
            <motion.div
              className="p-8"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <CardTitle className="text-2xl mb-6">
                Formulario de Contacto
              </CardTitle>
              <form className="space-y-4">
                <Input
                  placeholder="Nombre y Apellido"
                  className="bg-background/50 backdrop-blur-sm"
                />
                <Input
                  placeholder="RUT"
                  className="bg-background/50 backdrop-blur-sm"
                />
                <Input
                  placeholder="Teléfono"
                  className="bg-background/50 backdrop-blur-sm"
                />
                <Input
                  placeholder="Email"
                  type="email"
                  className="bg-background/50 backdrop-blur-sm"
                />
                <Input
                  placeholder="Empresa u Organización"
                  className="bg-background/50 backdrop-blur-sm"
                />
                <Textarea
                  placeholder="Mensaje"
                  className="bg-background/50 backdrop-blur-sm"
                />
                <Button type="submit" className="w-full">
                  Enviar
                </Button>
              </form>
            </motion.div>
            <motion.div
              className="bg-primary/10 p-8 flex flex-col justify-between"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <Image
                src="/assets/images/contacto.png"
                alt="Contacto"
                width={400}
                height={300}
                className="rounded-lg mb-8"
              />
              <div className="space-y-6">
                {[
                  {
                    icon: Mail,
                    title: "Email",
                    content: "contacto@legalchile.cl",
                  },
                  {
                    icon: Phone,
                    title: "Teléfono",
                    content: "+56 2 2345 6789",
                  },
                  {
                    icon: MapPin,
                    title: "Dirección",
                    content: "Av. Libertador Bernardo O'Higgins 1234, Santiago",
                  },
                ].map((item, index) => (
                  <div key={index} className="flex items-center space-x-4">
                    <item.icon className="h-8 w-8 text-primary" />
                    <div>
                      <h3 className="text-lg font-semibold">{item.title}</h3>
                      <p className="text-muted-foreground">{item.content}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
