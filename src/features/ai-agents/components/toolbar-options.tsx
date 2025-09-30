import { CreateAgent } from '@/features/ai-agents/components/actions/CreateAgent';

const ToolbarOptions = () => {
  return (
    <>
      {/* Desktop layout */}
      <div className="hidden lg:flex lg:items-center lg:gap-2">
        <CreateAgent />
      </div>

      {/* Mobile layout - Full width below main toolbar controls */}
      <div className="flex flex-col gap-2 lg:hidden">
        <CreateAgent className="w-full" />
      </div>
    </>
  );
};

export default ToolbarOptions;
