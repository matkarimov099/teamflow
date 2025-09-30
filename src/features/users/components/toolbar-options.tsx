import { CreateUser } from '@/features/users/components/actions/CreateUser.tsx';

const ToolbarOptions = () => {
  return (
    <>
      {/* Desktop layout */}
      <div className="hidden lg:flex lg:items-center lg:gap-2">
        <CreateUser />
      </div>

      {/* Mobile layout - Full width below main toolbar controls */}
      <div className="flex flex-col gap-2 lg:hidden">
        <CreateUser className="w-full" />
      </div>
    </>
  );
};

export default ToolbarOptions;
