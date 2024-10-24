"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ArrowLeft } from "lucide-react";
import { useToastContext } from "@/components/ToastProvider";

type Topic = {
  id: string;
  name: string;
  basePrice: number;
};

type Category = {
  id: string;
  title: string;
  topics: Topic[];
};

type CategoryFormProps = {
  category: Category;
  onBack: () => void;
};

export default function CategoryForm({ category, onBack }: CategoryFormProps) {
  const [currentStep, setCurrentStep] = useState<
    "topic" | "questions" | "summary" | "confirmation" | "userInfo"
  >("topic");
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [selectedTopic, setSelectedTopic] = useState<Topic | null>(null);
  const [answers, setAnswers] = useState<{ [key: string]: string }>({});
  const [totalPrice, setTotalPrice] = useState(0);
  const { toast } = useToastContext();

  const questions = [
    {
      id: "urgency",
      text: "¿Cuál es la urgencia de su caso?",
      options: ["Baja", "Media", "Alta", "Muy alta"],
      priceImpact: [0, 5000, 10000, 20000],
    },
    {
      id: "complexity",
      text: "¿Cómo calificaría la complejidad de su caso?",
      options: ["Simple", "Moderado", "Complejo", "Muy complejo"],
      priceImpact: [0, 10000, 20000, 30000],
    },
  ];

  const handleTopicSelect = (topic: Topic) => {
    setSelectedTopic(topic);
    setTotalPrice(topic.basePrice);
    setCurrentStep("questions");
  };

  const handleAnswerSelect = (
    questionId: string,
    answer: string,
    priceImpact: number
  ) => {
    setAnswers({ ...answers, [questionId]: answer });
    setTotalPrice((prevPrice) => prevPrice + priceImpact);
  };

  const handleFinish = () => {
    setCurrentStep("summary");
  };

  const handleConfirmation = (proceed: boolean) => {
    if (proceed) {
      setCurrentStep("userInfo");
    } else {
      // Reset the form and go back to the topic selection
      setSelectedTopic(null);
      setAnswers({});
      setTotalPrice(0);
      setCurrentStep("topic");
    }
  };

  const handleUserInfoSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email && !phone) {
      toast({
        title: "Error",
        description:
          "Por favor, proporcione al menos un método de contacto (correo electrónico o teléfono).",
        variant: "destructive",
      });
      return;
    }
    // Here you would typically send the data to your backend or perform further actions
    toast({
      title: "Cotización enviada",
      description:
        "Su cotización ha sido enviada a un abogado. Le contactaremos pronto.",
      duration: 5000,
    });
    // Reset form and go back to the main page after submission
    setUserName("");
    setEmail("");
    setPhone("");
    setSelectedTopic(null);
    setAnswers({});
    setTotalPrice(0);
    setCurrentStep("topic");
    onBack();
  };

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
    transition: { duration: 0.3 },
  };

  return (
    <motion.div
      className="bg-card rounded-xl shadow-lg p-6 max-w-2xl mx-auto"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Button variant="ghost" size="icon" onClick={onBack} className="mb-4">
        <ArrowLeft className="w-5 h-5" />
        <span className="sr-only">Volver</span>
      </Button>
      <h2 className="text-2xl font-bold mb-6">{category.title}</h2>
      {currentStep === "topic" && (
        <motion.div {...fadeInUp}>
          <h3 className="text-lg font-semibold mb-4">
            Seleccione el tema específico:
          </h3>
          <div className="space-y-2">
            {category.topics.map((topic) => (
              <Button
                key={topic.id}
                onClick={() => handleTopicSelect(topic)}
                className="w-full justify-between text-left"
                variant="outline"
              >
                <span>{topic.name}</span>
                <span>${topic.basePrice.toLocaleString("es-CL")}</span>
              </Button>
            ))}
          </div>
        </motion.div>
      )}
      {currentStep === "questions" && selectedTopic && (
        <motion.div {...fadeInUp}>
          <h3 className="text-lg font-semibold mb-4">
            Por favor, responda las siguientes preguntas:
          </h3>
          {questions.map((question) => (
            <div key={question.id} className="mb-6">
              <p className="font-medium mb-2">{question.text}</p>
              <RadioGroup
                onValueChange={(value) =>
                  handleAnswerSelect(
                    question.id,
                    value,
                    question.priceImpact[question.options.indexOf(value)]
                  )
                }
                className="space-y-2"
              >
                {question.options.map((option, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <RadioGroupItem
                      value={option}
                      id={`${question.id}-${index}`}
                    />
                    <Label htmlFor={`${question.id}-${index}`}>{option}</Label>
                  </div>
                ))}
              </RadioGroup>
            </div>
          ))}
          <Button onClick={handleFinish} className="w-full">
            Finalizar y ver cotización
          </Button>
        </motion.div>
      )}
      {currentStep === "summary" && (
        <motion.div {...fadeInUp}>
          <h3 className="text-lg font-semibold mb-4">
            Resumen de su consulta:
          </h3>
          <div className="space-y-2 mb-4">
            <p>
              <span className="font-medium">Categoría:</span> {category.title}
            </p>
            <p>
              <span className="font-medium">Tema:</span> {selectedTopic?.name}
            </p>
          </div>
          <div className="space-y-2 mb-4">
            {Object.entries(answers).map(([questionId, answer]) => {
              const question = questions.find((q) => q.id === questionId);
              return (
                <p key={questionId}>
                  <span className="font-medium">{question?.text}</span> {answer}
                </p>
              );
            })}
          </div>
          <div className="mt-4 p-4 bg-primary/10 rounded-lg">
            <p className="text-lg font-semibold">
              Precio estimado de la consulta:
            </p>
            <p className="text-3xl font-bold text-primary">
              ${totalPrice.toLocaleString("es-CL")}
            </p>
          </div>
          <Button
            onClick={() => setCurrentStep("confirmation")}
            className="w-full mt-6"
          >
            Continuar
          </Button>
        </motion.div>
      )}
      {currentStep === "confirmation" && (
        <motion.div {...fadeInUp} className="text-center">
          <h3 className="text-lg font-semibold mb-4">
            ¿Desea proseguir con la cotización y derivarlo al abogado?
          </h3>
          <div className="space-x-4">
            <Button onClick={() => handleConfirmation(true)} variant="default">
              Sí, continuar
            </Button>
            <Button onClick={() => handleConfirmation(false)} variant="outline">
              No, volver al inicio
            </Button>
          </div>
        </motion.div>
      )}
      {currentStep === "userInfo" && (
        <motion.form onSubmit={handleUserInfoSubmit} {...fadeInUp}>
          <div className="space-y-4">
            <div>
              <Label htmlFor="name">Nombre</Label>
              <Input
                id="name"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                required
              />
            </div>
            <div>
              <Label htmlFor="email">Correo electrónico (opcional)</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="phone">Teléfono (opcional)</Label>
              <Input
                id="phone"
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
            <Button type="submit" className="w-full">
              Enviar cotización
            </Button>
          </div>
        </motion.form>
      )}
    </motion.div>
  );
}
