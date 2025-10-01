import { Typography } from '@/components/ui/typography';
import { useAuthContext } from '@/hooks/use-auth-context';
import { Activity, Clock, FolderKanban, TrendingUp, Users } from 'lucide-react';
import { Link } from 'react-router';

export default function Home() {
  const { currentUser } = useAuthContext();

  const stats = [
    {
      title: 'Active Projects',
      value: '12',
      change: '+2 this week',
      icon: FolderKanban,
      color: 'text-blue-500',
    },
    {
      title: 'Team Members',
      value: '48',
      change: '+5 this month',
      icon: Users,
      color: 'text-green-500',
    },
    {
      title: 'Hours Tracked',
      value: '1,248',
      change: '+124 this week',
      icon: Clock,
      color: 'text-purple-500',
    },
    {
      title: 'Productivity',
      value: '94%',
      change: '+8% vs last week',
      icon: TrendingUp,
      color: 'text-orange-500',
    },
  ];

  const quickActions = [
    { title: 'Start Time Tracking', href: '/time-tracking', icon: Clock },
    { title: 'View Projects', href: '/projects', icon: FolderKanban },
    { title: 'Team Analysis', href: '/analysis', icon: Activity },
    { title: 'User Statistics', href: '/user-stats', icon: Users },
  ];

  const recentActivities = [
    { user: 'John Doe', action: 'completed task in', project: 'Mobile App', time: '5 min ago' },
    {
      user: 'Sarah Smith',
      action: 'started working on',
      project: 'Web Dashboard',
      time: '12 min ago',
    },
    { user: 'Mike Johnson', action: 'pushed code to', project: 'API Service', time: '23 min ago' },
    { user: 'Emily Davis', action: 'reviewed PR in', project: 'Frontend', time: '1 hour ago' },
  ];

  return (
    <div className="container py-6">
      {/* Welcome, Section */}
      <div className="mb-8">
        <Typography variant="h1" className="mb-2">
          Welcome back, {currentUser?.firstName || 'User'}!
        </Typography>
        <Typography variant="muted">Here's what's happening with your team today.</Typography>
      </div>

      {/* Stats Grid */}
      <div className="mb-8 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map(stat => (
          <div key={stat.title} className="rounded-lg border bg-card p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <Typography variant="small" className="text-muted-foreground">
                  {stat.title}
                </Typography>
                <Typography variant="h2" className="mt-2">
                  {stat.value}
                </Typography>
                <Typography variant="small" className="mt-1 text-muted-foreground">
                  {stat.change}
                </Typography>
              </div>
              <stat.icon className={`h-8 w-8 ${stat.color}`} />
            </div>
          </div>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Quick Actions */}
        <div className="rounded-lg border bg-card p-6 shadow-sm">
          <Typography variant="h3" className="mb-4">
            Quick Actions
          </Typography>
          <div className="grid gap-3">
            {quickActions.map(action => (
              <Link
                key={action.title}
                to={action.href}
                className="flex items-center gap-3 rounded-md border bg-background p-3 transition-colors hover:bg-accent"
              >
                <action.icon className="h-5 w-5 text-muted-foreground" />
                <Typography variant="p">{action.title}</Typography>
              </Link>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="rounded-lg border bg-card p-6 shadow-sm">
          <Typography variant="h3" className="mb-4">
            Recent Activity
          </Typography>
          <div className="space-y-4">
            {recentActivities.map(activity => (
              <div
                key={`${activity.user}-${activity.project}-${activity.time}`}
                className="flex items-start gap-3"
              >
                <Activity className="mt-1 h-4 w-4 text-muted-foreground" />
                <div className="flex-1">
                  <Typography variant="small">
                    <span className="font-medium">{activity.user}</span> {activity.action}{' '}
                    <span className="font-medium">{activity.project}</span>
                  </Typography>
                  <Typography variant="small" className="text-muted-foreground">
                    {activity.time}
                  </Typography>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
