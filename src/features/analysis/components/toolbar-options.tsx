import { Button } from '@/components/ui/button';
import { PlusIcon } from 'lucide-react';
import { useNavigate } from 'react-router';

const ToolbarOptions = () => {
  const navigate = useNavigate();

  const handleCreateAnalysis = () => {
    navigate('/analysis/create');
  };

  return (
    <>
      {/* Desktop layout */}
      <div className="hidden lg:flex lg:items-center lg:gap-2">
        <Button onClick={handleCreateAnalysis} variant="primary">
          <PlusIcon className="h-4 w-4 mr-2" />
          Create Analysis
        </Button>
      </div>

      {/* Mobile layout - Full width below main toolbar controls */}
      <div className="flex flex-col gap-2 lg:hidden">
        <Button onClick={handleCreateAnalysis} variant="primary" className="w-full">
          <PlusIcon className="h-4 w-4 mr-2" />
          Create Analysis
        </Button>
      </div>
    </>
  );
};

export default ToolbarOptions;
