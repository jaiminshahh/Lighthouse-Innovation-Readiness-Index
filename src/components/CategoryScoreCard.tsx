
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Icon } from "@/components/Icon";
import { Category } from "@/contexts/MiqContext";
import { cn } from "@/lib/utils";

interface CategoryScoreCardProps {
  category: Category;
}

const CategoryScoreCard: React.FC<CategoryScoreCardProps> = ({ category }) => {
  const answeredQuestions = category.questions.filter(q => q.answer !== null).length;
  const totalQuestions = category.questions.length;
  const progress = (answeredQuestions / totalQuestions) * 100;
  
  // Score color based on the value
  const getScoreColor = (score: number | null) => {
    if (score === null) return "text-gray-400";
    if (score < 2) return "text-red-500";
    if (score < 3) return "text-amber-500";
    if (score < 4) return "text-blue-500";
    return "text-green-500";
  };

  return (
    <Card className={cn(
      "h-full",
      category.completed ? "border-l-4 border-l-green-500" : ""
    )}>
      <CardHeader className="pb-2">
        <div className="flex items-center space-x-2">
          <div className="p-2 rounded-full bg-miq-light text-miq-primary">
            <Icon name={category.icon} className="h-4 w-4" />
          </div>
          <CardTitle className="text-base">{category.name}</CardTitle>
        </div>
        <CardDescription className="text-xs">{category.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex justify-center">
          <div className="relative w-20 h-20 flex items-center justify-center rounded-full bg-gray-50">
            <span className={cn("text-2xl font-bold", getScoreColor(category.score))}>
              {category.score !== null ? category.score.toFixed(1) : "--"}
            </span>
            <span className="text-xs text-muted-foreground absolute bottom-1">out of 5</span>
          </div>
        </div>
        <div className="mt-2 text-xs text-center text-muted-foreground">
          {category.completed 
            ? "Assessment complete" 
            : `${answeredQuestions}/${totalQuestions} questions answered`}
        </div>
      </CardContent>
    </Card>
  );
};

export default CategoryScoreCard;
