"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useTheme } from "next-themes";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Menu, X, Sun, Moon } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { name: "Inicio", href: "#inicio" },
  { name: "Servicios", href: "#servicios" },
  { name: "Nosotros", href: "#nosotros" },
  { name: "Contacto", href: "#contacto" },
];

export default function CombinedNavbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeItem, setActiveItem] = useState("Inicio");
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled
          ? "bg-background/60 backdrop-blur-sm shadow-md h-16"
          : "bg-transparent h-20"
      )}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
        <div className="flex items-center justify-between h-full">
          <Link href="/" className="flex items-center">
            <Image
              src="/assets/images/adaptive-icon.png"
              alt="Logo de Consultas Legales"
              width={isScrolled ? 40 : 50}
              height={isScrolled ? 40 : 50}
              className="mr-2 transition-all duration-300"
            />
            <span
              className={cn(
                "font-bold transition-all duration-300",
                isScrolled ? "text-foreground text-xl" : "text-primary text-2xl"
              )}
            >
              Consultas Legales
            </span>
          </Link>
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <div key={item.name} className="relative">
                <Link
                  href={item.href}
                  className={cn(
                    "px-3 py-2 rounded-md font-medium transition-all duration-300",
                    isScrolled
                      ? "text-foreground hover:text-primary text-sm"
                      : "text-primary hover:text-accent text-base"
                  )}
                  onMouseEnter={() => setActiveItem(item.name)}
                  onClick={() => setActiveItem(item.name)}
                >
                  {item.name}
                </Link>
                {activeItem === item.name && (
                  <motion.div
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
                    layoutId="underline"
                  />
                )}
              </div>
            ))}
          </div>
          <div className="flex items-center space-x-3">
            {mounted && (
              <button
                onClick={() => setTheme(theme === "light" ? "dark" : "light")}
                className="w-12 h-6 rounded-full bg-secondary relative transition-colors duration-500 ease-in focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                aria-label="Toggle theme"
              >
                <div className="flex items-center justify-between p-1">
                  <Sun className="h-4 w-4 text-yellow-500" />
                  <Moon className="h-4 w-4 text-blue-500" />
                </div>
                <div
                  className={`absolute top-0.5 left-0.5 bg-background w-5 h-5 rounded-full transition-transform duration-500 ease-in-out ${
                    theme === "dark" ? "transform translate-x-6" : ""
                  }`}
                />
              </button>
            )}
            <div className="md:hidden">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsOpen(!isOpen)}
                className={cn(
                  "transition-colors duration-300",
                  isScrolled ? "text-foreground" : "text-primary"
                )}
                aria-label="Toggle menu"
              >
                {isOpen ? (
                  <X className="block h-6 w-6" aria-hidden="true" />
                ) : (
                  <Menu className="block h-6 w-6" aria-hidden="true" />
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-background/95 backdrop-blur-sm">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="block px-3 py-2 rounded-md text-base font-medium text-foreground hover:bg-secondary hover:text-primary"
                onClick={() => {
                  setIsOpen(false);
                  setActiveItem(item.name);
                }}
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </motion.nav>
  );
}
