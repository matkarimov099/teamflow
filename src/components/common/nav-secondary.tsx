import { LocalizedNavLink } from '@/components/common/localized-nav-link';
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar.tsx';
import { useAuthContext } from '@/hooks/use-auth-context.ts';
import { useSidebar } from '@/hooks/use-sidebar';
import { footerMenuItems } from '@/lib/sidebar-menu.tsx';
import { cn } from '@/utils/utils';
import type * as React from 'react';
import { useLocation } from 'react-router';

export function NavSecondary({ ...props }: React.ComponentPropsWithoutRef<typeof SidebarGroup>) {
  const location = useLocation();
  const { state } = useSidebar();
  const { hasRole } = useAuthContext();
  const isCollapsed = state === 'collapsed';

  return (
    <SidebarGroup className={cn('transition-all duration-200')} {...props}>
      <SidebarGroupContent>
        <SidebarMenu className={cn('space-y-1')}>
          {footerMenuItems
            .filter(item => {
              // If an item has no roles specified, it's visible to all
              if (!item.roles || item.roles.length === 0) return true;
              // Check if user has any of the required roles
              return hasRole(item.roles);
            })
            .map(item => {
              const currentPath = location.pathname;
              const isActive = item.url === currentPath;
              return (
                <SidebarMenuItem key={item.title}>
                  <LocalizedNavLink to={item.url} className="block">
                    <SidebarMenuButton
                      tooltip={isCollapsed ? item.title : undefined}
                      className={cn(
                        'relative h-9 w-full rounded-lg px-2 transition-all duration-200',
                        'hover:!bg-blue-500 hover:!text-white text-[var(--sidebar-foreground)]',
                        isActive && '!text-blue-500 !font-semibold hover:!bg-blue-600',
                        isCollapsed && 'w-9 justify-center p-0'
                      )}
                    >
                      <div
                        className={cn('flex items-center gap-2', isCollapsed && 'justify-center')}
                      >
                        {item.icon}
                        {!isCollapsed && <span className="font-medium text-xs">{item.title}</span>}
                      </div>
                    </SidebarMenuButton>
                  </LocalizedNavLink>
                </SidebarMenuItem>
              );
            })}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
