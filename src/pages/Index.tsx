import { useState, useRef } from "react";
import { Hero } from "@/components/Hero";
import { Scene3D } from "@/components/Scene3D";
import { UploadSection } from "@/components/UploadSection";
import { ResultsSection } from "@/components/ResultsSection";
import { ThemeSwitcher } from "@/components/ThemeSwitcher";

interface AnalysisResult {
  condition: string;
  confidence: number;
  description: string;
  recommendations: string[];
}

const Index = () => {
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const uploadSectionRef = useRef<HTMLDivElement>(null);

  const handleAnalyzeClick = () => {
    uploadSectionRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleAnalysisComplete = (result: AnalysisResult) => {
    setAnalysisResult(result);
  };

  return (
    <div className="min-h-screen bg-background">
      <ThemeSwitcher />
      
      <Hero onAnalyzeClick={handleAnalyzeClick} />
      
      <div className="py-20 bg-card/50">
        <div className="container mx-auto px-4 text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Powered by Advanced AI
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Experience the future of dermatology with our 3D visualization
          </p>
        </div>
        <Scene3D />
      </div>

      <div ref={uploadSectionRef}>
        <UploadSection onAnalysisComplete={handleAnalysisComplete} />
      </div>

      {analysisResult && <ResultsSection result={analysisResult} />}

      <footer className="bg-card border-t border-border py-12">
        <div className="container mx-auto px-4 text-center">
          <p className="text-muted-foreground">
            © 2024 AI Dermatology. Advanced skin analysis powered by artificial intelligence.
          </p>
          <p className="text-sm text-muted-foreground mt-2">
            For educational purposes only. Always consult a healthcare professional.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
