"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { ChevronRight, MessageCircle, X, ArrowLeft } from "lucide-react";

type ChatItem = {
  id: string;
  text: string;
};

type Question = ChatItem & {
  options: string[];
  priceImpact: number[];
};

type Topic = ChatItem & {
  questions: Question[];
};

type Category = ChatItem & {
  topics: Topic[];
  basePrice: number;
};

const categories: Category[] = [
  {
    id: "civil",
    text: "Derecho Civil",
    basePrice: 50000,
    topics: [
      {
        id: "contratos",
        text: "Contratos",
        questions: [
          {
            id: "tipo-contrato",
            text: "¿Qué tipo de contrato necesita revisar o redactar?",
            options: [
              "Compraventa",
              "Arrendamiento",
              "Prestación de servicios",
              "Otro",
            ],
            priceImpact: [10000, 15000, 20000, 25000],
          },
          {
            id: "urgencia",
            text: "¿Cuál es la urgencia de su caso?",
            options: ["Baja", "Media", "Alta", "Muy alta"],
            priceImpact: [0, 5000, 10000, 20000],
          },
        ],
      },
      {
        id: "familia",
        text: "Derecho de Familia",
        questions: [
          {
            id: "tipo-caso",
            text: "¿Qué tipo de caso de familia necesita tratar?",
            options: [
              "Divorcio",
              "Pensión alimenticia",
              "Custodia de hijos",
              "Otro",
            ],
            priceImpact: [30000, 20000, 25000, 35000],
          },
          {
            id: "complejidad",
            text: "¿Cómo calificaría la complejidad de su caso?",
            options: ["Simple", "Moderado", "Complejo", "Muy complejo"],
            priceImpact: [0, 10000, 20000, 30000],
          },
        ],
      },
    ],
  },
  {
    id: "laboral",
    text: "Derecho Laboral",
    basePrice: 40000,
    topics: [
      {
        id: "despidos",
        text: "Despidos",
        questions: [
          {
            id: "tipo-despido",
            text: "¿Qué tipo de despido ha experimentado?",
            options: [
              "Despido injustificado",
              "Despido por necesidades de la empresa",
              "Renuncia forzada",
              "Otro",
            ],
            priceImpact: [15000, 10000, 20000, 25000],
          },
          {
            id: "tiempo-empresa",
            text: "¿Cuánto tiempo trabajó en la empresa?",
            options: [
              "Menos de 1 año",
              "1-5 años",
              "5-10 años",
              "Más de 10 años",
            ],
            priceImpact: [5000, 10000, 15000, 20000],
          },
        ],
      },
      {
        id: "acoso-laboral",
        text: "Acoso Laboral",
        questions: [
          {
            id: "tipo-acoso",
            text: "¿Qué tipo de acoso laboral ha experimentado?",
            options: ["Verbal", "Físico", "Psicológico", "Otro"],
            priceImpact: [15000, 25000, 20000, 30000],
          },
          {
            id: "duracion-acoso",
            text: "¿Por cuánto tiempo ha estado ocurriendo el acoso?",
            options: [
              "Menos de 1 mes",
              "1-6 meses",
              "6-12 meses",
              "Más de 1 año",
            ],
            priceImpact: [10000, 15000, 20000, 25000],
          },
        ],
      },
    ],
  },
  {
    id: "penal",
    text: "Derecho Penal",
    basePrice: 60000,
    topics: [
      {
        id: "delitos-contra-propiedad",
        text: "Delitos contra la propiedad",
        questions: [
          {
            id: "tipo-delito",
            text: "¿Qué tipo de delito contra la propiedad ha experimentado?",
            options: ["Robo", "Hurto", "Estafa", "Otro"],
            priceImpact: [20000, 15000, 25000, 30000],
          },
          {
            id: "valor-afectado",
            text: "¿Cuál es el valor aproximado de los bienes afectados?",
            options: [
              "Menos de $500.000",
              "$500.000 - $2.000.000",
              "$2.000.000 - $10.000.000",
              "Más de $10.000.000",
            ],
            priceImpact: [10000, 20000, 30000, 40000],
          },
        ],
      },
      {
        id: "delitos-contra-personas",
        text: "Delitos contra las personas",
        questions: [
          {
            id: "tipo-delito-persona",
            text: "¿Qué tipo de delito contra las personas ha experimentado?",
            options: ["Lesiones", "Amenazas", "Calumnias e injurias", "Otro"],
            priceImpact: [25000, 20000, 15000, 30000],
          },
          {
            id: "gravedad",
            text: "¿Cómo calificaría la gravedad del delito?",
            options: ["Leve", "Moderado", "Grave", "Muy grave"],
            priceImpact: [10000, 20000, 30000, 40000],
          },
        ],
      },
    ],
  },
];

