import { useState, useRef, useEffect } from "react";
import { gsap } from "gsap";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Upload, X, Loader2, CheckCircle } from "lucide-react";
import { toast } from "sonner";

interface UploadSectionProps {
  onAnalysisComplete: (result: AnalysisResult) => void;
}

interface AnalysisResult {
  condition: string;
  confidence: number;
  description: string;
  recommendations: string[];
}

export const UploadSection = ({ onAnalysisComplete }: UploadSectionProps) => {
  const [image, setImage] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const uploadCardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (uploadCardRef.current) {
      gsap.from(uploadCardRef.current, {
        scale: 0.9,
        opacity: 0,
        duration: 0.6,
        ease: "back.out(1.7)",
      });
    }
  }, []);

  const handleFileSelect = (file: File) => {
    if (!file.type.startsWith("image/")) {
      toast.error("Please upload an image file");
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      setImage(e.target?.result as string);
      toast.success("Image uploaded successfully!");
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFileSelect(file);
  };

  const handleAnalyze = async () => {
    if (!image) {
      toast.error("Please upload an image first");
      return;
    }

    setIsAnalyzing(true);
    
    // Simulate AI analysis
    await new Promise(resolve => setTimeout(resolve, 2500));

    const mockResults: AnalysisResult[] = [
      {
        condition: "Mild Acne",
        confidence: 87,
        description: "Minor inflammatory acne with some comedones. Generally manageable with proper skincare.",
        recommendations: [
          "Use gentle, non-comedogenic cleansers",
          "Apply salicylic acid treatment",
          "Consider consulting a dermatologist",
          "Maintain consistent skincare routine"
        ]
      },
      {
        condition: "Normal Skin",
        confidence: 92,
        description: "Healthy skin appearance with no significant concerns detected.",
        recommendations: [
          "Continue your current skincare routine",
          "Use daily SPF protection",
          "Stay hydrated",
          "Regular moisturization"
        ]
      },
      {
        condition: "Mild Rosacea",
        confidence: 78,
        description: "Possible mild rosacea with slight redness. Requires professional confirmation.",
        recommendations: [
          "Avoid triggers like hot beverages and spicy foods",
          "Use gentle, fragrance-free products",
          "Consult a dermatologist for proper diagnosis",
          "Consider anti-redness treatments"
        ]
      }
    ];

    const result = mockResults[Math.floor(Math.random() * mockResults.length)];
    
    setIsAnalyzing(false);
    onAnalysisComplete(result);
    toast.success("Analysis complete!");
  };

  return (
    <div className="container mx-auto px-4 py-20" id="analyze">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-4">
          Upload & Analyze
        </h2>
        <p className="text-center text-muted-foreground mb-12 text-lg">
          Upload a clear image of your skin for instant AI-powered analysis
        </p>

        <Card 
          ref={uploadCardRef}
          className="p-8 bg-gradient-card border-2 border-dashed border-border hover:border-primary/50 transition-all duration-300"
          onDragOver={(e) => {
            e.preventDefault();
            setIsDragging(true);
          }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={handleDrop}
        >
          {!image ? (
            <div className="text-center">
              <div className={`w-24 h-24 mx-auto mb-6 bg-primary/10 rounded-full flex items-center justify-center transition-all duration-300 ${isDragging ? 'scale-110 bg-primary/20' : ''}`}>
                <Upload className="h-12 w-12 text-primary" />
              </div>
              <h3 className="text-2xl font-semibold mb-2">Upload Your Image</h3>
              <p className="text-muted-foreground mb-6">
                Drag and drop or click to select an image
              </p>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => e.target.files?.[0] && handleFileSelect(e.target.files[0])}
              />
              <Button
                size="lg"
                onClick={() => fileInputRef.current?.click()}
                className="bg-gradient-primary hover:shadow-glow"
              >
                Select Image
              </Button>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="relative">
                <img
                  src={image}
                  alt="Uploaded skin"
                  className="w-full h-auto rounded-lg shadow-lg max-h-96 object-contain mx-auto"
                />
                <Button
                  size="icon"
                  variant="destructive"
                  className="absolute top-4 right-4"
                  onClick={() => setImage(null)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>

              <Button
                size="lg"
                className="w-full bg-gradient-primary hover:shadow-glow"
                onClick={handleAnalyze}
                disabled={isAnalyzing}
              >
                {isAnalyzing ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Analyzing...
                  </>
                ) : (
                  <>
                    <CheckCircle className="mr-2 h-5 w-5" />
                    Analyze Image
                  </>
                )}
              </Button>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
};
