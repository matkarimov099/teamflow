import { BadgeCheck, Bell, ChevronsUpDown, CreditCard, LogOut, Sparkles } from 'lucide-react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar.tsx';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu.tsx';
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar.tsx';
import type { CurrentUser } from '@/features/auth/types.ts';
import { useSidebar } from '@/hooks/use-sidebar';
import { cn } from '@/utils/utils';

interface NavUserProps {
  user?: CurrentUser | null;
  logout: () => void;
}
export function NavUser({ user, logout }: NavUserProps) {
  const { isMobile, state } = useSidebar();
  const isCollapsed = state === 'collapsed';

  return (
    <div
      className={cn(
        'relative',
        'before:-top-3 before:absolute before:inset-x-0 before:h-px before:bg-gradient-to-r before:from-transparent before:via-[var(--border)]/50 before:to-transparent'
      )}
    >
      <SidebarMenu>
        <SidebarMenuItem>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <SidebarMenuButton
                size={isCollapsed ? 'sm' : 'lg'}
                className={cn(
                  'group cursor-pointer relative transition-all duration-300 ease-[cubic-bezier(0.2,0.9,0.25,1)]',
                  'hover:border-[var(--system-blue)]/30',
                  'data-[state=open]:border-[var(--system-blue)]/40 data-[state=open]:bg-[var(--control-ghost-bg)]',
                  isCollapsed && 'h-9 w-9 justify-center p-0'
                )}
              >
                <div className="relative">
                  <Avatar
                    className={cn(
                      'h-9 w-9 rounded-lg border border-[var(--border)]/30 transition-all duration-200',
                      isCollapsed && 'h-8 w-8'
                    )}
                  >
                    <AvatarImage src={user?.avatarUrl} alt={user?.firstName} />
                    <AvatarFallback
                      className={cn(
                        'flex items-center justify-center rounded-lg bg-gradient-to-br from-[var(--system-blue)]/10 to-[var(--system-blue)]/5 font-semibold text-[var(--system-blue)]',
                        isCollapsed && 'text-xs'
                      )}
                    >
                      {`${user?.firstName?.[0] ?? ''}${user?.lastName?.[0] ?? ''}`.toUpperCase() ||
                        'SU'}
                    </AvatarFallback>
                  </Avatar>
                </div>
                {!isCollapsed && (
                  <>
                    <div className="grid flex-1 text-left text-sm leading-tight transition-all duration-300 font-sans">
                      <span className="truncate font-medium text-[var(--label)]">
                        {user?.firstName || 'First Name'}
                      </span>
                      <span className="truncate text-[var(--secondaryLabel)] text-xs">
                        {user?.lastName || 'Last Name'}
                      </span>
                    </div>
                    <ChevronsUpDown className="ml-auto size-4 text-[var(--tertiaryLabel)] transition-colors group-hover:text-[var(--secondaryLabel)]" />
                  </>
                )}
              </SidebarMenuButton>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
              side={isMobile ? 'bottom' : 'right'}
              align="end"
              sideOffset={4}
            >
              <DropdownMenuLabel className="p-0 font-normal">
                <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                  <Avatar className="h-8 w-8 rounded-lg">
                    <AvatarImage src={user?.avatarUrl} alt={user?.firstName} />
                    <AvatarFallback className="rounded-lg">
                      {`${user?.firstName?.[0] ?? ''}${user?.lastName?.[0] ?? ''}`.toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-semibold">
                      {`${user?.firstName} ${user?.lastName}`}
                    </span>
                    <span className="truncate text-xs">{user?.username}</span>
                  </div>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem>
                  <Sparkles />
                  Upgrade to Pro
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem>
                  <BadgeCheck />
                  Account
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <CreditCard />
                  Billing
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Bell />
                  Notifications
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={logout}>
                <LogOut />
                Log out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </SidebarMenuItem>
      </SidebarMenu>
    </div>
  );
}
