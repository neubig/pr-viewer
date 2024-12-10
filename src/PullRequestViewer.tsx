


import React, { useState, useEffect } from 'react';
import { Octokit } from '@octokit/rest';
import Select from 'react-select';

const octokit = new Octokit({ auth: import.meta.env.VITE_GITHUB_TOKEN });
const GITHUB_ORG = import.meta.env.VITE_GITHUB_ORG || 'All-Hands-AI';

interface PullRequest {
  title: string;
  html_url: string;
  user: {
    login: string;
  };
  created_at: string;
  updated_at: string;
  number: number;
}

interface Repo {
  value: string;
  label: string;
}

interface SortOption {
  value: keyof PullRequest | 'number' | 'created_at' | 'updated_at';
  label: string;
  direction: 'asc' | 'desc';
}

const sortOptions: SortOption[] = [
  { value: 'created_at', label: 'Creation Date (Newest)', direction: 'desc' },
  { value: 'created_at', label: 'Creation Date (Oldest)', direction: 'asc' },
  { value: 'updated_at', label: 'Last Updated (Newest)', direction: 'desc' },
  { value: 'updated_at', label: 'Last Updated (Oldest)', direction: 'asc' },
  { value: 'number', label: 'PR Number (Highest)', direction: 'desc' },
  { value: 'number', label: 'PR Number (Lowest)', direction: 'asc' },
];

const PullRequestViewer: React.FC = () => {
  const [repos, setRepos] = useState<Repo[]>([]);
  const [selectedRepo, setSelectedRepo] = useState<Repo | null>(null);
  const [pullRequests, setPullRequests] = useState<PullRequest[]>([]);
  const [selectedSort, setSelectedSort] = useState<SortOption>(sortOptions[0]);

  useEffect(() => {
    const fetchRepos = async () => {
      try {
        const response = await octokit.repos.listForOrg({
          org: GITHUB_ORG,
          type: 'all',
        });
        const repoOptions = response.data.map(repo => ({
          value: repo.name,
          label: repo.name,
        }));
        setRepos(repoOptions);
      } catch (error) {
        console.error('Error fetching repos:', error);
      }
    };
    fetchRepos();
  }, []);

  useEffect(() => {
    const fetchPullRequests = async () => {
      if (selectedRepo) {
        try {
          let allPullRequests: PullRequest[] = [];
          let page = 1;
          let hasNextPage = true;

          while (hasNextPage) {
            const response = await octokit.pulls.list({
              owner: GITHUB_ORG,
              repo: selectedRepo.value,
              state: 'open',
              per_page: 100,
              page: page,
            });

            allPullRequests = [...allPullRequests, ...response.data];

            if (response.data.length < 100) {
              hasNextPage = false;
            } else {
              page++;
            }
          }

          setPullRequests(allPullRequests);
        } catch (error) {
          console.error('Error fetching pull requests:', error);
        }
      }
    };
    fetchPullRequests();
  }, [selectedRepo]);

  const sortPullRequests = (prs: PullRequest[]) => {
    return [...prs].sort((a, b) => {
      const aValue = a[selectedSort.value];
      const bValue = b[selectedSort.value];
      
      if (selectedSort.direction === 'asc') {
        return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
      } else {
        return bValue < aValue ? -1 : bValue > aValue ? 1 : 0;
      }
    });
  };

  const sortedPullRequests = sortPullRequests(pullRequests);

  return (
    <div>
      <h1>Pull Request Viewer</h1>
      <div style={{ marginBottom: '1rem' }}>
        <Select
          options={repos}
          value={selectedRepo}
          onChange={(option) => setSelectedRepo(option as Repo)}
          placeholder="Select a repository"
          aria-label="Select a repository"
        />
      </div>
      <div style={{ marginBottom: '1rem' }}>
        <Select
          options={sortOptions}
          value={selectedSort}
          onChange={(option) => setSelectedSort(option as SortOption)}
          placeholder="Sort by"
          aria-label="Sort pull requests"
        />
      </div>
      {sortedPullRequests.length > 0 ? (
        <ul>
          {sortedPullRequests.map((pr) => (
            <li key={pr.html_url}>
              <a href={pr.html_url} target="_blank" rel="noopener noreferrer">
                {pr.title}
              </a>
              {' by '}
              {pr.user.login}
              {' - '}
              Created: {new Date(pr.created_at).toLocaleDateString()}
              {', '}
              Last updated: {new Date(pr.updated_at).toLocaleDateString()}
            </li>
          ))}
        </ul>
      ) : (
        <p>No open pull requests found.</p>
      )}
    </div>
  );
};

export default PullRequestViewer;
