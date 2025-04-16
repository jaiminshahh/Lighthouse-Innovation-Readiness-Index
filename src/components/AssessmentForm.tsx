import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMiq, Question } from "@/contexts/MiqContext";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { ChevronLeft, ChevronRight, CheckCircle, Save } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Icon } from "@/components/Icon";

const AssessmentForm: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { 
    miqData, 
    currentCategory, 
    setCurrentCategory,
    updateAnswer,
    calculateCategoryScore
  } = useMiq();
  
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  
  const category = miqData.find(c => c.id === currentCategory);
  const questions = category?.questions || [];
  const currentQuestion = questions[currentQuestionIndex];
  
  const progress = category 
    ? (questions.filter(q => q.answer !== null).length / questions.length) * 100
    : 0;
  
  useEffect(() => {
    if (!currentCategory) {
      navigate("/");
    }
    setCurrentQuestionIndex(0);
  }, [currentCategory, navigate]);
  
  if (!category || !currentQuestion) {
    return null;
  }
  
  const handleAnswerChange = (value: string) => {
    updateAnswer(category.id, currentQuestion.id, value);
  };
  
  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  };
  
  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    }
  };
  
  const handleComplete = () => {
    calculateCategoryScore(category.id);
    toast({
      title: "Category Completed!",
      description: `You've completed the ${category.name} assessment.`,
      duration: 3000,
    });
    setCurrentCategory(null);
    navigate("/");
  };
  
  const handleSaveProgress = () => {
    calculateCategoryScore(category.id);
    toast({
      title: "Progress Saved",
      description: "Your assessment progress has been saved.",
      duration: 3000,
    });
    setCurrentCategory(null);
    navigate("/");
  };

  return (
    <div className="w-full max-w-3xl mx-auto py-6">
      <div className="mb-8">
        <div className="flex items-center space-x-2 mb-2">
          <div className="p-2 rounded-full bg-miq-light text-miq-primary">
            <Icon name={category.icon} className="h-5 w-5" />
          </div>
          <h2 className="text-2xl font-bold">{category.name}</h2>
        </div>
        <p className="text-muted-foreground">{category.description}</p>
        <div className="mt-4 space-y-2">
          <div className="flex justify-between text-sm">
            <span>Question {currentQuestionIndex + 1} of {questions.length}</span>
            <span>{Math.round(progress)}% complete</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>
      </div>
      
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="text-lg">{currentQuestion.text}</CardTitle>
        </CardHeader>
        <CardContent>
          <RadioGroup 
            value={currentQuestion.answer || ""} 
            onValueChange={handleAnswerChange}
            className="space-y-3"
          >
            {currentQuestion.options.map(option => (
              <div key={option.value} className="flex items-center space-x-2">
                <RadioGroupItem value={option.value} id={`option-${option.value}`} />
                <Label htmlFor={`option-${option.value}`} className="cursor-pointer flex-1">
                  {option.label}
                </Label>
              </div>
            ))}
          </RadioGroup>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button 
            variant="outline" 
            onClick={handlePrevious}
            disabled={currentQuestionIndex === 0}
          >
            <ChevronLeft className="mr-2 h-4 w-4" />
            Previous
          </Button>
          <div className="space-x-2">
            {currentQuestionIndex < questions.length - 1 ? (
              <Button 
                onClick={handleNext}
                disabled={!currentQuestion.answer}
              >
                Next
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            ) : (
              <Button 
                onClick={handleComplete}
                disabled={!currentQuestion.answer}
                className="bg-green-600 hover:bg-green-700"
              >
                Complete
                <CheckCircle className="ml-2 h-4 w-4" />
              </Button>
            )}
          </div>
        </CardFooter>
      </Card>
      
      <div className="flex justify-between">
        <Button variant="ghost" onClick={() => navigate("/")}>
          <ChevronLeft className="mr-2 h-4 w-4" />
          Back to Dashboard
        </Button>
        <Button variant="outline" onClick={handleSaveProgress}>
          <Save className="mr-2 h-4 w-4" />
          Save Progress
        </Button>
      </div>
    </div>
  );
};

export default AssessmentForm;