export default function StructuredChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState<
    "category" | "topic" | "question" | "summary"
  >("category");
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null
  );
  const [selectedTopic, setSelectedTopic] = useState<Topic | null>(null);
  const [selectedAnswers, setSelectedAnswers] = useState<{
    [key: string]: string;
  }>({});
  const [totalPrice, setTotalPrice] = useState(0);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const resetChat = () => {
    setCurrentStep("category");
    setSelectedCategory(null);
    setSelectedTopic(null);
    setSelectedAnswers({});
    setTotalPrice(0);
  };

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
    transition: { duration: 0.3 },
  };

  const handleCategorySelect = (category: Category) => {
    setSelectedCategory(category);
    setCurrentStep("topic");
    setTotalPrice(category.basePrice);
  };

  const handleTopicSelect = (topic: Topic) => {
    setSelectedTopic(topic);
    setCurrentStep("question");
  };

  const handleAnswerSelect = (
    questionId: string,
    answer: string,
    priceImpact: number
  ) => {
    setSelectedAnswers({ ...selectedAnswers, [questionId]: answer });
    setTotalPrice((prevPrice) => prevPrice + priceImpact);
  };

  const handleFinish = () => {
    setCurrentStep("summary");
  };

  const handleBack = () => {
    switch (currentStep) {
      case "topic":
        setCurrentStep("category");
        setSelectedCategory(null);
        setTotalPrice(0);
        break;
      case "question":
        setCurrentStep("topic");
        setSelectedTopic(null);
        break;
      case "summary":
        setCurrentStep("question");
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [currentStep, selectedAnswers]);

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <AnimatePresence>
        {!isOpen && (
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            exit={{ scale: 0, rotate: 180 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
          >
            <Button
              onClick={() => setIsOpen(true)}
              className="rounded-full w-16 h-16 shadow-lg bg-primary hover:bg-primary/90 transition-colors duration-200"
            >
              <MessageCircle className="w-8 h-8" />
              <span className="sr-only">Abrir chat</span>
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3 }}
            className="absolute bottom-0 right-0"
          >
            <Card className="w-96 h-[32rem] shadow-xl overflow-hidden">
              <CardHeader className="p-4 bg-primary text-primary-foreground">
                <CardTitle className="text-lg flex justify-between items-center">
                  {currentStep !== "category" && (
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={handleBack}
                      className="rounded-full w-8 h-8 bg-transparent hover:bg-primary-foreground/20 transition-colors duration-200"
                    >
                      <ArrowLeft className="w-5 h-5" />
                      <span className="sr-only  ">Volver</span>
                    </Button>
                  )}
                  Cotizador Legal
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setIsOpen(false)}
                    className="rounded-full w-8 h-8 bg-transparent hover:bg-primary-foreground/20 transition-colors duration-200"
                  >
                    <X className="w-5 h-5" />
                    <span className="sr-only">Cerrar chat</span>
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <ScrollArea className="h-[calc(32rem-8rem)] w-full">
                  <div className="p-4">
                    <AnimatePresence mode="wait">
                      {currentStep === "category" && (
                        <motion.div key="category" {...fadeInUp}>
                          <h3 className="text-lg font-semibold mb-4">
                            Seleccione el área legal de su consulta:
                          </h3>
                          <div className="grid grid-cols-2 gap-2">
                            {categories.map((category) => (
                              <motion.div
                                key={category.id}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                              >
                                <Button
                                  onClick={() => handleCategorySelect(category)}
                                  className="w-full h-full py-4 px-2 flex flex-col items-center justify-center text-center"
                                  variant="outline"
                                >
                                  <span className="text-lg mb-2">
                                    {category.text}
                                  </span>
                                  <span className="text-sm text-muted-foreground">
                                    Desde $
                                    {category.basePrice.toLocaleString("es-CL")}
                                  </span>
                                </Button>
                              </motion.div>
                            ))}
                          </div>
                        </motion.div>
                      )}
                      {currentStep === "topic" && selectedCategory && (
                        <motion.div key="topic" {...fadeInUp}>
                          <h3 className="text-lg font-semibold mb-4">
                            Seleccione el tema específico de{" "}
                            {selectedCategory.text}:
                          </h3>
                          <div className="space-y-2">
                            {selectedCategory.topics.map((topic) => (
                              <motion.div
                                key={topic.id}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                              >
                                <Button
                                  onClick={() => handleTopicSelect(topic)}
                                  className="w-full justify-between group hover:bg-primary-foreground/70 transition-colors duration-200"
                                  variant="outline"
                                >
                                  {topic.text}
                                  <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                                </Button>
                              </motion.div>
                            ))}
                          </div>
                        </motion.div>
                      )}
                      {currentStep === "question" && selectedTopic && (
                        <motion.div key="question" {...fadeInUp}>
                          <h3 className="text-lg font-semibold mb-4">
                            Por favor, responda las siguientes preguntas:
                          </h3>
                          {selectedTopic.questions.map((question) => (
                            <div key={question.id} className="mb-6">
                              <p className="font-medium mb-2">
                                {question.text}
                              </p>
                              <RadioGroup
                                onValueChange={(value) =>
                                  handleAnswerSelect(
                                    question.id,
                                    value,
                                    question.priceImpact[
                                      question.options.indexOf(value)
                                    ]
                                  )
                                }
                                className="space-y-2"
                              >
                                {question.options.map((option, index) => (
                                  <div
                                    key={index}
                                    className="flex items-center space-x-2 p-2 rounded-md hover:bg-secondary transition-colors duration-200"
                                  >
                                    <RadioGroupItem
                                      value={option}
                                      id={`${question.id}-${index}`}
                                    />
                                    <Label
                                      htmlFor={`${question.id}-${index}`}
                                      className="flex-grow cursor-pointer"
                                    >
                                      {option}
                                    </Label>
                                  </div>
                                ))}
                              </RadioGroup>
                            </div>
                          ))}
                          <Button
                            onClick={handleFinish}
                            className="w-full mt-4"
                          >
                            Finalizar y ver cotización
                          </Button>
                        </motion.div>
                      )}
                      {currentStep === "summary" && (
                        <motion.div key="summary" {...fadeInUp}>
                          <h3 className="text-lg font-semibold mb-4">
                            Resumen de su consulta:
                          </h3>
                          <div className="space-y-2 mb-4">
                            <p>
                              <span className="font-medium">Área:</span>{" "}
                              {selectedCategory?.text}
                            </p>
                            <p>
                              <span className="font-medium">Tema:</span>{" "}
                              {selectedTopic?.text}
                            </p>
                          </div>
                          <Accordion
                            type="single"
                            collapsible
                            className="w-full mb-4"
                          >
                            {Object.entries(selectedAnswers).map(
                              ([questionId, answer], index) => {
                                const question = selectedTopic?.questions.find(
                                  (q) => q.id === questionId
                                );
                                return (
                                  <AccordionItem
                                    key={questionId}
                                    value={`item-${index}`}
                                  >
                                    <AccordionTrigger className="text-sm">
                                      {question?.text}
                                    </AccordionTrigger>
                                    <AccordionContent>
                                      {answer}
                                    </AccordionContent>
                                  </AccordionItem>
                                );
                              }
                            )}
                          </Accordion>
                          <motion.div
                            className="mt-4 p-4 bg-primary/10 rounded-lg"
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ delay: 0.2, duration: 0.3 }}
                          >
                            <p className="text-lg font-semibold">
                              Precio estimado de la consulta:
                            </p>
                            <p className="text-3xl font-bold text-primary">
                              ${totalPrice.toLocaleString("es-CL")}
                            </p>
                          </motion.div>
                          <Button onClick={resetChat} className="w-full mt-6">
                            Iniciar nueva cotización
                          </Button>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                  <div ref={messagesEndRef} />
                </ScrollArea>
              </CardContent>
              <CardFooter className="p-4 bg-secondary/50">
                <p className="text-sm text-muted-foreground text-center w-full">
                  Esta es una cotización estimada. El precio final puede variar
                  según la complejidad del caso.
                </p>
              </CardFooter>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
