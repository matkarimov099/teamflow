import type { Role } from '@/types/common.ts';
import {
  BrainIcon,
  ChartNoAxesCombinedIcon,
  FileTextIcon,
  FolderIcon,
  GitBranchIcon,
  HomeIcon,
  SettingsIcon,
  UsersIcon,
} from 'lucide-react';
import type { ReactNode } from 'react';

export interface SidebarMenuItem {
  title: string;
  url: string;
  icon?: ReactNode;
  isActive?: boolean;
  disabled?: boolean;
  roles?: Role[];
  items?: SidebarSubMenuItem[];
}

export interface SidebarSubMenuItem {
  title: string;
  url: string;
  icon?: ReactNode;
  disabled?: boolean;
  roles?: Role[];
}

export interface SidebarFooterItem {
  title: string;
  url: string;
  icon: ReactNode;
  roles?: Role[];
}

export const mainMenuItems: SidebarMenuItem[] = [
  // {
  // 	title: 'Dashboard',
  // 	titleKey: 'navigation.dashboard',
  // 	icon: <LayoutDashboardIcon />,
  // 	url: '',
  // 	items: [
  // 		{
  // 			title: 'Reports',
  // 			titleKey: 'navigation.reports',
  // 			url: '/reports',
  // 		},
  // 	],
  // },
  {
    title: 'Home',
    icon: <HomeIcon />,
    url: '/home',
  },
  {
    title: 'Dashboard',
    icon: <ChartNoAxesCombinedIcon />,
    url: '/dashboard',
  },
  {
    title: 'Users',
    url: '/users',
    icon: <UsersIcon />,
    roles: [],
  },
  {
    title: 'AI Agents',
    url: '/ai-agents',
    icon: <BrainIcon />,
    roles: [],
  },
  {
    title: 'Projects',
    url: '/projects',
    icon: <FolderIcon />,
    roles: [],
  },
  {
    title: 'Analysis',
    url: '/analysis',
    icon: <FileTextIcon />,
    roles: [],
  },
  {
    title: 'GitHub User Stats',
    url: '/user-stats',
    icon: <GitBranchIcon />,
    roles: [],
  },
];

export const footerMenuItems: SidebarFooterItem[] = [
  {
    title: 'Settings',
    url: '/settings',
    icon: <SettingsIcon />,
    roles: [],
  },
];
