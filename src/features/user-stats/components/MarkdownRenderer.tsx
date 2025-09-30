import { Typography } from '@/components/ui/typography.tsx';

interface MarkdownRendererProps {
  content: string;
}

export function MarkdownRenderer({ content }: MarkdownRendererProps) {
  return (
    <div className="text-sm leading-relaxed whitespace-pre-wrap">
      {content?.split('\n').map((line, index) => {
        // Create a unique key based on online content and position to avoid an array index key
        const uniqueKey = `line-${line.slice(0, 20).replace(/\s+/g, '-')}-${index}`;
        return (
          <div key={uniqueKey} className="mb-1">
            {line.startsWith('# ') ? (
              <Typography variant="h3" className="text-base font-bold mb-2">
                {line.replace('# ', '')}
              </Typography>
            ) : line.startsWith('## ') ? (
              <Typography variant="h4" className="text-sm font-semibold mb-1">
                {line.replace('## ', '')}
              </Typography>
            ) : line.startsWith('### ') ? (
              <Typography variant="h5" className="text-sm font-medium mb-1">
                {line.replace('### ', '')}
              </Typography>
            ) : line.startsWith('* ') ? (
              <div className="flex items-start gap-2 ml-4">
                <Typography variant="small" className="text-primary mt-1">
                  •
                </Typography>
                <Typography variant="small" className="flex-1">
                  {line.replace('* ', '')}
                </Typography>
              </div>
            ) : line.startsWith('- ') ? (
              <div className="flex items-start gap-2 ml-4">
                <Typography variant="small" className="text-primary mt-1">
                  •
                </Typography>
                <Typography variant="small" className="flex-1">
                  {line.replace('- ', '')}
                </Typography>
              </div>
            ) : (
              <Typography variant="small" className="block">
                {line}
              </Typography>
            )}
          </div>
        );
      })}
    </div>
  );
}
