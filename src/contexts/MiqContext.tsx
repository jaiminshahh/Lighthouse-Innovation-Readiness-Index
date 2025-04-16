import React, { createContext, useContext, useState, useEffect } from "react";

export type Category = {
  id: string;
  name: string;
  description: string;
  icon: string;
  completed: boolean;
  score: number | null;
  questions: Question[];
};

export type Question = {
  id: string;
  text: string;
  options: Option[];
  answer: string | null;
};

export type Option = {
  value: string;
  label: string;
  score: number;
};

export const categories: Category[] = [
  {
    id: "technology",
    name: "Technology Landscape Readiness",
    description: "Are you using modern IT & AI technologies effectively?",
    icon: "server",
    completed: false,
    score: null,
    questions: Array(10).fill(null).map((_, i) => ({
      id: `technology-q${i+1}`,
      text: `Technology Landscape Readiness question ${i+1}`,
      options: [
        { value: "0", label: "Not implemented", score: 0 },
        { value: "3", label: "Partially implemented", score: 3 },
        { value: "5", label: "Fully implemented", score: 5 },
      ],
      answer: null,
    })),
  },
  {
    id: "culture",
    name: "Organizational Culture",
    description: "Are leaders supporting innovation?",
    icon: "users",
    completed: false,
    score: null,
    questions: Array(10).fill(null).map((_, i) => ({
      id: `culture-q${i+1}`,
      text: `Organizational Culture question ${i+1}`,
      options: [
        { value: "0", label: "Not developed", score: 0 },
        { value: "3", label: "Partially developed", score: 3 },
        { value: "5", label: "Fully developed", score: 5 },
      ],
      answer: null,
    })),
  },
  {
    id: "workforce",
    name: "Digital Capability Readiness",
    description: "Do employees have the right skills?",
    icon: "graduation-cap",
    completed: false,
    score: null,
    questions: Array(10).fill(null).map((_, i) => ({
      id: `workforce-q${i+1}`,
      text: `Digital Capability Readiness question ${i+1}`,
      options: [
        { value: "0", label: "Not available", score: 0 },
        { value: "3", label: "Partially available", score: 3 },
        { value: "5", label: "Fully available", score: 5 },
      ],
      answer: null,
    })),
  },
  {
    id: "strategy",
    name: "Strategic Agility",
    description: "Can you pivot when needed?",
    icon: "compass",
    completed: false,
    score: null,
    questions: Array(10).fill(null).map((_, i) => ({
      id: `strategy-q${i+1}`,
      text: `Strategic Agility question ${i+1}`,
      options: [
        { value: "0", label: "No strategy exists", score: 0 },
        { value: "3", label: "Basic strategy exists", score: 3 },
        { value: "5", label: "Comprehensive strategy", score: 5 },
      ],
      answer: null,
    })),
  },
  {
    id: "finance",
    name: "Financial Readiness",
    description: "Are you funding the right innovations?",
    icon: "dollar-sign",
    completed: false,
    score: null,
    questions: Array(10).fill(null).map((_, i) => ({
      id: `finance-q${i+1}`,
      text: `Financial Readiness question ${i+1}`,
      options: [
        { value: "0", label: "No budget allocation", score: 0 },
        { value: "3", label: "Limited budget", score: 3 },
        { value: "5", label: "Dedicated budget", score: 5 },
      ],
      answer: null,
    })),
  },
  {
    id: "ecosystem",
    name: "Ecosystem Connectivity",
    description: "Are you working with startups & universities?",
    icon: "network",
    completed: false,
    score: null,
    questions: Array(10).fill(null).map((_, i) => ({
      id: `ecosystem-q${i+1}`,
      text: `Ecosystem Connectivity question ${i+1}`,
      options: [
        { value: "0", label: "No connections", score: 0 },
        { value: "3", label: "Some partnerships", score: 3 },
        { value: "5", label: "Strong ecosystem", score: 5 },
      ],
      answer: null,
    })),
  },
];

type InnovationContextType = {
  miqData: Category[];
  currentCategory: string | null;
  setCurrentCategory: (categoryId: string | null) => void;
  updateAnswer: (categoryId: string, questionId: string, answer: string) => void;
  calculateCategoryScore: (categoryId: string) => void;
  overallScore: number | null;
  completedCategories: number;
  totalCategories: number;
  resetAssessment: () => void;
};

const InnovationContext = createContext<InnovationContextType | undefined>(undefined);

export const MiqProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [miqData, setMiqData] = useState<Category[]>(() => {
    const savedData = localStorage.getItem("innovationData");
    return savedData ? JSON.parse(savedData) : categories;
  });
  
  const [currentCategory, setCurrentCategory] = useState<string | null>(null);
  const [overallScore, setOverallScore] = useState<number | null>(null);
  const completedCategories = miqData.filter(cat => cat.completed).length;
  const totalCategories = miqData.length;

  useEffect(() => {
    localStorage.setItem("innovationData", JSON.stringify(miqData));
    
    // Calculate overall score
    const completedCats = miqData.filter(cat => cat.completed);
    if (completedCats.length > 0) {
      const totalScore = completedCats.reduce((sum, cat) => sum + (cat.score || 0), 0);
      setOverallScore(totalScore / completedCats.length);
    } else {
      setOverallScore(null);
    }
  }, [miqData]);

  const updateAnswer = (categoryId: string, questionId: string, answer: string) => {
    setMiqData(prevData => 
      prevData.map(category => 
        category.id === categoryId
          ? {
              ...category,
              questions: category.questions.map(question => 
                question.id === questionId
                  ? { ...question, answer }
                  : question
              )
            }
          : category
      )
    );
  };

  const calculateCategoryScore = (categoryId: string) => {
    setMiqData(prevData => 
      prevData.map(category => {
        if (category.id !== categoryId) return category;
        
        const answeredQuestions = category.questions.filter(q => q.answer !== null);
        if (answeredQuestions.length === 0) return category;
        
        const totalScore = answeredQuestions.reduce((sum, q) => {
          const selectedOption = q.options.find(opt => opt.value === q.answer);
          return sum + (selectedOption ? selectedOption.score : 0);
        }, 0);
        
        const avgScore = totalScore / category.questions.length;
        
        return {
          ...category,
          score: avgScore,
          completed: answeredQuestions.length === category.questions.length
        };
      })
    );
  };

  const resetAssessment = () => {
    setMiqData(categories);
    setCurrentCategory(null);
    setOverallScore(null);
  };

  return (
    <InnovationContext.Provider
      value={{
        miqData,
        currentCategory,
        setCurrentCategory,
        updateAnswer,
        calculateCategoryScore,
        overallScore,
        completedCategories,
        totalCategories,
        resetAssessment
      }}
    >
      {children}
    </InnovationContext.Provider>
  );
};

export const useMiq = () => {
  const context = useContext(InnovationContext);
  if (context === undefined) {
    throw new Error("useMiq must be used within a MiqProvider");
  }
  return context;
};