import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Lightbulb } from "lucide-react";
import { Category } from "@/contexts/MiqContext";

interface RecommendationCardProps {
  categories: Category[];
}

const RecommendationCard: React.FC<RecommendationCardProps> = ({ categories }) => {
  const completedCategories = categories.filter(cat => cat.completed);
  
  if (completedCategories.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Lightbulb className="h-5 w-5 text-miq-secondary" />
            Recommendations
          </CardTitle>
          <CardDescription>Complete categories to receive recommendations</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Your personalized recommendations will appear here after you complete at least one category assessment.
          </p>
        </CardContent>
      </Card>
    );
  }
  
  // Find the lowest scoring category
  const lowestCategory = completedCategories.reduce(
    (lowest, current) => {
      if (current.score === null) return lowest;
      if (lowest.score === null || current.score < lowest.score) {
        return current;
      }
      return lowest;
    },
    completedCategories[0]
  );
  
  // Generate recommendations based on the category
  const getRecommendations = (category: Category) => {
    if (!category.score) return [];
    
    const score = category.score;
    
    switch(category.id) {
      case "strategy":
        return score < 3 ? [
          "Develop a clear AI strategy that aligns with business objectives",
          "Establish executive sponsorship for AI initiatives",
          "Allocate specific budget for AI exploration and implementation"
        ] : [
          "Create a comprehensive AI governance structure with clear roles",
          "Implement quarterly AI strategy reviews with active adjustments",
          "Develop an advanced AI ethics framework with regular monitoring"
        ];
      
      case "data":
        return score < 3 ? [
          "Develop a comprehensive data strategy and governance framework",
          "Establish data quality improvement initiatives",
          "Implement basic data security measures across the organization"
        ] : [
          "Create advanced data preparation pipelines for AI workloads",
          "Implement comprehensive data cataloging and metadata management",
          "Develop sophisticated systems for handling all data types"
        ];
      
      case "technical":
        return score < 3 ? [
          "Assess current computing resources and identify gaps for AI workloads",
          "Develop a cloud migration strategy for AI implementations",
          "Implement basic data integration capabilities across systems"
        ] : [
          "Deploy high-performance computing resources for AI workloads",
          "Implement advanced CI/CD pipelines for AI model deployment",
          "Develop AI-specific security protocols and monitoring"
        ];
        
      case "skills":
        return score < 3 ? [
          "Conduct an AI skills gap assessment across the organization",
          "Implement basic AI literacy training for leadership team",
          "Develop relationships with AI experts and consultants"
        ] : [
          "Build a strong technical team with AI expertise",
          "Create comprehensive AI skill development programs",
          "Develop sophisticated AI value measurement frameworks"
        ];
        
      case "process":
        return score < 3 ? [
          "Establish formal processes for AI use case identification",
          "Develop basic AI project prioritization framework",
          "Implement initial AI risk assessment procedures"
        ] : [
          "Create mature AI development and deployment methodologies",
          "Implement rigorous testing and validation processes for AI models",
          "Develop robust continuous improvement systems for AI solutions"
        ];
        
      case "culture":
        return score < 3 ? [
          "Foster a culture of data-driven decision making",
          "Create safe spaces for AI experimentation and learning",
          "Improve collaboration between technical and business teams"
        ] : [
          "Develop strong innovation culture with full leadership support",
          "Create comprehensive learning and upskilling programs for AI",
          "Establish complete transparency around AI initiatives and impacts"
        ];
        
      default:
        return ["Complete more assessments to receive targeted recommendations"];
    }
  };
  
  const recommendations = getRecommendations(lowestCategory);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Lightbulb className="h-5 w-5 text-miq-secondary" />
          Focus Area: {lowestCategory.name}
        </CardTitle>
        <CardDescription>
          Based on your assessment, we recommend focusing on improving your {lowestCategory.name.toLowerCase()}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2">
          {recommendations.map((rec, index) => (
            <li key={index} className="flex items-start gap-2">
              <span className="text-miq-primary font-bold mt-0.5">•</span>
              <span>{rec}</span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
};

export default RecommendationCard;