---
title: "How to Submit a Pull Request: A Complete Guide"
description: "Learn the step-by-step process of submitting your first pull request on GitHub, from forking a repository to getting your changes merged."
date: "2025-09-19"
author: "Headbanger"
tags: ["git", "github", "open-source", "pull-request", "version-control", "collaboration"]
---

---

Submitting a pull request (PR) is one of the most fundamental skills every developer should master. Let's walk through the entire process step by step.

## What is a Pull Request?

A pull request is a method of submitting contributions to a project. It allows you to propose changes to a repository and request that the maintainers review and potentially merge your changes into the main codebase.

## Prerequisites

Before we begin, make sure you have:
- A GitHub account
- Git installed on your local machine
- Basic understanding of Git commands
- A project you want to contribute to

## Steps to Submit a Pull Request

### 1. Fork the Repository

The first step is to create your own copy of the project. Navigate to the repository you want to contribute to and click the **"Fork"** button in the top-right corner.


After forking, the URL of the project will change to:
```
https://github.com/<YourUserName>/projectname
```

This creates a complete copy of the original repository under your GitHub account.

### 2. Clone the Forked Repository

Now you need to download your forked repository to your local machine. Copy the URL of your forked repository and run:

```bash
git clone https://github.com/<YourUserName>/<projectname>
```

This creates a local copy of the project on your machine that you can work with.

### 3. Navigate to the Project Directory

Change your current directory to the cloned repository:

```bash
cd projectname
```

### 4. Create a New Branch

**Important:** Never work directly on the main branch. Always create a new branch for your changes:

```bash
git checkout -b your-descriptive-branch-name
```

For example:
```bash
git checkout -b fix-login-bug
```

Choose a descriptive name that explains what your changes do.

### 5. Make Your Changes

Now it's time to implement your contribution:
- Add new features
- Fix bugs
- Update documentation
- Improve existing code

Work on your changes using your preferred code editor.

### 6. Stage Your Changes

After making your changes, check what files have been modified:

```bash
git status
```

Add your changes to the staging area:

```bash
git add .
```

Or add specific files:
```bash
git add filename.js
```

### 7. Commit Your Changes

Create a commit with a clear, descriptive message:

```bash
git commit -m "Add user authentication feature"
```

**Best practices for commit messages:**
- Use present tense ("Add feature" not "Added feature")
- Keep the first line under 50 characters
- Be descriptive but concise
- If needed, add a detailed description after a blank line

### 8. Push Changes to Your Fork

Push your branch to your forked repository on GitHub:

```bash
git push origin your-branch-name
```

For example:
```bash
git push origin fix-login-bug
```

### 9. Create the Pull Request

Navigate to your forked repository on GitHub. You'll see a notification banner with a **"Compare & pull request"** button. Click it.

If you don't see this banner:
1. Go to the original repository
2. Click "New pull request"
3. Click "compare across forks"
4. Select your fork and branch

### 10. Fill Out the Pull Request Form

When creating your PR, provide:

**Title:** A clear, concise summary of your changes

**Description:** Include:
- What changes you made
- Why you made them
- Any relevant issue numbers (e.g., "Fixes #123")
- Screenshots if applicable
- Testing steps

**Example PR description:**
```
## Changes Made
- Added user authentication using JWT tokens
- Implemented login and logout functionality
- Added password validation

## Why These Changes
This addresses issue #45 by providing secure user authentication.

## Testing
- Tested login with valid credentials ✅
- Tested login with invalid credentials ✅
- Verified logout functionality ✅

Fixes #45
```

## What Happens Next?

After submitting your PR:

1. **Automated checks** may run (tests, linting, etc.)
2. **Maintainers review** your code
3. **Feedback** may be provided for improvements
4. **Changes** might be requested
5. **Approval** and merging (if everything looks good)

## Best Practices for Pull Requests

### Before Submitting
- **Read the contributing guidelines** of the project
- **Check existing issues** to avoid duplicate work
- **Keep changes focused** - one PR should address one issue
- **Test your changes** thoroughly
- **Update documentation** if necessary

### During Review
- **Be responsive** to feedback
- **Be open to suggestions** and constructive criticism
- **Make requested changes** promptly
- **Ask questions** if feedback is unclear

### Code Quality
- **Follow the project's coding style**
- **Write meaningful commit messages**
- **Include tests** for new features
- **Remove debugging code** and console logs

## Common Mistakes to Avoid

1. **Working on the main branch** instead of creating a feature branch
2. **Making too many changes** in a single PR
3. **Not testing** your changes before submitting
4. **Poor commit messages** that don't explain the changes
5. **Not following** the project's contribution guidelines
6. **Being defensive** about code review feedback

## Handling Merge Conflicts

Sometimes your PR might have conflicts with the main branch:

1. **Sync your fork** with the original repository:
```bash
git remote add upstream https://github.com/original-owner/original-repo.git
git fetch upstream
git checkout main
git merge upstream/main
```

2. **Rebase your feature branch**:
```bash
git checkout your-branch-name
git rebase main
```

3. **Resolve conflicts** in your editor
4. **Push the updated branch**:
```bash
git push --force-with-lease origin your-branch-name
```

## Benefits of Pull Requests

### For Contributors
- **Safe contribution** without administrative privileges
- **Learn from code reviews** and improve your skills
- **Build your portfolio** and open-source reputation
- **Collaborate** with experienced developers

### For Project Maintainers
- **Quality control** over what gets added to the project
- **Code review process** ensures standards are met
- **Documentation** of what changes were made and why
- **Community building** and collaboration

## After Your PR is Merged

Congratulations! 🎉 Once your PR is merged:

1. **Delete your feature branch** (both locally and on GitHub)
2. **Sync your fork** with the original repository
3. **Celebrate** your contribution to open source!

```bash
# Delete local branch
git branch -d your-branch-name

# Delete remote branch
git push origin --delete your-branch-name
```

## What's Next?

Now that you've mastered the pull request workflow:

- **Look for more issues** to contribute to
- **Help review** other people's PRs
- **Mentor newcomers** in the community
- **Start your own open-source project**
- **Contribute regularly** to build your reputation

## Conclusion

The fork → clone → edit → pull request workflow is the backbone of open-source collaboration. You'll use this process countless times as you contribute to projects, so practice makes perfect!

Remember: every expert was once a beginner. Your first PR might not be perfect, but it's a crucial step in your development journey. The open-source community is generally welcoming and helpful, so don't be afraid to ask questions and learn from feedback.

Happy coding, and welcome to the world of open-source contribution! 🚀

---
