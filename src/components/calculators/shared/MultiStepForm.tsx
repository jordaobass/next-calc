'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { ArrowLeft, ArrowRight, Check } from 'lucide-react';

export interface FormStep {
  id: string;
  title: string;
  description: string;
  component: React.ReactNode;
  isValid?: boolean;
}

interface MultiStepFormProps {
  steps: FormStep[];
  onComplete: () => void;
  onStepChange?: (currentStep: number) => void;
  className?: string;
}

export function MultiStepForm({ 
  steps, 
  onComplete, 
  onStepChange,
  className = ""
}: MultiStepFormProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<Set<number>>(new Set());

  const progress = ((currentStep + 1) / steps.length) * 100;
  const isFirstStep = currentStep === 0;
  const isLastStep = currentStep === steps.length - 1;
  const canProceed = steps[currentStep]?.isValid ?? true;

  const handleNext = () => {
    if (!canProceed) return;
    
    // Mark current step as completed
    setCompletedSteps(prev => new Set([...prev, currentStep]));
    
    if (isLastStep) {
      onComplete();
    } else {
      const nextStep = currentStep + 1;
      setCurrentStep(nextStep);
      onStepChange?.(nextStep);
    }
  };

  const handlePrevious = () => {
    if (isFirstStep) return;
    
    const prevStep = currentStep - 1;
    setCurrentStep(prevStep);
    onStepChange?.(prevStep);
  };

  const handleStepClick = (stepIndex: number) => {
    // Only allow navigation to completed steps or the next immediate step
    if (completedSteps.has(stepIndex) || stepIndex === currentStep + 1) {
      setCurrentStep(stepIndex);
      onStepChange?.(stepIndex);
    }
  };

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Progress Header */}
      <Card>
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between mb-4">
            <div>
              <CardTitle className="text-lg">
                Passo {currentStep + 1} de {steps.length}
              </CardTitle>
              <CardDescription className="text-sm">
                {steps[currentStep]?.title}
              </CardDescription>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-emerald-600">
                {Math.round(progress)}%
              </div>
              <div className="text-xs text-muted-foreground">Concluído</div>
            </div>
          </div>
          
          {/* Progress Bar */}
          <Progress value={progress} className="h-2" />
          
          {/* Step Indicators */}
          <div className="flex justify-between mt-4">
            {steps.map((step, index) => (
              <button
                key={step.id}
                onClick={() => handleStepClick(index)}
                className={`flex items-center space-x-2 text-xs transition-colors ${
                  index === currentStep
                    ? 'text-emerald-600 font-medium'
                    : completedSteps.has(index)
                    ? 'text-green-600 cursor-pointer hover:text-green-700'
                    : index < currentStep
                    ? 'text-muted-foreground cursor-pointer hover:text-foreground'
                    : 'text-muted-foreground/50'
                }`}
                disabled={!completedSteps.has(index) && index !== currentStep && index !== currentStep + 1}
              >
                <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                  index === currentStep
                    ? 'bg-emerald-600 text-white'
                    : completedSteps.has(index)
                    ? 'bg-green-600 text-white'
                    : 'bg-muted text-muted-foreground'
                }`}>
                  {completedSteps.has(index) ? (
                    <Check className="h-3 w-3" />
                  ) : (
                    index + 1
                  )}
                </div>
                <span className="hidden sm:inline">{step.title}</span>
              </button>
            ))}
          </div>
        </CardHeader>
      </Card>

      {/* Current Step Content */}
      <Card>
        <CardHeader>
          <CardTitle>{steps[currentStep]?.title}</CardTitle>
          <CardDescription>{steps[currentStep]?.description}</CardDescription>
        </CardHeader>
        <CardContent>
          {steps[currentStep]?.component}
        </CardContent>
      </Card>

      {/* Navigation */}
      <div className="flex justify-between">
        <Button
          variant="outline"
          onClick={handlePrevious}
          disabled={isFirstStep}
          className="flex items-center space-x-2"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Anterior</span>
        </Button>

        <div className="text-center text-sm text-muted-foreground">
          {currentStep + 1} de {steps.length} passos
        </div>

        <Button
          onClick={handleNext}
          disabled={!canProceed}
          className="flex items-center space-x-2 bg-emerald-600 hover:bg-emerald-700"
        >
          <span>{isLastStep ? 'Finalizar' : 'Próximo'}</span>
          <ArrowRight className="h-4 w-4" />
        </Button>
      </div>

      {/* Help Text */}
      {!canProceed && (
        <Card className="bg-yellow-50 border-yellow-200">
          <CardContent className="p-4">
            <p className="text-sm text-yellow-800">
              ⚠️ Complete todos os campos obrigatórios para continuar para o próximo passo.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}