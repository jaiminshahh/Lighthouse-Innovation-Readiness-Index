
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
    name: "Technology Strength",
    description: "Are you using modern IT & AI?",
    icon: "laptop",
    completed: false,
    score: null,
    questions: Array(8).fill(null).map((_, i) => ({
      id: `tech-q${i+1}`,
      text: `Technology question ${i+1}: How would you rate your organization's ${['adoption of cloud technologies', 'IT infrastructure modernity', 'data security measures', 'use of automation tools', 'technology integration', 'hardware refresh cycles', 'software update frequency', 'technical debt management'][i]}?`,
      options: [
        { value: "1", label: "Beginning", score: 1 },
        { value: "2", label: "Developing", score: 2 },
        { value: "3", label: "Established", score: 3 },
        { value: "4", label: "Advanced", score: 4 },
        { value: "5", label: "Leading", score: 5 },
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
    questions: Array(8).fill(null).map((_, i) => ({
      id: `culture-q${i+1}`,
      text: `Culture question ${i+1}: How would you rate your organization's ${['leadership support for innovation', 'acceptance of failure as learning', 'cross-functional collaboration', 'agile methodologies adoption', 'employee empowerment', 'continuous learning culture', 'reward systems for innovation', 'organizational transparency'][i]}?`,
      options: [
        { value: "1", label: "Beginning", score: 1 },
        { value: "2", label: "Developing", score: 2 },
        { value: "3", label: "Established", score: 3 },
        { value: "4", label: "Advanced", score: 4 },
        { value: "5", label: "Leading", score: 5 },
      ],
      answer: null,
    })),
  },
  {
    id: "workforce",
    name: "Digital Workforce Readiness",
    description: "Do employees have the right skills?",
    icon: "graduation-cap",
    completed: false,
    score: null,
    questions: Array(8).fill(null).map((_, i) => ({
      id: `workforce-q${i+1}`,
      text: `Workforce question ${i+1}: How would you rate your organization's ${['digital literacy training programs', 'technical skill development', 'change management capabilities', 'talent acquisition for digital roles', 'remote work capabilities', 'digital collaboration tools usage', 'employee adaptability to new tools', 'digital leadership development'][i]}?`,
      options: [
        { value: "1", label: "Beginning", score: 1 },
        { value: "2", label: "Developing", score: 2 },
        { value: "3", label: "Established", score: 3 },
        { value: "4", label: "Advanced", score: 4 },
        { value: "5", label: "Leading", score: 5 },
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
    questions: Array(8).fill(null).map((_, i) => ({
      id: `strategy-q${i+1}`,
      text: `Strategy question ${i+1}: How would you rate your organization's ${['ability to anticipate market changes', 'speed of strategic decision-making', 'business model adaptability', 'crisis response planning', 'competitive intelligence capabilities', 'vision clarity and communication', 'portfolio management flexibility', 'scenario planning processes'][i]}?`,
      options: [
        { value: "1", label: "Beginning", score: 1 },
        { value: "2", label: "Developing", score: 2 },
        { value: "3", label: "Established", score: 3 },
        { value: "4", label: "Advanced", score: 4 },
        { value: "5", label: "Leading", score: 5 },
      ],
      answer: null,
    })),
  },
  {
    id: "finance",
    name: "Financial Strength",
    description: "Are you funding the right innovations?",
    icon: "dollar-sign",
    completed: false,
    score: null,
    questions: Array(8).fill(null).map((_, i) => ({
      id: `finance-q${i+1}`,
      text: `Financial question ${i+1}: How would you rate your organization's ${['innovation investment planning', 'ROI measurement for digital initiatives', 'funding allocation processes', 'cost management of technology', 'financial risk assessment', 'digital value creation metrics', 'budget flexibility for opportunities', 'capital allocation efficiency'][i]}?`,
      options: [
        { value: "1", label: "Beginning", score: 1 },
        { value: "2", label: "Developing", score: 2 },
        { value: "3", label: "Established", score: 3 },
        { value: "4", label: "Advanced", score: 4 },
        { value: "5", label: "Leading", score: 5 },
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
    questions: Array(8).fill(null).map((_, i) => ({
      id: `ecosystem-q${i+1}`,
      text: `Ecosystem question ${i+1}: How would you rate your organization's ${['startup partnership programs', 'academic collaboration initiatives', 'industry consortium participation', 'open innovation practices', 'API ecosystem development', 'co-creation with customers', 'strategic alliance management', 'ecosystem diversity'][i]}?`,
      options: [
        { value: "1", label: "Beginning", score: 1 },
        { value: "2", label: "Developing", score: 2 },
        { value: "3", label: "Established", score: 3 },
        { value: "4", label: "Advanced", score: 4 },
        { value: "5", label: "Leading", score: 5 },
      ],
      answer: null,
    })),
  },
  {
    id: "ai-adoption",
    name: "AI Adoption Level",
    description: "Are you using AI effectively?",
    icon: "brain",
    completed: false,
    score: null,
    questions: Array(8).fill(null).map((_, i) => ({
      id: `ai-adoption-q${i+1}`,
      text: `AI Adoption question ${i+1}: How would you rate your organization's ${['AI strategy clarity', 'AI talent acquisition', 'AI use case identification', 'data availability for AI', 'AI model deployment capabilities', 'AI solution integration', 'AI research and experimentation', 'AI scalability planning'][i]}?`,
      options: [
        { value: "1", label: "Beginning", score: 1 },
        { value: "2", label: "Developing", score: 2 },
        { value: "3", label: "Established", score: 3 },
        { value: "4", label: "Advanced", score: 4 },
        { value: "5", label: "Leading", score: 5 },
      ],
      answer: null,
    })),
  },
  {
    id: "ai-ethics",
    name: "AI Ethics Readiness",
    description: "Are you using AI responsibly?",
    icon: "shield",
    completed: false,
    score: null,
    questions: Array(8).fill(null).map((_, i) => ({
      id: `ai-ethics-q${i+1}`,
      text: `AI Ethics question ${i+1}: How would you rate your organization's ${['AI ethics policy development', 'bias detection and mitigation', 'AI transparency practices', 'privacy protection in AI', 'AI governance structures', 'responsible AI training', 'AI impact assessment processes', 'ethical review boards'][i]}?`,
      options: [
        { value: "1", label: "Beginning", score: 1 },
        { value: "2", label: "Developing", score: 2 },
        { value: "3", label: "Established", score: 3 },
        { value: "4", label: "Advanced", score: 4 },
        { value: "5", label: "Leading", score: 5 },
      ],
      answer: null,
    })),
  },
];

type MiqContextType = {
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

const MiqContext = createContext<MiqContextType | undefined>(undefined);

export const MiqProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [miqData, setMiqData] = useState<Category[]>(() => {
    const savedData = localStorage.getItem("miqData");
    return savedData ? JSON.parse(savedData) : categories;
  });
  
  const [currentCategory, setCurrentCategory] = useState<string | null>(null);
  const [overallScore, setOverallScore] = useState<number | null>(null);
  const completedCategories = miqData.filter(cat => cat.completed).length;
  const totalCategories = miqData.length;

  useEffect(() => {
    localStorage.setItem("miqData", JSON.stringify(miqData));
    
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
    <MiqContext.Provider
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
    </MiqContext.Provider>
  );
};

export const useMiq = () => {
  const context = useContext(MiqContext);
  if (context === undefined) {
    throw new Error("useMiq must be used within a MiqProvider");
  }
  return context;
};
