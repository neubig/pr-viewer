

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import PullRequestViewer from './PullRequestViewer';

describe('PullRequestViewer', () => {
  it('renders the component title', () => {
    render(<PullRequestViewer />);
    const titleElement = screen.getByText(/Pull Request Viewer/i);
    expect(titleElement).toBeInTheDocument();
  });

  it('renders the repository select dropdown', () => {
    render(<PullRequestViewer />);
    const selectElement = screen.getByRole('combobox', { name: /select a repository/i });
    expect(selectElement).toBeInTheDocument();
  });

  it('renders the sort select dropdown', () => {
    render(<PullRequestViewer />);
    const sortSelect = screen.getByRole('combobox', { name: /sort pull requests/i });
    expect(sortSelect).toBeInTheDocument();
  });

  it('displays default sort option', () => {
    render(<PullRequestViewer />);
    const defaultOption = screen.getByText('Creation Date (Newest)');
    expect(defaultOption).toBeInTheDocument();
  });

  it('shows all sorting options', async () => {
    render(<PullRequestViewer />);
    const sortSelect = screen.getByRole('combobox', { name: /sort pull requests/i });
    await userEvent.click(sortSelect);

    const expectedOptions = [
      'Creation Date (Newest)',
      'Creation Date (Oldest)',
      'Last Updated (Newest)',
      'Last Updated (Oldest)',
      'PR Number (Highest)',
      'PR Number (Lowest)',
    ];

    expectedOptions.forEach(option => {
      expect(screen.getAllByText(option)[0]).toBeInTheDocument();
    });
  });
});
