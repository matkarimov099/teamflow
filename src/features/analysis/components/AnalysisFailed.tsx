import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Typography } from '@/components/ui/typography';
import { XOctagon } from 'lucide-react';
import { useNavigate } from 'react-router';

interface AnalysisFailedProps {
  onRetry: () => void;
}

export function AnalysisFailed({ onRetry }: AnalysisFailedProps) {
  const navigate = useNavigate();

  return (
    <Card className="border h-full">
      <CardContent className="p-6">
        <div className="text-center space-y-6">
          <div className="flex flex-col items-center gap-4">
            <div className="w-16 h-16 bg-red-100 dark:bg-red-950/50 rounded-full flex items-center justify-center border-2 border-red-300 dark:border-red-800">
              <XOctagon className="h-8 w-8 text-red-600 dark:text-red-300" />
            </div>
            <div>
              <Typography
                align="center"
                variant="h3"
                className="text-red-900 dark:text-red-200 mb-2"
              >
                Analysis Failed
              </Typography>
              <Typography
                align="center"
                variant="p"
                className="text-red-800 dark:text-red-300 mb-4"
              >
                Unfortunately, the analysis could not be completed due to an error.
              </Typography>
              <div className="border border-red-300 dark:border-red-800 bg-red-50 dark:bg-red-950/30 rounded-lg p-4">
                <Typography
                  align="center"
                  variant="small"
                  className="text-red-800 dark:text-red-200"
                >
                  <strong>Recommendation:</strong> Please check your configuration and try again. If
                  the problem persists, contact support.
                </Typography>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button onClick={onRetry} variant="destructive" size="lg" className="px-6 py-3">
              Try Again
            </Button>
            <Button variant="outline" onClick={() => navigate('/analysis')} size="lg">
              Back to Analysis
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
