import { usePageTitle } from '@/hooks/use-page-title.ts';
import { useEffect } from 'react';

interface PageTitleProps {
  title: string;
}

export const PageTitle = ({ title }: PageTitleProps) => {
  const { setTitle } = usePageTitle();

  useEffect(() => {
    setTitle(title);
    document.title = title;
  }, [title, setTitle]);

  return null;
};
