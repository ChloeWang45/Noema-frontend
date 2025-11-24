# Contributing to Noēma

Thank you for your interest in contributing to Noēma! This document provides guidelines and instructions for contributing.

## Code of Conduct

- Be respectful and inclusive
- Welcome newcomers and help them learn
- Focus on constructive feedback
- Celebrate diverse perspectives

## How to Contribute

### Reporting Bugs

Before creating bug reports, please check existing issues. When creating a bug report, include:

- **Clear title and description**
- **Steps to reproduce**
- **Expected vs actual behavior**
- **Screenshots** (if applicable)
- **Environment details** (OS, browser, Node version)

### Suggesting Enhancements

Enhancement suggestions are welcome! Include:

- **Clear use case**: Why is this needed?
- **Proposed solution**: How should it work?
- **Alternatives considered**: What else did you think about?
- **Mockups/examples**: Visual aids help!

### Pull Requests

1. **Fork the repository**
2. **Create a feature branch**: `git checkout -b feature/amazing-feature`
3. **Make your changes**
4. **Test thoroughly**
5. **Commit with clear messages**: `git commit -m 'Add amazing feature'`
6. **Push to your fork**: `git push origin feature/amazing-feature`
7. **Open a Pull Request**

## Development Setup

See [SETUP_GUIDE.md](SETUP_GUIDE.md) for detailed instructions.

Quick start:
```bash
./quickstart.sh
```

## Coding Standards

### JavaScript/React

- Use functional components with hooks
- Follow ESLint rules (if configured)
- Use meaningful variable names
- Add comments for complex logic
- Keep components small and focused

**Good:**
```javascript
const NoteCard = ({ note, onDelete }) => {
  const handleDelete = () => {
    if (window.confirm('Delete this note?')) {
      onDelete(note.id);
    }
  };
  
  return (
    <div className="card">
      <p>{note.text}</p>
      <button onClick={handleDelete}>Delete</button>
    </div>
  );
};
```

**Avoid:**
```javascript
const nc = ({ n, d }) => {
  return <div onClick={() => d(n.i)}>{n.t}</div>;
};
```

### CSS/Tailwind

- Use Tailwind utility classes
- Follow the design system colors
- Maintain consistent spacing
- Use custom classes for reusable patterns

**Good:**
```jsx
<button className="btn-primary">
  Generate Insights
</button>
```

**Avoid:**
```jsx
<button style={{backgroundColor: '#5f6b5f', padding: '12px 24px', borderRadius: '8px'}}>
  Generate Insights
</button>
```

### File Organization

```
frontend/src/
├── components/          # One component per file
│   ├── Header.jsx
│   └── NotesList.jsx
├── utils/              # Utility functions (if needed)
├── hooks/              # Custom hooks (if needed)
└── App.jsx             # Main app component
```

## Design Guidelines

### Colors

Stick to the natural color palette:
- Primary: Sage green (`sage-700`)
- Neutral: Stone grays (`stone-50` to `stone-900`)
- Avoid: Neon colors, rainbow gradients

### Typography

- Headings: `font-display` (Playfair Display)
- Body: `font-sans` (Inter) with `font-light` (300)
- Code: `font-mono` (JetBrains Mono)

### Spacing

- Small gaps: `gap-2` or `gap-3`
- Medium gaps: `gap-4` or `gap-6`
- Large gaps: `gap-8` or more

### Animations

- Keep subtle: 200-400ms duration
- Use `ease-out` or `ease-in-out`
- Only animate for purpose, not decoration

## Testing Your Changes

### Manual Testing Checklist

- [ ] Add notes (1, 3, 5, 10 notes)
- [ ] Generate insights
- [ ] Switch between views
- [ ] Delete notes
- [ ] Clear all notes
- [ ] Test error states
- [ ] Check responsive design
- [ ] Verify accessibility

### Cross-Browser Testing

Test in:
- Chrome/Edge (Chromium)
- Firefox
- Safari (if available)

### Accessibility

- Use semantic HTML
- Include ARIA labels
- Test keyboard navigation
- Ensure sufficient color contrast

## Git Commit Messages

Follow this format:

```
type(scope): Brief description

Detailed explanation (optional)

Related issue: #123
```

**Types:**
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting)
- `refactor`: Code refactoring
- `test`: Adding tests
- `chore`: Maintenance tasks

**Examples:**
```
feat(mindmap): Add zoom controls to mind map

fix(api): Handle OpenAI rate limit errors gracefully

docs(readme): Update installation instructions
```

## Pull Request Guidelines

### PR Title

Use the same format as commit messages:
```
feat(component): Add new feature
```

### PR Description Template

```markdown
## Description
Brief summary of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Testing
How did you test this?

## Screenshots
(if applicable)

## Checklist
- [ ] Code follows style guidelines
- [ ] Self-reviewed code
- [ ] Commented complex areas
- [ ] Documentation updated
- [ ] No new warnings
- [ ] Tested locally
```

## Areas for Contribution

### Good First Issues

Perfect for newcomers:
- Documentation improvements
- UI polish and refinements
- Additional sample notes
- Error message improvements
- Accessibility enhancements

### Medium Complexity

- New visualization options
- Export/import functionality
- Keyboard shortcuts
- Performance optimizations
- Mobile responsiveness

### Advanced Features

- User authentication
- Project persistence
- Collaborative editing
- Advanced AI prompts
- Alternative AI models

## Code Review Process

1. **Automated checks**: Must pass (if configured)
2. **Maintainer review**: 1-2 reviewers
3. **Feedback addressed**: Make requested changes
4. **Approval**: PR gets merged
5. **Deployment**: Changes go live

## Community

- **Questions?** Open a discussion
- **Ideas?** Start an issue
- **Help?** Check existing issues and docs

## Recognition

Contributors will be acknowledged in:
- README.md contributors section
- Release notes
- GitHub contributors page

## License

By contributing, you agree that your contributions will be licensed under the MIT License.

---

Thank you for making Noēma better! 🧠✨
