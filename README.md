# PR Viewer

A modern, responsive React application that provides a streamlined interface for viewing and managing pull requests across multiple repositories in a GitHub organization. By default, it uses the All-Hands-AI organization, but it can be configured to work with any GitHub organization.

## Features

- **Organization-wide PR Overview**: View all open pull requests across multiple repositories in a single dashboard
- **Real-time Updates**: Automatically refreshes pull request data to show the latest status
- **Filtering and Sorting**: 
  - Filter PRs by repository, author, or review status
  - Sort PRs by creation date, update date, or number of comments
- **Quick Access**:
  - Direct links to PR discussions and diffs
  - One-click access to repository details
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Customizable**: Easy configuration for different GitHub organizations

## Architecture

The application is built using:
- **React** with TypeScript for type safety and better developer experience
- **Vite** as the build tool for fast development and optimized production builds
- **React Query** for efficient data fetching and caching
- **GitHub REST API** for retrieving repository and pull request data
- **Tailwind CSS** for responsive and maintainable styling

## Setup

1. Clone the repository
2. Install dependencies: `npm install`
3. Create a `.env` file in the root directory and add your configuration:
   ```
   # Required: GitHub token for API access
   VITE_GITHUB_TOKEN=your_github_token_here
   
   # Optional: GitHub organization to fetch repositories from (defaults to All-Hands-AI)
   VITE_GITHUB_ORG=your_github_org_here
   ```
4. Run the development server: `npm run dev`
5. Open your browser and navigate to the URL provided by Vite (usually http://localhost:5173)

## Running Tests

To run the tests, use the command: `npm test`

## Building for Production

To build the app for production, use: `npm run build`

## Note

Make sure to replace `your_github_token_here` with an actual GitHub personal access token that has the necessary permissions to read repository and pull request information from the target organization.

## Contributing

We welcome contributions to PR Viewer! Here's how you can help:

1. **Report Issues**: Open an issue for any bugs or feature requests
2. **Submit Pull Requests**: 
   - Fork the repository
   - Create a feature branch (`git checkout -b feature/amazing-feature`)
   - Commit your changes (`git commit -m 'Add amazing feature'`)
   - Push to your branch (`git push origin feature/amazing-feature`)
   - Open a Pull Request

### Development Guidelines

- Follow the existing code style and TypeScript conventions
- Write tests for new features using Vitest
- Update documentation as needed
- Keep commits focused and write clear commit messages
- Run tests locally before submitting PRs

### Code Quality

- Run linting: `npm run lint`
- Run type checking: `npm run typecheck`
- Format code: `npm run format`

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
