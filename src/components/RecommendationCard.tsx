
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
      case "technology":
        return score < 3 ? [
          "Conduct a technology audit to identify legacy systems",
          "Develop a cloud migration strategy for critical applications",
          "Implement basic automation for repetitive IT tasks"
        ] : [
          "Explore AI and machine learning capabilities for your data",
          "Implement a comprehensive API strategy",
          "Establish innovation labs to test emerging technologies"
        ];
      
      case "culture":
        return score < 3 ? [
          "Establish regular innovation workshops for teams",
          "Create safe spaces for experimentation and failure",
          "Implement recognition programs for innovative ideas"
        ] : [
          "Develop cross-functional innovation teams",
          "Create dedicated innovation time (20% time)",
          "Establish innovation metrics tied to performance"
        ];
      
      case "workforce":
        return score < 3 ? [
          "Implement basic digital literacy training program",
          "Conduct skills gap assessment across the organization",
          "Create learning paths for key digital roles"
        ] : [
          "Establish digital leadership development program",
          "Create digital mentorship and reverse mentoring programs",
          "Develop specialized technical training tracks"
        ];
        
      case "strategy":
        return score < 3 ? [
          "Develop a digital vision and roadmap",
          "Establish quarterly strategic review process",
          "Create agile planning cycles for faster adaptation"
        ] : [
          "Implement scenario planning for disruptive technologies",
          "Develop ecosystem strategy with partners",
          "Create dedicated disruption response teams"
        ];
        
      case "finance":
        return score < 3 ? [
          "Create dedicated innovation budget",
          "Implement stage-gate funding for digital initiatives",
          "Develop basic ROI framework for digital investments"
        ] : [
          "Implement venture capital-style funding for innovations",
          "Create digital value creation metrics",
          "Develop portfolio approach to digital investments"
        ];
        
      case "ecosystem":
        return score < 3 ? [
          "Identify potential startup partners in your industry",
          "Establish relationships with local universities",
          "Join industry consortiums focused on innovation"
        ] : [
          "Create startup accelerator or incubator program",
          "Develop open innovation challenges",
          "Establish API ecosystem for partners"
        ];
        
      case "ai-adoption":
        return score < 3 ? [
          "Identify 2-3 initial AI use cases for your business",
          "Establish data quality improvement initiatives",
          "Conduct AI awareness training for leadership"
        ] : [
          "Create AI center of excellence",
          "Develop comprehensive AI strategy across functions",
          "Implement AI governance framework"
        ];
        
      case "ai-ethics":
        return score < 3 ? [
          "Develop basic AI ethics guidelines",
          "Implement data privacy protections",
          "Create AI impact assessment process"
        ] : [
          "Establish AI ethics board with diverse perspectives",
          "Develop comprehensive responsible AI framework",
          "Implement advanced bias detection and mitigation"
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
