import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Button } from "@/components/ui/button";
import { ArrowRight, Shield, Sparkles, Zap } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export const Hero = ({ onAnalyzeClick }: { onAnalyzeClick: () => void }) => {
  const heroRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title animation
      gsap.from(titleRef.current, {
        y: 100,
        opacity: 0,
        duration: 1.2,
        ease: "power4.out",
      });

      // Subtitle animation
      gsap.from(subtitleRef.current, {
        y: 50,
        opacity: 0,
        duration: 1,
        delay: 0.3,
        ease: "power3.out",
      });

      // CTA animation
      gsap.from(ctaRef.current, {
        y: 30,
        opacity: 0,
        duration: 0.8,
        delay: 0.6,
        ease: "power2.out",
      });

      // Features stagger animation
      gsap.from(".feature-card", {
        y: 50,
        opacity: 0,
        duration: 0.6,
        stagger: 0.15,
        delay: 0.8,
        ease: "back.out(1.7)",
      });

      // Floating animation for features
      gsap.to(".feature-card", {
        y: -10,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        stagger: {
          each: 0.3,
          repeat: -1,
        },
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={heroRef} className="relative min-h-screen bg-gradient-hero overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-float" style={{ animationDelay: "1s" }} />
      </div>

      <div className="container mx-auto px-4 py-20 relative z-10">
        <div className="max-w-5xl mx-auto text-center">
          {/* Main heading */}
          <h1 
            ref={titleRef}
            className="text-6xl md:text-7xl lg:text-8xl font-bold mb-6 bg-gradient-to-r from-primary via-primary-glow to-primary bg-clip-text text-transparent"
          >
            AI-Powered
            <br />
            Skin Analysis
          </h1>

          {/* Subtitle */}
          <p 
            ref={subtitleRef}
            className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-3xl mx-auto"
          >
            Upload your skin images and get instant, accurate predictions powered by advanced AI technology. 
            Professional dermatology insights at your fingertips.
          </p>

          {/* CTA Buttons */}
          <div ref={ctaRef} className="flex flex-col sm:flex-row gap-4 justify-center mb-20">
            <Button 
              size="lg" 
              className="text-lg px-8 py-6 bg-gradient-primary hover:shadow-glow transition-all duration-300"
              onClick={onAnalyzeClick}
            >
              Start Analysis
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              className="text-lg px-8 py-6 border-2 hover:bg-secondary/50 transition-all duration-300"
            >
              Learn More
            </Button>
          </div>

          {/* Features */}
          <div ref={featuresRef} className="grid md:grid-cols-3 gap-6 mt-16">
            <div className="feature-card bg-card/80 backdrop-blur-sm p-8 rounded-2xl border border-border shadow-card hover:shadow-glow transition-all duration-300">
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Instant Results</h3>
              <p className="text-muted-foreground">
                Get AI-powered analysis in seconds with our advanced machine learning models
              </p>
            </div>

            <div className="feature-card bg-card/80 backdrop-blur-sm p-8 rounded-2xl border border-border shadow-card hover:shadow-glow transition-all duration-300">
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Secure & Private</h3>
              <p className="text-muted-foreground">
                Your data is encrypted and protected with enterprise-grade security
              </p>
            </div>

            <div className="feature-card bg-card/80 backdrop-blur-sm p-8 rounded-2xl border border-border shadow-card hover:shadow-glow transition-all duration-300">
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Sparkles className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">High Accuracy</h3>
              <p className="text-muted-foreground">
                Trained on millions of images for reliable, professional-grade predictions
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
