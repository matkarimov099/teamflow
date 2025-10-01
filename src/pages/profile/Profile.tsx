import { Typography } from '@/components/ui/typography';
import { GitHubUserProfile } from '@/features/profile/components/GitHubUserProfile';
import { RegularUserProfile } from '@/features/profile/components/RegularUserProfile';
import { useGitHubUser } from '@/features/profile/hooks/use-github-user';
import { useAuthContext } from '@/hooks/use-auth-context';

export default function Profile() {
  const { currentUser } = useAuthContext();
  const { data: githubUser, isLoading: isGithubLoading } = useGitHubUser(
    currentUser?.isGithubMember ?? false
  );

  // Loading state
  if (currentUser?.isGithubMember && isGithubLoading) {
    return (
      <div className="container mx-auto py-8">
        <div className="max-w-4xl mx-auto flex items-center justify-center min-h-[400px]">
          <Typography variant="large" className="text-[var(--secondaryLabel)]">
            Loading profile...
          </Typography>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full py-4 px-2">
      {currentUser?.isGithubMember && githubUser?.data ? (
        <GitHubUserProfile user={githubUser.data} />
      ) : currentUser ? (
        <div className="max-w-4xl mx-auto">
          <RegularUserProfile user={currentUser} />
        </div>
      ) : (
        <div className="max-w-4xl mx-auto text-center">
          <Typography variant="h1">Welcome! 👋</Typography>
          <Typography variant="large" className="text-[var(--secondaryLabel)] mt-4">
            Please log in to view your profile
          </Typography>
        </div>
      )}
    </div>
  );
}
