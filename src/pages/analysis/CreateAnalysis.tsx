import { DatePicker } from '@/components/custom/date-picker.tsx';
import { MultiSelect } from '@/components/custom/multi-select.tsx';
import { Stepper, type StepperStep } from '@/components/custom/stepper';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select.tsx';
import { useGetAgents } from '@/features/ai-agents/hooks/use-agents';
import type { Agent } from '@/features/ai-agents/types';
import { AnalysisEmpty } from '@/features/analysis/components/AnalysisEmpty';
import { AnalysisFailed } from '@/features/analysis/components/AnalysisFailed';
import { AnalysisSuccess } from '@/features/analysis/components/AnalysisSuccess';
import { useCheckAnalysisStatus, useCreateAnalysis } from '@/features/analysis/hooks/use-analysis';
import {
  type AnalysisCreateSchema,
  analysisCreateSchema,
} from '@/features/analysis/schema/analysis.schema.ts';
import { useGetProjects } from '@/features/projects/hooks/use-projects';
import type { Project } from '@/features/projects/types';
import { useGetUsers } from '@/features/users/hooks/use-users';
import type { User } from '@/features/users/types';
import { dateToString } from '@/utils/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { Activity, ArrowLeftIcon, BarChart3, GitCommit, Search } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
import { toast } from 'sonner';

