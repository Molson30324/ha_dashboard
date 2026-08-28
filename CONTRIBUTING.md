# Contributing to Advanced Home Dashboard

Thank you for your interest in contributing to the Advanced Home Dashboard! This document provides guidelines and instructions for contributing.

## Code of Conduct

Please be respectful and inclusive in all interactions. We're building a welcoming community for all users and developers.

## Ways to Contribute

### 1. Report Bugs

Found a bug? Help us fix it!

**Before reporting:**
- Check existing issues to avoid duplicates
- Try clearing browser cache and restarting Home Assistant
- Verify you're using the latest version

**When reporting:**
- Include Home Assistant version
- Include browser and version
- Provide steps to reproduce
- Attach screenshots if applicable
- Include error messages from logs

**Report here**: [GitHub Issues](https://github.com/yourusername/ha_dashboard/issues)

### 2. Suggest Features

Have an idea for improvement?

**Before suggesting:**
- Check existing issues and discussions
- Ensure it aligns with the project goals
- Think about implementation approach

**When suggesting:**
- Describe the feature clearly
- Explain the use case
- Provide mockups or examples if possible
- Consider potential edge cases

**Suggest here**: [GitHub Discussions](https://github.com/yourusername/ha_dashboard/discussions)

### 3. Improve Documentation

Documentation is crucial! Help us improve it.

**Areas to improve:**
- README.md - Main documentation
- QUICKSTART.md - Quick start guide
- Code comments
- Troubleshooting guides
- Configuration examples

**How to contribute:**
1. Fork the repository
2. Create a branch: `git checkout -b improve-docs`
3. Make changes to documentation
4. Submit a pull request

### 4. Submit Code Changes

Want to fix bugs or add features?

## Development Setup

### Prerequisites

- Home Assistant instance (local or Docker)
- Python 3.7+
- Git
- Text editor or IDE

### Local Development

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/ha_dashboard.git
   cd ha_dashboard_integration
   ```

2. **Create symlink in Home Assistant**
   ```bash
   ln -s $(pwd)/custom_components/ha_dashboard ~/.homeassistant/custom_components/
   ```

3. **Restart Home Assistant**
   - Via UI: Settings → System → Restart
   - Or: `sudo systemctl restart homeassistant`

4. **Enable debug logging**
   ```yaml
   # configuration.yaml
   logger:
     logs:
       custom_components.ha_dashboard: debug
   ```

5. **Open dashboard**
   - Visit: `http://localhost:8123/ha_dashboard/`

### Project Structure

```
ha_dashboard_integration/
├── custom_components/ha_dashboard/
│   ├── __init__.py           # Python backend
│   ├── manifest.json         # Integration metadata
│   └── www/
│       ├── index.html        # HTML entry point
│       ├── ha-dashboard.js   # Main logic (~500 lines)
│       └── ha-dashboard.css  # Styling (~600 lines)
└── docs/                     # Documentation
```

## Code Style

### Python

Follow [PEP 8](https://pep8.org/) style guide:
- Line length: 79 characters
- 4 spaces for indentation
- Descriptive variable names

Example:
```python
async def async_setup(hass: HomeAssistant, config: dict) -> bool:
    """Set up the Advanced Home Dashboard component."""
    
    LOGGER.debug("Setting up Advanced Home Dashboard")
    
    # Setup code here
    
    return True
```

### JavaScript

Follow these guidelines:
- 2 spaces for indentation
- Use `const` and `let` (no `var`)
- Descriptive variable and function names
- Comments for complex logic

Example:
```javascript
async loadEntities() {
  // Get all states from Home Assistant
  const states = await this.hass.callWS({
    type: 'get_states',
  });
  
  // Process states
  states.forEach(state => {
    this.state.entities[state.entity_id] = state;
  });
}
```

### CSS

- Use CSS variables for theming
- BEM naming convention: `.block__element--modifier`
- Mobile-first responsive design
- Consistent spacing and sizing

Example:
```css
.entity-card {
  background-color: var(--card-background-color);
  border-radius: var(--ha-card-border-radius);
  padding: var(--ha-card-padding);
}

.entity-card:hover {
  border-color: var(--state-icon-accent-color);
}
```

## Making Changes

### Branch Naming

Use descriptive branch names:
- Bug fix: `fix/entity-not-loading`
- Feature: `feature/drag-to-reorder`
- Documentation: `docs/improve-readme`
- Chore: `chore/update-deps`

### Commit Messages

Write clear, descriptive commit messages:

```
fix: prevent entities from disappearing on filter toggle

- Add state persistence check
- Verify entity visibility before filtering
- Add unit tests for filter logic
```

Format:
```
<type>: <short description>

<detailed explanation if needed>

- Bullet point 1
- Bullet point 2
```

Types: `fix`, `feature`, `docs`, `style`, `refactor`, `test`, `chore`

### Testing

#### Manual Testing

1. **Test in different views**
   - Home view
   - Areas (Floors, Rooms)
   - Devices (by type, by device)
   - Scripts and Automations

2. **Test responsiveness**
   - Desktop (1920px+)
   - Tablet (768px-1024px)
   - Mobile (480px-768px)

3. **Test real-time updates**
   - Change entity states in Home Assistant
   - Verify updates appear in dashboard

4. **Test persistence**
   - Add favorites
   - Refresh page
   - Verify favorites still there

5. **Test edge cases**
   - No entities
   - Entities with special characters
   - Long entity names
   - Missing attributes

#### Automated Testing (Future)

Coming in v1.1:
- Python unit tests
- JavaScript tests
- Integration tests

## Pull Request Process

### Before Submitting

1. **Update from upstream**
   ```bash
   git fetch origin
   git rebase origin/main
   ```

2. **Test your changes**
   - Restart Home Assistant
   - Test in different browsers
   - Test on different screen sizes
   - Check for console errors

3. **Update documentation**
   - Update README if needed
   - Add comments to complex code
   - Update CHANGELOG

4. **Verify code quality**
   - Check for console warnings
   - Verify no linting errors
   - Follow code style guidelines

### Submitting

1. **Push to your fork**
   ```bash
   git push origin <branch-name>
   ```

2. **Open a pull request**
   - Reference related issues
   - Describe what changed and why
   - Include testing details
   - Add screenshots if UI changes

3. **Respond to feedback**
   - Address reviewer comments
   - Make requested changes
   - Re-test after changes

### PR Guidelines

- Keep PRs focused on one issue/feature
- Include tests if applicable
- Update documentation
- Follow code style guidelines
- Write clear commit messages

**PR Template:**
```markdown
## Description
Brief description of changes

## Related Issues
Fixes #(issue number)

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Documentation update

## Testing
- [ ] Tested in Chrome
- [ ] Tested in Firefox
- [ ] Tested on mobile
- [ ] No console errors

## Screenshots (if applicable)
Add screenshots here

## Checklist
- [ ] Code follows style guidelines
- [ ] Documentation updated
- [ ] No breaking changes
- [ ] Tests added/updated
```

## Reporting Security Issues

**Do not open public issues for security vulnerabilities.**

Email security details to: security@example.com

Include:
- Description of vulnerability
- Steps to reproduce
- Potential impact
- Suggested fix (if known)

## Questions?

- Open a discussion: [GitHub Discussions](https://github.com/yourusername/ha_dashboard/discussions)
- Ask in the forum: [Home Assistant Community](https://community.home-assistant.io/)
- Check existing issues for similar questions

## Recognition

Contributors will be:
- Listed in CONTRIBUTORS.md
- Credited in release notes
- Acknowledged in documentation

## License

By contributing, you agree that your contributions will be licensed under the MIT License.

---

## Development Tips

### Useful Commands

```bash
# Watch for changes (Python)
watchmedo shell-command \
  --patterns="*.py" \
  --recursive \
  --command='systemctl restart homeassistant' \
  custom_components/ha_dashboard/

# View logs
journalctl -u homeassistant -f

# Clear cache
curl -X POST http://localhost:8123/api/
```

### Debugging

**Browser DevTools:**
- F12 to open developer tools
- Console tab for JavaScript errors
- Network tab for API calls
- Application tab for localStorage

**Home Assistant Logs:**
- Settings → System → Logs
- Filter for `ha_dashboard`
- Look for errors and warnings

### Performance

- Monitor entity load times
- Check WebSocket connection
- Verify state update frequency
- Monitor memory usage

---

Thank you for contributing! 🎉

Your contributions help make Advanced Home Dashboard better for everyone.

Happy coding! 💻
