# Git Commit Rules

## Commit Message Format

```
<type>: <subject>

<body>

Authored-By: Dimitri Pisarev <info@dimitripisarev.com>
```

## Types

- **feat**: New feature
- **fix**: Bug fix
- **docs**: Documentation changes
- **style**: Code style changes (formatting, semicolons, etc.)
- **refactor**: Code refactoring
- **perf**: Performance improvements
- **test**: Adding or updating tests
- **chore**: Maintenance tasks

## Subject Line Rules

- Use imperative mood ("Add" not "Added")
- Start with capital letter
- No period at the end
- Keep under 50 characters

## Body Rules

- Wrap at 72 characters
- Explain what and why, not how
- Use present tense
- Optional - only include if additional context needed

## Examples

### Good Examples
```
feat: Add user authentication system

Implemented OAuth2 login with Google and GitHub providers.
Added user session management and protected route middleware.

Authored-By: Dimitri Pisarev <info@dimitripisarev.com>
```

```
fix: Resolve navigation menu overflow on mobile

Authored-By: Dimitri Pisarev <info@dimitripisarev.com>
```

```
perf: Optimize image loading with lazy loading

Authored-By: Dimitri Pisarev <info@dimitripisarev.com>
```

### Bad Examples
```
❌ Added new feature
❌ Fixed bug.
❌ updated documentation
❌ WIP: working on authentication
```

## Setup

The repository includes a `.gitmessage` template. Use:
```bash
git config commit.template .gitmessage
```

This will automatically populate the commit message format when you run `git commit`.