const CreateAnalysis = () => {
  const navigate = useNavigate();
  const { mutate: createAnalysis, isPending } = useCreateAnalysis();
  const [analysisId, setAnalysisId] = useState<string | null>(null);
  const [isAnalysisStarted, setIsAnalysisStarted] = useState(false);

  // Check analysis status when analysis is started
  const { data: analysisStatus } = useCheckAnalysisStatus(
    analysisId || '',
    isAnalysisStarted && !!analysisId
  );

  // Fetch projects and agents from API
  const { data: projectsData, isLoading: projectsLoading } = useGetProjects({
    page: 1,
    limit: 100,
  });
  const { data: agentsData, isLoading: agentsLoading } = useGetAgents({
    page: 1,
    limit: 100,
  });
  const { data: usersData, isLoading: usersLoading } = useGetUsers({
    page: 1,
    limit: 100,
  });

  const projects = projectsData?.data ?? [];
  const agents = agentsData?.data ?? [];
  const users = usersData?.data.data ?? [];

  // Prepare user options for MultiSelect
  const userOptions = users.map((user: User) => ({
    value: user.id,
    label: `${user.firstName} ${user.lastName} (${user.email})`,
  }));

  const form = useForm<AnalysisCreateSchema>({
    resolver: zodResolver(analysisCreateSchema()),
    defaultValues: {
      projectId: '',
      agentId: '',
      userIds: [],
      from: undefined,
      to: undefined,
    },
  });

  // Handle analysis status changes
  useEffect(() => {
    if (analysisStatus === 'success') {
      toast.success('Analysis completed successfully!');
    } else if (analysisStatus === 'failed') {
      toast.error('Analysis failed. Please try again.');
      // Don't reset isAnalysisStarted here - let the user see the failed section
    }
  }, [analysisStatus]);

  function onSubmit(data: AnalysisCreateSchema) {
    // Convert dates to YYYY-MM-DD format for API
    const payload = {
      projectId: data.projectId,
      agentId: data.agentId,
      userIds: data.userIds,
      from: dateToString(data.from),
      to: dateToString(data.to),
    };

    createAnalysis(payload, {
      onSuccess: response => {
        toast.success(response?.message || 'Analysis started successfully');
        setAnalysisId(response.id);
        setIsAnalysisStarted(true);
      },
      onError: error => {
        toast.error(error.message || 'Failed to start analysis');
      },
    });
  }

  // Get all status steps
  const getStatusSteps = (): StepperStep[] => {
    const steps = [
      {
        key: 'started',
        icon: Activity,
        title: 'Analysis Started',
        description: 'Initializing analysis process',
      },
      {
        key: 'get_commits',
        icon: GitCommit,
        title: 'Fetching Commits',
        description: 'Retrieving commit history from repository',
      },
      {
        key: 'get_commit_details',
        icon: Search,
        title: 'Processing Details',
        description: 'Analyzing commit details and changes',
      },
      {
        key: 'analyzing',
        icon: BarChart3,
        title: 'Data Analysis',
        description: 'Running AI analysis on collected data',
      },
    ];

    return steps.map((step, index) => {
      let status: 'completed' | 'current' | 'pending' = 'pending';

      if (!isAnalysisStarted) {
        status = 'pending';
      } else if (analysisStatus === 'success' || analysisStatus === 'failed') {
        status = 'completed';
      } else {
        const currentStepIndex = steps.findIndex(s => s.key === analysisStatus);
        if (index < currentStepIndex) {
          status = 'completed';
        } else if (index === currentStepIndex) {
          status = 'current';
        }
      }

      return { ...step, status };
    });
  };

  const statusSteps = getStatusSteps();

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-6 py-4">
        {/* Header */}
        <div className="mb-4">
          <Button variant="ghost" onClick={() => navigate('/analysis')} className="mb-4">
            <ArrowLeftIcon className="h-4 w-4 mr-2" />
            Back to Analysis
          </Button>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Form Section */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">Analysis Configuration</CardTitle>
                <CardDescription className="text-base">
                  Configure the parameters for your analysis. All fields are required.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    {/* Project and Agent Selection */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="projectId"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-base font-semibold">Project</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger size="lg" className="w-full">
                                  <SelectValue
                                    placeholder={
                                      projectsLoading ? 'Loading projects...' : 'Select a project'
                                    }
                                  />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {projects.map((project: Project) => (
                                  <SelectItem key={project.id} value={project.id}>
                                    {project.name}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="agentId"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-base font-semibold">AI Agent</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger size="lg" className="w-full">
                                  <SelectValue
                                    placeholder={
                                      agentsLoading ? 'Loading agents...' : 'Select an agent'
                                    }
                                  />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {agents.map((agent: Agent) => (
                                  <SelectItem key={agent.id} value={agent.id}>
                                    {agent.name}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    {/* Date Range */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="from"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-base font-semibold">From Date</FormLabel>
                            <FormControl>
                              <DatePicker
                                size="lg"
                                date={field.value}
                                onDateSelect={field.onChange}
                                placeholder="Select from date"
                                className="w-full"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="to"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-base font-semibold">To Date</FormLabel>
                            <FormControl>
                              <DatePicker
                                size="lg"
                                date={field.value}
                                onDateSelect={field.onChange}
                                placeholder="Select to date"
                                className="w-full"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    {/* Users Selection */}
                    <FormField
                      control={form.control}
                      name="userIds"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-base font-semibold">Users</FormLabel>
                          <FormControl>
                            <MultiSelect
                              size="lg"
                              options={userOptions}
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                              placeholder={
                                usersLoading ? 'Loading users...' : 'Select users for analysis'
                              }
                              maxCount={10}
                              disabled={usersLoading}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="flex flex-col sm:flex-row sm:justify-end gap-3 pt-4">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => navigate('/analysis')}
                        disabled={isPending || isAnalysisStarted}
                        className="w-full sm:w-auto px-6 py-2.5"
                      >
                        Cancel
                      </Button>
                      <Button
                        type="submit"
                        variant="primary"
                        disabled={isPending || isAnalysisStarted}
                        className="w-full sm:w-auto px-6 py-2.5"
                      >
                        {isPending
                          ? 'Starting Analysis...'
                          : isAnalysisStarted
                            ? 'Analysis in Progress...'
                            : 'Start Analysis'}
                      </Button>
                    </div>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </div>

          {/* Status Section */}
          <div className="space-y-6">
            {/* Show Stepper only during progress (not success/failed) */}
            {isAnalysisStarted && analysisStatus !== 'success' && analysisStatus !== 'failed' && (
              <Card className="h-full">
                <CardHeader className="pb-4">
                  <CardTitle className="text-xl flex items-center gap-3">
                    <Activity className="h-5 w-5 text-blue-600" />
                    Analysis Progress
                  </CardTitle>
                  <CardDescription>Track the real-time progress of your analysis</CardDescription>
                </CardHeader>
                <CardContent>
                  <Stepper steps={statusSteps} size="md" />
                </CardContent>
              </Card>
            )}

            {/* Final Status - Success/Failed (replaces stepper) */}
            {analysisStatus === 'success' && (
              <AnalysisSuccess
                onStartNew={() => {
                  setIsAnalysisStarted(false);
                  setAnalysisId(null);
                }}
              />
            )}

            {analysisStatus === 'failed' && (
              <AnalysisFailed
                onRetry={() => {
                  setIsAnalysisStarted(false);
                  setAnalysisId(null);
                }}
              />
            )}

            {!isAnalysisStarted && <AnalysisEmpty />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateAnalysis;
