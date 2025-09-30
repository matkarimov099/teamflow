import { Card, CardContent } from '@/components/ui/card';
import { Typography } from '@/components/ui/typography';
import { BarChart3 } from 'lucide-react';

export function AnalysisEmpty() {
  return (
    <Card className="border-dashed h-full border-2">
      <CardContent className="h-full flex items-center justify-center flex-col">
        <BarChart3 className="h-16 w-16 text-gray-400 dark:text-gray-500 mx-auto mb-4" />
        <Typography variant="h3" className="text-center text-gray-600 dark:text-gray-300 mb-2">
          Ready to Start Analysis
        </Typography>
        <Typography variant="muted" className="text-center">
          Fill out the configuration form and click "Start Analysis" to begin
        </Typography>
      </CardContent>
    </Card>
  );
}
