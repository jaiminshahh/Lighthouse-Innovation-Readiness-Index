
import React from "react";
import { useMiq } from "@/contexts/MiqContext";
import ResultsChart from "@/components/ResultsChart";
import CategoryScoreCard from "@/components/CategoryScoreCard";
import RecommendationCard from "@/components/RecommendationCard";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, Home } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const Results: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { miqData, overallScore, completedCategories, totalCategories } = useMiq();
  
  const handleExport = () => {
    const completedData = miqData.filter(cat => cat.completed);
    if (completedData.length === 0) {
      toast({
        title: "No data to export",
        description: "Complete at least one category to export results.",
        variant: "destructive",
      });
      return;
    }
    
    // Create a simple JSON export for now
    const exportData = {
      overallScore,
      completedCategories,
      totalCategories,
      categories: completedData.map(cat => ({
        name: cat.name,
        score: cat.score,
        questions: cat.questions.map(q => ({
          question: q.text,
          answer: q.answer,
          score: q.options.find(o => o.value === q.answer)?.score || 0
        }))
      }))
    };
    
    // Create a download file
    const dataStr = JSON.stringify(exportData, null, 2);
    const dataUri = "data:application/json;charset=utf-8," + encodeURIComponent(dataStr);
    
    const exportFileDefaultName = `miq-results-${new Date().toISOString().split('T')[0]}.json`;
    
    const linkElement = document.createElement("a");
    linkElement.setAttribute("href", dataUri);
    linkElement.setAttribute("download", exportFileDefaultName);
    linkElement.click();
    
    toast({
      title: "Results Exported",
      description: "Your MIQ results have been exported successfully.",
    });
  };

  return (
    <div className="container py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">MIQ Results</h1>
          <p className="text-muted-foreground mt-1">
            {completedCategories > 0 
              ? `${completedCategories} of ${totalCategories} categories completed` 
              : "Complete at least one category to see results"}
          </p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" size="sm" onClick={() => navigate("/")}>
            <Home className="mr-2 h-4 w-4" />
            Back to Dashboard
          </Button>
          <Button size="sm" onClick={handleExport}>
            <Download className="mr-2 h-4 w-4" />
            Export Results
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="md:col-span-2">
          <Card className="p-4 h-full">
            <h2 className="text-xl font-semibold mb-4">MIQ Radar Chart</h2>
            <ResultsChart categories={miqData} />
          </Card>
        </div>
        <div className="md:col-span-1">
          <RecommendationCard categories={miqData} />
        </div>
      </div>
      
      <h2 className="text-xl font-semibold mb-4">Category Scores</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {miqData.map((category) => (
          <CategoryScoreCard key={category.id} category={category} />
        ))}
      </div>
      
      {completedCategories > 0 && (
        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-4">Overall Assessment</h2>
          <Card className="p-6">
            <h3 className="text-lg font-medium mb-2">
              Your Organization's MIQ Score: {overallScore !== null ? overallScore.toFixed(1) : "--"} / 5
            </h3>
            <p className="mb-4">
              {overallScore !== null ? 
                overallScore < 2 ? 
                  "Your organization is in the beginning stages of digital maturity. Focus on building basic capabilities and awareness." :
                overallScore < 3 ? 
                  "Your organization is developing digital capabilities but has significant room for improvement. Consider prioritizing the areas with lowest scores." :
                overallScore < 4 ? 
                  "Your organization has established solid digital capabilities. Continue to strengthen specific areas while maintaining your foundation." :
                  "Your organization demonstrates advanced digital maturity across most dimensions. Focus on innovation and leading-edge practices."
                : "Complete more categories to receive an overall assessment."}
            </p>
            <div className="text-sm text-muted-foreground">
              <p>
                <strong>Next Steps:</strong> Review the recommendations for your lowest-scoring categories 
                and develop an action plan to improve in those areas.
              </p>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
};

export default Results;
