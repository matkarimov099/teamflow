import { CreateProject } from '@/features/projects/components/actions/CreateProject';

const ToolbarOptions = () => {
  return (
    <>
      {/* Desktop layout */}
      <div className="hidden lg:flex lg:items-center lg:gap-2">
        <CreateProject />
      </div>

      {/* Mobile layout - Full width below main toolbar controls */}
      <div className="flex flex-col gap-2 lg:hidden">
        <CreateProject className="w-full" />
      </div>
    </>
  );
};

export default ToolbarOptions;
