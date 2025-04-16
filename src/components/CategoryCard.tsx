
import React from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { CheckCircle2, ChevronRight, AlertCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Category } from "@/contexts/MiqContext";
import { cn } from "@/lib/utils";
import { Icon } from "@/components/Icon";

interface CategoryCardProps {
  category: Category;
  onClick: () => void;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ category, onClick }) => {
  const navigate = useNavigate();
  
  const answeredQuestions = category.questions.filter(q => q.answer !== null).length;
  const totalQuestions = category.questions.length;
  const progress = (answeredQuestions / totalQuestions) * 100;
  
  const handleClick = () => {
    onClick();
    navigate("/assessment");
  };

  return (
    <Card className={cn(
      "transition-all duration-300 hover:shadow-md",
      category.completed ? "border-l-4 border-l-green-500" : 
      answeredQuestions > 0 ? "border-l-4 border-l-amber-500" : ""
    )}>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div className="flex items-center space-x-2">
            <div className="p-2 rounded-full bg-miq-light text-miq-primary">
              <Icon name={category.icon} className="h-5 w-5" />
            </div>
            <CardTitle className="text-lg">{category.name}</CardTitle>
          </div>
          {category.completed && (
            <CheckCircle2 className="h-5 w-5 text-green-500" />
          )}
          {!category.completed && answeredQuestions > 0 && (
            <AlertCircle className="h-5 w-5 text-amber-500" />
          )}
        </div>
        <CardDescription>{category.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>{answeredQuestions} of {totalQuestions} questions</span>
            {category.score !== null && (
              <span className="font-medium">Score: {category.score.toFixed(1)}/5</span>
            )}
          </div>
          <Progress value={progress} className="h-2" />
        </div>
      </CardContent>
      <CardFooter>
        <Button 
          onClick={handleClick} 
          variant={category.completed ? "outline" : "default"}
          className={cn("w-full", 
            category.completed ? "text-green-600 border-green-200 hover:bg-green-50" : ""
          )}
        >
          {category.completed 
            ? "Review Answers" 
            : answeredQuestions > 0 
              ? "Continue Assessment" 
              : "Start Assessment"
          }
          <ChevronRight className="ml-2 h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  );
};

export default CategoryCard;
