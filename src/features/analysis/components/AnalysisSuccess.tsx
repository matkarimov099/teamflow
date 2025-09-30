import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Typography } from '@/components/ui/typography';
import { BarChart3, CheckCircle } from 'lucide-react';
import { useNavigate } from 'react-router';

interface AnalysisSuccessProps {
  onStartNew: () => void;
}

export function AnalysisSuccess({ onStartNew }: AnalysisSuccessProps) {
  const navigate = useNavigate();

  return (
    <Card className="border h-full">
      <CardContent className="p-6">
        <div className="text-center space-y-6">
          <div className="flex flex-col items-center gap-4">
            <div className="w-16 h-16 bg-green-50 dark:bg-green-900/30 rounded-full flex items-center justify-center border-2 border-green-200 dark:border-green-700">
              <CheckCircle className="h-8 w-8 text-green-600 dark:text-green-400" />
            </div>
            <div>
              <Typography
                variant="h3"
                align="center"
                className="text-green-800 dark:text-green-400 mb-2"
              >
                Analysis Completed Successfully!
              </Typography>
              <Typography align="center" variant="p" className="text-green-700 dark:text-green-500">
                Your code analysis has been completed. You can now view the detailed results and
                insights.
              </Typography>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={() => navigate('/analysis')}
              className="gap-2 px-6 py-3 bg-green-600 hover:bg-green-700 dark:bg-green-600 dark:hover:bg-green-700 text-white"
              size="lg"
            >
              <BarChart3 className="h-5 w-5" />
              View Analysis Results
            </Button>
            <Button variant="outline" onClick={onStartNew} size="lg">
              Start New Analysis
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
