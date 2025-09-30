import { getGitHubUser } from '@/features/home/services/github.service.ts';
import { useQuery } from '@tanstack/react-query';

export function useGitHubUser(enabled = true) {
  return useQuery({
    queryKey: ['github-user'],
    queryFn: getGitHubUser,
    enabled,
  });
}
