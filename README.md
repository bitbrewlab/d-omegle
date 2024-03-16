# Domegle Application

Welcome to the Domegle application project! This document provides all the information you need to get started as a contributor. Our project is committed to fostering an inclusive and welcoming environment for everyone. Before contributing, please take a moment to read through this README to understand our project's setup, contribution guidelines, and workflow.

## Getting Started

To get started with contributing to the Domegle application, please follow the steps below. This will ensure that your contributions are aligned with our project standards and workflows.

### 1. Forking the Repository (For Non-Team Members)

If you're not a member of the contributor team, you'll need to fork the repository first. This creates a copy of the repository under your GitHub account, allowing you to work independently.

- Navigate to the GitHub page of the project.
- In the top-right corner of the page, click the **Fork** button.

After forking, you'll work on your copy of the repository. Later, you can submit a pull request to the main repository.

### 2. Cloning the Repository

To work on the project, clone the repository to your local machine. If you've forked the repository, make sure to clone your fork.

```bash
git clone https://github.com/yourusername/domegle.git
cd domegle
```

Replace `yourusername` with your GitHub username.

### 3. Setting Up the Development Environment

Before making any changes, set up the project's development environment:

```bash

# Install the necessary dependencies

npm install
```

Ensure you have Node.js and npm installed on your local machine before running the command above.

### 4. Creating a Feature Branch

Our workflow requires that all changes be made in a feature branch labeled with a ticket number. To create a new feature branch:

```bash
git checkout -b feature/<ticket-number>
```

Replace `<ticket-number>` with the actual ticket number associated with the task you're working on.

### 5. Making Changes

With your environment set up and your feature branch ready, you're all set to start contributing:

- Make your changes in the feature branch you've created.
- Commit your changes using descriptive commit messages.

### 6. Pushing Changes and Creating a Pull Request

Once you've completed your changes:

```bash
git push origin feature/<ticket-number>
```

Then, go to the GitHub page of the original repository (or your fork, if you're not a team member) and create a new pull request. Make sure to:

- Set the base repository to `domegle/domegle` and the base branch to `main`.
- Assign the pull request to the repository owner or another team member for review.

## Contribution Guidelines

To maintain the quality of our codebase and ensure consistency, please adhere to the following guidelines when contributing:

- **Code Style:** Follow the coding standards and style guidelines specified in our [Code Style Guide](URL-to-code-style-guide).
- **Commit Messages:** Write clear, concise commit messages that describe the changes made.
- **Pull Request Reviews:** Respond to comments and requests for changes during the pull request review process promptly.

## Getting Help

If you have any questions or need assistance, please open an issue in the repository, and someone from the team will get back to you as soon as possible.

## Code of Conduct

We are committed to providing a welcoming and inclusive experience for everyone. Please read our [Code of Conduct](URL-to-code-of-conduct) to understand what behavior is encouraged and discouraged in our community.

Thank you for contributing to the Domegle application! Your efforts help us build a better project for everyone.
