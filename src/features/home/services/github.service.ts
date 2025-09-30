import axiosClient from '@/plugins/axios.ts';
import type { GitHubUser } from '../types.ts';

export async function getGitHubUser() {
  return await axiosClient.get<GitHubUser>('/users/github');
}
