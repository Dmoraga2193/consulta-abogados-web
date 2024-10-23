import Hero from "@/components/Hero";
import ProductosPyme from "@/components/ProductosPyme";
import ServiciosDestacados from "@/components/ServiciosDestacados";
import PorQueConfiar from "@/components/PorQueConfiar";

import Contacto from "@/components/Contacto";

export default function Home() {
  return (
    <main className="flex-grow">
      <Hero />
      <ProductosPyme />
      <ServiciosDestacados />
      <PorQueConfiar />
      <Contacto />
    </main>
  );
}
