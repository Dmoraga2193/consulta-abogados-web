"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  PhoneIcon,
  MenuIcon,
  Sun,
  Moon,
  Home,
  Users,
  ShoppingBag,
  FileText,
  Mail,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "next-themes";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { name: "Inicio", icon: Home },
    { name: "Nosotros", icon: Users },
    { name: "Productos", icon: ShoppingBag },
    { name: "Blog", icon: FileText },
    { name: "Contacto", icon: Mail },
  ];

  return (
    <motion.header
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-background/95 backdrop-blur-md shadow-sm"
          : "bg-transparent"
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Image
            src="/assets/images/adaptive-icon.png"
            alt="Logo"
            width={85}
            height={85}
            priority
            className="rounded-full"
          />
        </motion.div>
        <nav className="hidden md:flex space-x-8">
          {navItems.map((item) => (
            <motion.div
              key={item.name}
              whileHover={{ y: -2 }}
              className="group"
            >
              <Link
                href="#"
                className="text-muted-foreground hover:text-primary transition-colors flex flex-col items-center"
              >
                <motion.div
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.3 }}
                >
                  <item.icon className="h-5 w-5 mb-1 group-hover:text-primary" />
                </motion.div>
                <span className="text-xs">{item.name}</span>
              </Link>
            </motion.div>
          ))}
        </nav>
        <div className="flex items-center space-x-4">
          <motion.div
            className="hidden md:flex items-center space-x-2"
            whileHover={{ scale: 1.05 }}
          >
            <PhoneIcon className="text-primary" size={18} />
            <span className="text-sm text-foreground">22 3210000</span>
          </motion.div>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button variant="outline" className="hidden md:inline-flex">
              Iniciar sesión
            </Button>
          </motion.div>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button>Cotizar ahora</Button>
          </motion.div>
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={theme}
              initial={{ rotate: -180, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 180, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              >
                {mounted && theme === "dark" ? <Sun /> : <Moon />}
              </Button>
            </motion.div>
          </AnimatePresence>
          <motion.div
            className="md:hidden"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <MenuIcon className="text-foreground" size={24} />
          </motion.div>
        </div>
      </div>
    </motion.header>
  );
}
