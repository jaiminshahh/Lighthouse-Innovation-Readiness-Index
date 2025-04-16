
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { CheckCircle2, Clock } from "lucide-react";

interface OverallScoreProps {
  score: number | null;
  completedCategories: number;
  totalCategories: number;
}

const OverallScore: React.FC<OverallScoreProps> = ({
  score,
  completedCategories,
  totalCategories,
}) => {
  const progressPercentage = (completedCategories / totalCategories) * 100;

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-xl">Overall MIQ Score</CardTitle>
        <CardDescription>
          Your digital maturity assessment across all categories
        </CardDescription>
      </CardHeader>
      <CardContent>
        {score !== null ? (
          <div className="space-y-4">
            <div className="flex justify-center">
              <div className="relative w-32 h-32 flex items-center justify-center rounded-full bg-miq-light border-8 border-miq-primary/20">
                <span className="text-4xl font-bold text-miq-primary">
                  {score.toFixed(1)}
                </span>
                <span className="text-sm text-muted-foreground absolute bottom-3">out of 5</span>
              </div>
            </div>
            <div className="text-center text-sm text-muted-foreground flex items-center justify-center gap-1">
              <CheckCircle2 className="h-4 w-4 text-green-500" />
              <span>
                {completedCategories} of {totalCategories} categories completed
              </span>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex justify-center">
              <div className="relative w-32 h-32 flex items-center justify-center rounded-full bg-gray-100 border-8 border-gray-200">
                <span className="text-2xl font-bold text-gray-400">--</span>
                <span className="text-sm text-muted-foreground absolute bottom-3">out of 5</span>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="flex items-center gap-1 text-muted-foreground">
                  <Clock className="h-4 w-4" />
                  Assessment in progress
                </span>
                <span>{completedCategories} of {totalCategories}</span>
              </div>
              <Progress value={progressPercentage} className="h-2" />
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default OverallScore;
