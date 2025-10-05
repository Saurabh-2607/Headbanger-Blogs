---
cover: "./coverimg.png"
title: "Managing Multiple GitHub Accounts on One Machine"
description: "Learn how to configure and use multiple GitHub accounts on a single machine with SSH keys, Git identity management, and conditional configuration."
date: "2025-10-01"
author: "Headbanger"
tags: ["GitHub", "Git", "SSH", "Developer Tools", "Productivity"]
---

When working with both personal and organizational GitHub accounts, you may run into conflicts if you try to use them on the same machine with a single SSH key. This guide explains how to configure multiple SSH keys, set up Git to manage identities, and streamline your workflow with conditional configurations.

---

## Why Do You Need Multiple Accounts?

Many developers maintain a personal GitHub account while also working on projects under an organization. Without proper setup, you might:

- Commit code with the wrong email identity  
- Push changes using the wrong SSH key  
- Run into authentication errors when switching between accounts  

To solve this, we configure **separate SSH keys** and use **Git’s conditional configuration** to switch identities automatically.

---

## 1. Generate Separate SSH Keys

Each GitHub account should have its own SSH key.

### For personal account:
```bash
ssh-keygen -t ed25519 -C "personal-email@example.com" -f ~/.ssh/id_ed25519_personal
```

### For organization account:
```bash
ssh-keygen -t ed25519 -C "org-email@example.com" -f ~/.ssh/id_ed25519_org
```

This creates two sets of keys:
- `~/.ssh/id_ed25519_personal` and `~/.ssh/id_ed25519_personal.pub`
- `~/.ssh/id_ed25519_org` and `~/.ssh/id_ed25519_org.pub`

---

## 2. Add SSH Keys to the Agent

Load both keys into the SSH agent:

```bash
eval "$(ssh-agent -s)"
ssh-add ~/.ssh/id_ed25519_personal
ssh-add ~/.ssh/id_ed25519_org
```

---

## 3. Configure SSH for Multiple Accounts

Edit or create the SSH configuration file:

```bash
nano ~/.ssh/config
```

Add the following:

```ssh
# Personal GitHub
Host github.com-personal
  HostName github.com
  User git
  IdentityFile ~/.ssh/id_ed25519_personal
  IdentitiesOnly yes

# Organization GitHub
Host github.com-org
  HostName github.com
  User git
  IdentityFile ~/.ssh/id_ed25519_org
  IdentitiesOnly yes
```

With this setup, you can now use `github.com-personal` and `github.com-org` as host aliases.

---

## 4. Add Keys to GitHub Accounts

Copy each public key:

```bash
cat ~/.ssh/id_ed25519_personal.pub
cat ~/.ssh/id_ed25519_org.pub
```

- Add the personal key under **GitHub → Settings → SSH and GPG keys** (personal account).  
- Add the organization key under the **organization GitHub account → Settings → SSH and GPG keys**.  

---

## 5. Clone Repositories

When cloning repositories, specify the correct host alias:

- Personal account:
  ```bash
  git clone git@github.com-personal:YourUsername/your-repo.git
  ```

- Organization account:
  ```bash
  git clone git@github.com-org:OrgName/your-repo.git
  ```

---

## 6. Set Global Git Identity

Git requires a user identity for commits. You can set a global identity:

```bash
git config --global user.name "Your Org Name"
git config --global user.email "org-email@example.com"
```

This applies everywhere unless overridden locally.

---

## 7. Conditional Git Config for Multiple Identities

If you want Git to **automatically switch identities based on the repo folder**, use conditional includes.

Edit the global Git configuration:

```bash
nano ~/.gitconfig
```

Set your personal identity as the default:

```ini
[user]
    name = Your Personal Name
    email = personal-email@example.com
```

Add a conditional include for organization repos:

```ini
[includeIf "gitdir:~/work/org/"]
    path = .gitconfig-org
```

Create a new file `~/.gitconfig-org`:

```ini
[user]
    name = Your Org Name
    email = org-email@example.com
```

Now any repository inside `~/work/org/` will use your organization identity automatically.

---

## 8. Update Existing Repository Remotes

If a repository was cloned with the default host, update it:

```bash
git remote set-url origin git@github.com-org:OrgName/repo.git
```

---

## 9. Verify the Setup

Test SSH connections:

```bash
ssh -T git@github.com-personal
ssh -T git@github.com-org
```

GitHub should greet you with the correct account name.

---

## Conclusion

By setting up separate SSH keys, customizing your SSH config, and using Git’s conditional configuration, you can seamlessly manage multiple GitHub accounts on a single machine. This approach ensures that:

- SSH authentication always uses the correct key  
- Commits are attributed to the right identity  
- Switching between personal and organization accounts is effortless  
