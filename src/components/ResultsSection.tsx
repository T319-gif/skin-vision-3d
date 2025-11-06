import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, AlertCircle } from "lucide-react";

interface AnalysisResult {
  condition: string;
  confidence: number;
  description: string;
  recommendations: string[];
}

interface ResultsSectionProps {
  result: AnalysisResult;
}

export const ResultsSection = ({ result }: ResultsSectionProps) => {
  const resultsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (resultsRef.current) {
      gsap.from(resultsRef.current, {
        y: 50,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
      });

      gsap.from(".result-card", {
        y: 30,
        opacity: 0,
        duration: 0.6,
        stagger: 0.15,
        delay: 0.3,
        ease: "back.out(1.7)",
      });
    }
  }, [result]);

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 85) return "text-green-500";
    if (confidence >= 70) return "text-yellow-500";
    return "text-orange-500";
  };

  return (
    <div ref={resultsRef} className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-4xl font-bold mb-2">Analysis Results</h2>
          <p className="text-muted-foreground">
            Here's what our AI detected
          </p>
        </div>

        {/* Main Result Card */}
        <Card className="result-card p-8 mb-6 bg-gradient-card shadow-card border-2 border-primary/20">
          <div className="flex items-start justify-between mb-6">
            <div>
              <h3 className="text-3xl font-bold mb-2">{result.condition}</h3>
              <p className="text-muted-foreground">{result.description}</p>
            </div>
            <Badge className={`text-lg px-4 py-2 ${getConfidenceColor(result.confidence)}`}>
              {result.confidence}% Confidence
            </Badge>
          </div>

          {/* Confidence Bar */}
          <div className="mb-6">
            <div className="h-3 bg-muted rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-primary transition-all duration-1000 ease-out"
                style={{ width: `${result.confidence}%` }}
              />
            </div>
          </div>

          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <AlertCircle className="h-4 w-4" />
            <span>This is an AI-powered analysis. Please consult a dermatologist for professional diagnosis.</span>
          </div>
        </Card>

        {/* Recommendations Card */}
        <Card className="result-card p-8 bg-gradient-card shadow-card">
          <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <CheckCircle2 className="h-6 w-6 text-primary" />
            Recommendations
          </h3>
          <ul className="space-y-4">
            {result.recommendations.map((rec, index) => (
              <li 
                key={index} 
                className="flex items-start gap-3 p-4 bg-background/50 rounded-lg border border-border hover:border-primary/50 transition-all duration-300"
              >
                <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-primary font-semibold">{index + 1}</span>
                </div>
                <p className="text-foreground">{rec}</p>
              </li>
            ))}
          </ul>
        </Card>
      </div>
    </div>
  );
};
