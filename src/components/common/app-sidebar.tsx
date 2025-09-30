import { Network, Zap } from 'lucide-react';
import type * as React from 'react';

import { LocalizedNavLink } from '@/components/common/localized-nav-link';
import { NavMain } from '@/components/common/nav-main.tsx';
import { NavSecondary } from '@/components/common/nav-secondary.tsx';
import { NavUser } from '@/components/common/nav-user.tsx';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar.tsx';
import { useAuthContext } from '@/hooks/use-auth-context.ts';
import { useSidebar } from '@/hooks/use-sidebar';
import { cn } from '@/utils/utils';

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { logout, currentUser } = useAuthContext();
  const { state } = useSidebar();
  const isCollapsed = state === 'collapsed';

  return (
    <Sidebar
      variant="floating"
      collapsible="icon"
      className={cn(
        'transition-all duration-300 ease-[cubic-bezier(0.2,0.9,0.25,1)]',
        'group-data-[state=collapsed]:backdrop-blur-xl'
      )}
      {...props}
    >
      <SidebarHeader
        className={cn(
          'transition-all duration-300 ease-[cubic-bezier(0.2,0.9,0.25,1)]',
          isCollapsed && 'flex items-center justify-center px-1.5'
        )}
      >
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              size="lg"
              asChild
              className={cn(
                'group transition-all duration-300 ease-[cubic-bezier(0.2,0.9,0.25,1)]',
                isCollapsed && 'px-2 justify-center'
              )}
            >
              <LocalizedNavLink to="/">
                <div
                  className={cn(
                    'flex items-center justify-center rounded-lg relative transition-all duration-300 ease-[cubic-bezier(0.2,0.9,0.25,1)]',
                    isCollapsed ? 'size-8' : 'size-8',
                    'bg-blue-500',
                    'shadow-lg group-hover:shadow-xl group-hover:scale-105'
                  )}
                >
                  {/* Dynamic icon based on the collapse state */}
                  {isCollapsed ? (
                    <Zap className="size-4 text-white relative z-10 group-hover:scale-110 transition-transform duration-300" />
                  ) : (
                    <Network className="size-4 text-white relative z-10 group-hover:scale-110 transition-transform duration-300" />
                  )}
                </div>

                {!isCollapsed && (
                  <div className="grid flex-1 text-left text-sm leading-tight transition-all duration-300 ease-[cubic-bezier(0.2,0.9,0.25,1)]">
                    <span className="truncate font-bold text-lg text-blue-500 font-sans tracking-wide">
                      TeamFlow
                    </span>
                    <span className="truncate text-xs text-[var(--secondaryLabel)] font-sans font-medium opacity-80">
                      Smart workspace
                    </span>
                  </div>
                )}
              </LocalizedNavLink>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent
        className={cn(
          'transition-all duration-300 ease-[cubic-bezier(0.2,0.9,0.25,1)]',
          isCollapsed && 'px-1.5'
        )}
      >
        <NavMain />
        <NavSecondary className="mt-auto" />
      </SidebarContent>

      <SidebarFooter
        className={cn(
          'transition-all duration-300 ease-[cubic-bezier(0.2,0.9,0.25,1)]',
          isCollapsed && 'items-center'
        )}
      >
        <NavUser user={currentUser} logout={logout} />
      </SidebarFooter>
    </Sidebar>
  );
}
