import { mainMenuItems } from '@/lib/sidebar-menu';

export interface BreadcrumbItem {
  title: string;
  titleKey?: string;
  url?: string;
  isActive?: boolean;
}

export function getBreadcrumbItems(pathname: string): BreadcrumbItem[] {
  const currentPath = pathname;
  const breadcrumbs: BreadcrumbItem[] = [];

  // Always start with "Project"
  breadcrumbs.push({
    title: 'Project',
    url: '/',
  });

  // Find the current page in the menu structure
  for (const item of mainMenuItems) {
    // Check if the current path matches a main menu item
    if (item.url && item.url === currentPath) {
      // Direct main menu item (no parent)
      breadcrumbs.push({
        title: item.title,
        isActive: true,
      });
      return breadcrumbs;
    }

    // Check if the current path matches a subitem
    if (item.items) {
      for (const subItem of item.items) {
        if (subItem.url === currentPath) {
          // Subitem found - add parent first, then subitem
          breadcrumbs.push({
            title: item.title,
            url: item.url || undefined,
          });
          breadcrumbs.push({
            title: subItem.title,
            isActive: true,
          });
          return breadcrumbs;
        }
      }
    }
  }

  // If no match found, try to infer from a path
  const pathSegments = currentPath.split('/').filter(Boolean);
  if (pathSegments.length > 0) {
    const lastSegment = pathSegments[pathSegments.length - 1];
    breadcrumbs.push({
      title: lastSegment.charAt(0).toUpperCase() + lastSegment.slice(1),
      isActive: true,
    });
  }

  return breadcrumbs;
}
