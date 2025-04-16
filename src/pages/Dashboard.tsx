
import React from "react";
import { useMiq } from "@/contexts/MiqContext";
import { Button } from "@/components/ui/button";
import { BarChart3, RefreshCw } from "lucide-react";
import CategoryCard from "@/components/CategoryCard";
import OverallScore from "@/components/OverallScore";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { miqData, setCurrentCategory, overallScore, completedCategories, totalCategories, resetAssessment } = useMiq();
  
  const handleResetAssessment = () => {
    if (confirm("Are you sure you want to reset all your assessment data? This action cannot be undone.")) {
      resetAssessment();
      toast({
        title: "Assessment Reset",
        description: "All your assessment data has been cleared.",
        duration: 3000,
      });
    }
  };

  return (
    <div className="container py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">MIQ Assessment Dashboard</h1>
          <p className="text-muted-foreground mt-1">
            Track your organization's digital maturity across 8 key categories
          </p>
        </div>
        <div className="flex space-x-2">
          {completedCategories > 0 && (
            <>
              <Button variant="outline" size="sm" onClick={handleResetAssessment}>
                <RefreshCw className="mr-2 h-4 w-4" />
                Reset Assessment
              </Button>
              <Button size="sm" onClick={() => navigate("/results")}>
                <BarChart3 className="mr-2 h-4 w-4" />
                View Results
              </Button>
            </>
          )}
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="md:col-span-1">
          <OverallScore 
            score={overallScore} 
            completedCategories={completedCategories}
            totalCategories={totalCategories}
          />
        </div>
        <div className="md:col-span-2">
          <div className="bg-miq-light border rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-2">How MIQ Works</h2>
            <p className="mb-4">The Maturity Intelligence Quotient (MIQ) helps you assess your organization's digital readiness through 8 categories with 8 questions each.</p>
            <ol className="space-y-2 list-decimal list-inside text-sm">
              <li>Select a category to begin your assessment</li>
              <li>Answer all questions in each category</li>
              <li>Review your results and recommendations</li>
              <li>Take action based on identified focus areas</li>
              <li>Re-assess periodically to track improvement</li>
            </ol>
          </div>
        </div>
      </div>
      
      <h2 className="text-xl font-semibold mb-4">Assessment Categories</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {miqData.map((category) => (
          <CategoryCard 
            key={category.id} 
            category={category} 
            onClick={() => setCurrentCategory(category.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
