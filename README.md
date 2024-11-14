# PR Viewer

This React application allows you to view open pull requests from GitHub repositories in a GitHub organization. By default, it uses the All-Hands-AI organization.

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

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
