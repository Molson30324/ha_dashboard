# Installation Instructions - Advanced Home Dashboard

This document provides detailed installation instructions for the Advanced Home Dashboard Home Assistant integration.

## System Requirements

- **Home Assistant**: Version 2023.12 or later
- **Browser**: Chrome, Firefox, Safari, or Edge (latest versions)
- **Network**: Local network access to Home Assistant instance

## Installation Methods

### Method 1: HACS Installation (Recommended)

HACS (Home Assistant Community Store) is the easiest way to install and manage custom integrations.

#### Prerequisites
- HACS must be installed in your Home Assistant instance
- [Install HACS](https://hacs.xyz/docs/setup/prerequisites) if you haven't already

#### Installation Steps

1. **Open Home Assistant**
   - Navigate to your Home Assistant instance
   - Make sure you're logged in with an admin account

2. **Access HACS**
   - Click **HACS** in the left sidebar
   - Select **Integrations** tab

3. **Add Custom Repository**
   - Click the **⋯** menu (three dots) in the top right corner
   - Select **Custom repositories**
   - Enter the repository URL:
     ```
     https://github.com/yourusername/ha_dashboard
     ```
   - Select **Integration** as the category
   - Click **Add**

4. **Install the Integration**
   - Search for **Advanced Home Dashboard**
   - Click on it
   - Click **Install**
   - Wait for the installation to complete

5. **Restart Home Assistant**
   - Go to **Settings** → **System** → **Restart**
   - Wait for Home Assistant to restart (2-3 minutes)

6. **Add the Integration**
   - Go to **Settings** → **Devices & Services**
   - Click **Create Automation** (bottom right)
   - Search for **Advanced Home Dashboard**
   - Click **Create**
   - Follow any configuration prompts

7. **Access the Dashboard**
   - Open your browser to:
     - Local: `http://your-home-assistant-ip:8123/ha_dashboard/`
     - Remote: `https://your-domain.duckdns.org/ha_dashboard/`

#### Updating via HACS

When a new version is available:
1. Go to **HACS** → **Integrations**
2. Look for **Advanced Home Dashboard**
3. Click the update button if available
4. Restart Home Assistant

### Method 2: Manual Installation

For advanced users or those without HACS:

#### Installation Steps

1. **Download the Integration**
   ```bash
   # Clone the repository
   git clone https://github.com/yourusername/ha_dashboard.git
   cd ha_dashboard_integration
   ```

2. **Copy to Home Assistant**
   ```bash
   # Copy the custom_components directory
   cp -r custom_components/ha_dashboard ~/.homeassistant/custom_components/
   ```

   Or if you prefer using symlinks for development:
   ```bash
   ln -s $(pwd)/custom_components/ha_dashboard ~/.homeassistant/custom_components/
   ```

3. **Restart Home Assistant**
   - Go to **Settings** → **System** → **Restart**
   - Wait for Home Assistant to restart

4. **Add the Integration**
   - Go to **Settings** → **Devices & Services**
   - Click **Create Automation**
   - Search for **Advanced Home Dashboard**
   - Click **Create**

5. **Access the Dashboard**
   - Open your browser to:
     - `http://your-home-assistant-ip:8123/ha_dashboard/`

### Method 3: Docker Installation

If running Home Assistant in Docker:

1. **Access the Docker Container**
   ```bash
   docker exec -it homeassistant bash
   ```

2. **Copy the Integration**
   ```bash
   cp -r /source/custom_components/ha_dashboard /config/custom_components/
   ```

3. **Restart the Container**
   ```bash
   docker restart homeassistant
   ```

## File Structure

After installation, your Home Assistant `custom_components` directory should look like:

```
~/.homeassistant/
├── custom_components/
│   └── ha_dashboard/
│       ├── __init__.py
│       ├── manifest.json
│       ├── strings.json
│       └── www/
│           ├── index.html
│           ├── ha-dashboard.js
│           └── ha-dashboard.css
├── automations.yaml
├── configuration.yaml
├── scenes.yaml
├── secrets.yaml
└── ...
```

## Configuration

### Minimal Configuration

No configuration is required! The integration works out of the box.

### Recommended Configuration

Add these to your `configuration.yaml` for the best experience:

```yaml
# Enable CORS for dashboard access
http:
  cors_allowed_origins:
    - http://localhost:8123
    - http://127.0.0.1:8123
    - http://192.168.1.100:8123  # Your Home Assistant IP
    # For remote access
    # - https://your-domain.duckdns.org

# Customize entities for better appearance
homeassistant:
  customize:
    light.living_room:
      friendly_name: "Living Room Light"
      icon: mdi:lightbulb
    # Add more customizations as needed
```

### Example: Full Configuration

See `configuration_example.yaml` in the integration folder for a complete example with:
- Entity customization
- Entity groups
- Scripts
- Automations
- Scenes

## Verification

After installation, verify everything is working:

1. **Check Integration Status**
   - Go to **Settings** → **Devices & Services**
   - Look for "Advanced Home Dashboard" in the integrations list
   - It should show as "Enabled"

2. **Verify Static Files**
   - Open browser developer tools (F12)
   - Go to the dashboard URL
   - Check the Console tab for any errors
   - CSS and JS files should load successfully

3. **Test Entity Loading**
   - Navigate to any view in the dashboard
   - Verify that entities appear
   - If no entities show, click "Show All" to include hidden entities

4. **Test Real-Time Updates**
   - Open the dashboard in one window
   - Go to **Developer Tools** → **States** in another window
   - Change an entity state
   - The change should appear instantly in the dashboard

## Troubleshooting Installation

### Integration Not Appearing

**Problem**: The integration doesn't show up in Settings → Devices & Services

**Solutions**:
1. Restart Home Assistant completely
2. Clear browser cache (`Ctrl+Shift+Delete`)
3. Check Home Assistant logs for errors:
   - Go to **Settings** → **System** → **Logs**
   - Look for errors related to `ha_dashboard`

### Dashboard Won't Load

**Problem**: Page shows blank or errors when accessing `/ha_dashboard/`

**Solutions**:
1. Verify the integration is installed:
   ```bash
   ls ~/.homeassistant/custom_components/ha_dashboard/
   ```

2. Check file permissions:
   ```bash
   chmod -R 755 ~/.homeassistant/custom_components/ha_dashboard/
   ```

3. Verify static files are accessible:
   - Go to `http://your-ha-ip:8123/ha_dashboard/ha-dashboard.js`
   - You should see JavaScript code, not an error

4. Check Home Assistant logs:
   - Go to **Settings** → **System** → **Logs**
   - Look for HTTP or static file errors

### Entities Not Showing

**Problem**: Dashboard loads but no entities appear

**Solutions**:
1. Click "Show All" button to reveal all entities
2. Verify entities exist in Home Assistant:
   - Go to **Developer Tools** → **States**
   - Entities should appear in the list
3. Check browser console for errors (F12 → Console)

### Real-Time Updates Not Working

**Problem**: Entity states don't update automatically in the dashboard

**Solutions**:
1. Check WebSocket connection:
   - Open browser DevTools (F12)
   - Go to Network tab
   - Look for WebSocket connections
   - Should see messages flowing

2. Verify browser allows WebSockets:
   - Check browser security settings
   - Disable any VPN or proxy temporarily
   - Try a different browser

3. Check Home Assistant logs for WebSocket errors

## Uninstallation

### Via HACS

1. Go to **HACS** → **Integrations**
2. Find **Advanced Home Dashboard**
3. Click the options menu (⋯)
4. Select **Uninstall**
5. Restart Home Assistant

### Manual Uninstallation

1. Remove the folder:
   ```bash
   rm -rf ~/.homeassistant/custom_components/ha_dashboard/
   ```

2. Restart Home Assistant

## Upgrades & Updates

### Automatic Updates (HACS)

If using HACS, updates are automatic when available. You'll see a notification in HACS when an update is ready.

To manually update via HACS:
1. Go to **HACS** → **Integrations**
2. Find the integration
3. Click the update button
4. Restart Home Assistant

### Manual Updates

1. Download the latest version
2. Replace the files in `custom_components/ha_dashboard/`
3. Restart Home Assistant

## Advanced Configuration

### Custom Icons

Set custom icons for entities in `configuration.yaml`:

```yaml
homeassistant:
  customize:
    light.living_room:
      icon: mdi:floor-lamp
    switch.pump:
      icon: mdi:water-pump
```

### Custom Friendly Names

```yaml
homeassistant:
  customize:
    light.living_room:
      friendly_name: "Main Living Room Light"
    switch.ceiling_fan:
      friendly_name: "Living Room Ceiling Fan"
```

### Organization by Area

Ensure entities are assigned to areas in Home Assistant:
1. Go to **Settings** → **Devices & Services** → **Devices**
2. Click on a device
3. Click **Info** icon (ℹ️)
4. Assign to an area

### Creating Entity Groups

Group related entities:

```yaml
group:
  living_room_lights:
    name: "Living Room Lights"
    entities:
      - light.living_room
      - light.living_room_corner
```

## Performance Optimization

### Large Installations (100+ entities)

- Use "Enabled Only" mode in the dashboard
- Organize entities into custom groups
- Create focused favorite views

### Slow Network Connections

- The dashboard works offline
- Updates sync when reconnected
- Data is cached in browser

## Security Considerations

- The dashboard uses Home Assistant's authentication
- All data stays within your Home Assistant instance
- No cloud connectivity required
- Use HTTPS for remote access

## Getting Support

If you encounter issues:

1. **Check Logs**
   - Go to **Settings** → **System** → **Logs**
   - Look for errors related to `ha_dashboard`

2. **Review Documentation**
   - See README.md for complete documentation
   - See QUICKSTART.md for usage guide

3. **Open an Issue**
   - Visit the GitHub repository
   - Open a new issue with:
     - Home Assistant version
     - Browser and version
     - Steps to reproduce
     - Error messages from logs

4. **Community Help**
   - Post in Home Assistant Community
   - Search existing issues for solutions

## Next Steps

1. Complete the installation
2. Read QUICKSTART.md for usage guide
3. Review configuration_example.yaml for customization ideas
4. Explore all dashboard views and features
5. Set up your favorite views
6. Customize entity names and icons

---

**Installation complete!** Enjoy your Advanced Home Dashboard! 🏠
