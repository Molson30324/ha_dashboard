# Advanced Home Dashboard for Home Assistant

A powerful, native Home Assistant dashboard integration that provides a highly customizable interface with multi-level navigation, real-time entity updates, and persistent customization settings.

## Features

✅ **Native Home Assistant Integration** - Runs directly within Home Assistant's framework  
✅ **Real-Time Updates** - WebSocket integration for live entity state changes  
✅ **Customizable Views** - Organize entities by Areas, Devices, Scripts, Automations, and Scenes  
✅ **Multi-Level Navigation** - Maximum 2 clicks to reach any view with breadcrumb trails  
✅ **Favorite Views** - Pin up to 5 favorite views for quick access  
✅ **Smart Filtering** - Toggle between showing only enabled entities or all entities  
✅ **Persistent Settings** - All customizations are saved and restored  
✅ **Responsive Design** - Works seamlessly on desktop, tablet, and mobile  
✅ **Light Theme** - Clean, modern interface matching Home Assistant's design language  
✅ **Entity Control** - Toggle lights, switches, and run scripts directly from cards  

## Installation

### Via HACS (Recommended)

1. Open Home Assistant and go to **HACS** → **Integrations**
2. Click the **three-dot menu** (⋯) and select **Custom repositories**
3. Add the repository URL: `https://github.com/yourusername/ha_dashboard`
4. Select **Integration** as the category
5. Click **Add** and confirm
6. Search for **Advanced Home Dashboard** and click **Install**
7. Restart Home Assistant
8. Go to **Settings** → **Devices & Services** → **Integrations** and add the integration

### Manual Installation

1. Download the `custom_components/ha_dashboard` folder from the repository
2. Place it in your Home Assistant `custom_components` directory:
   ```
   ~/.homeassistant/custom_components/ha_dashboard/
   ```
3. Restart Home Assistant
4. Go to **Settings** → **Devices & Services** → **Integrations** and add the integration

## Directory Structure

```
ha_dashboard_integration/
├── custom_components/
│   └── ha_dashboard/
│       ├── __init__.py                 # Integration initialization
│       ├── manifest.json               # Integration metadata
│       ├── strings.json                # Localization strings
│       └── www/                        # Frontend resources
│           ├── index.html              # Main HTML entry point
│           ├── ha-dashboard.js         # Main dashboard logic
│           └── ha-dashboard.css        # Styling
├── README.md                            # This file
└── CHANGELOG.md                         # Version history
```

## Configuration

### Adding the Dashboard as a View

After installation, add the dashboard to your views in your `configuration.yaml`:

```yaml
homeassistant:
  customize: {}

http:
  cors_allowed_origins:
    - http://localhost:8123
    - http://192.168.x.x:8123  # Your Home Assistant IP
```

### Accessing the Dashboard

Once installed and Home Assistant is restarted, access the dashboard at:

- **Local Access**: `http://your-home-assistant-ip:8123/ha_dashboard/`
- **Remote Access**: `https://your-domain.duckdns.org/ha_dashboard/`

### First Launch Configuration

On first launch, the dashboard will:
1. Load all entities from your Home Assistant instance
2. Organize them by category (areas, device types, etc.)
3. Set up default favorites with common views
4. Display a smart home page with featured entities

## Usage Guide

### Navigation

- **Top Navigation Bar**: Fixed navigation that stays visible while scrolling
- **Category Buttons**: Click to view all entities in a category
- **Dropdown Menus**: Click the chevron next to categories with subcategories
- **Breadcrumb Trail**: Shows your current path, click any breadcrumb to go back
- **Favorites Dock**: Quick access to your 5 most-used views

### Customization

#### Adding Favorites

1. Navigate to any view
2. Click the star icon (☆) in the top right corner
3. Up to 5 views can be favorited
4. Click the filled star (★) to remove from favorites

#### Enabling/Disabling Filters

1. On any view, click the **"Show All"** or **"Enabled Only"** toggle
2. "Enabled Only" shows only entities marked as enabled in Home Assistant
3. "Show All" displays all entities in that category
4. Your preference is saved per view

#### Entity Control

- **Lights/Switches**: Click "Toggle" button to turn on/off
- **Scripts**: Click "Run" button to execute the script
- **Entity Cards**: Click the card to view more details

### Home Page Customization

The home page displays a curated selection of your most-used entities. To customize:

1. Navigate to views and add entities to your home page via the action menu
2. Entities appear as cards on the home page
3. Reorder entities by dragging (feature coming soon)
4. Your home page configuration is automatically saved

## View Organization

### Areas & Rooms
- **Floors**: All entities organized by floor level
- **Rooms**: All entities organized by room/area within your home

### Devices
- **Device Types**: Entities grouped by type (lights, switches, thermostats, etc.)
- **Devices**: Individual device entities with controls

### Scripts
- Executable scripts from Home Assistant
- Click "Run" to execute

### Automations
- View status of all automations
- Toggle automations on/off

### Scenes
- All scenes in your system
- Click to activate a scene

## Real-Time Updates

The dashboard uses WebSocket connections to receive real-time state updates from Home Assistant. This means:

- Entity states update instantly when changed elsewhere in Home Assistant
- No manual refresh needed
- Changes from physical switches, automations, or other clients appear immediately

## Storage & Persistence

All customization settings are stored using:

1. **Browser LocalStorage** - For immediate, client-side persistence
2. **Home Assistant Config** - For cross-device sync (coming in v1.1)

Your saved settings include:
- Favorite views
- Home page layout
- Entity visibility preferences per view

## Keyboard Shortcuts (Coming Soon)

- `?` - Show help dialog
- `h` - Jump to Home
- `f` - Focus favorites
- `s` - Toggle show all entities
- `Esc` - Close any open menus

## Troubleshooting

### Dashboard Not Loading

1. Check that the integration is installed:
   - Go to **Settings** → **Devices & Services** → **Integrations**
   - Look for "Advanced Home Dashboard"

2. Verify the static files are accessible:
   - Visit `http://your-home-assistant-ip:8123/ha_dashboard/` directly
   - Check Home Assistant logs for errors

3. Clear browser cache:
   - Press `Ctrl+Shift+Delete` (Windows/Linux) or `Cmd+Shift+Delete` (Mac)
   - Clear cached files from the last hour

### Entities Not Appearing

1. Verify the entity exists in Home Assistant:
   - Go to **Developer Tools** → **States**
   - Search for your entity

2. Check entity visibility settings:
   - Click "Show All" toggle to see all entities including hidden ones

3. Ensure the entity is enabled:
   - Go to the entity settings in Home Assistant
   - Check that "Entity enabled" is turned on

### Real-Time Updates Not Working

1. Check WebSocket connection:
   - Open browser Developer Tools (F12)
   - Go to **Console** and look for connection messages

2. Verify Home Assistant is running:
   - Check Home Assistant status in the UI

3. Check browser permissions:
   - Ensure the browser allows WebSocket connections

## Advanced Configuration

### Custom Icons for Entities

Home Assistant automatically selects icons for your entities based on their domain. To customize:

```yaml
homeassistant:
  customize:
    light.living_room:
      icon: mdi:lamp-on
    switch.pump:
      icon: mdi:water-pump
```

### Entity Grouping

Create custom groups to organize entities in your own way:

```yaml
group:
  morning_routine:
    entities:
      - light.bedroom
      - climate.living_room
      - script.coffee_maker
```

### Automations with Dashboard Integration

Create automations that work with your dashboard views:

```yaml
automation:
  - alias: "Light Automation"
    trigger:
      platform: sun
      event: sunset
    action:
      service: light.turn_on
      data:
        entity_id: group.living_room_lights
        brightness: 200
```

## Performance Optimization

- **Large Home Setup** (100+ entities):
  - The dashboard will automatically paginate entities
  - Enable "Show All" only when needed
  - Use favorites to create focused views

- **Slow Connection**:
  - The dashboard works offline and syncs when reconnected
  - Entity updates are batched for efficiency

## Privacy & Security

- **Local Storage**: All customization data is stored in your browser
- **No Cloud**: The dashboard works entirely within your Home Assistant instance
- **Authentication**: Uses your Home Assistant authentication automatically
- **Encrypted Connection**: Use HTTPS for remote access

## API Reference

### State Updates via WebSocket

The dashboard subscribes to Home Assistant's `state_changed` events:

```javascript
// Example: Listening to entity state changes
dashboard.hass.connection.subscribeMessage(
  (message) => {
    if (message.type === 'state_changed') {
      console.log(`${message.data.entity_id} changed to ${message.data.new_state.state}`);
    }
  },
  { type: 'subscribe_events', event_type: 'state_changed' }
);
```

### Calling Services

```javascript
// Example: Toggle a light
dashboard.callService('light', 'toggle', 'light.living_room');
```

## Development

### Local Development Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/ha_dashboard.git
   cd ha_dashboard_integration
   ```

2. Create a symlink in Home Assistant:
   ```bash
   ln -s $(pwd)/custom_components/ha_dashboard ~/.homeassistant/custom_components/
   ```

3. Restart Home Assistant

4. Make changes to `www/ha-dashboard.js` or `www/ha-dashboard.css`

5. Refresh the browser to see changes

### Testing

- Test in different browsers (Chrome, Firefox, Safari)
- Test on different screen sizes (desktop, tablet, mobile)
- Test with different entity counts
- Verify real-time updates are working

## Contributing

Contributions are welcome! Please:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This integration is licensed under the MIT License. See LICENSE file for details.

## Support

- **Issues**: Report bugs on [GitHub Issues](https://github.com/yourusername/ha_dashboard/issues)
- **Discussions**: Ask questions on [GitHub Discussions](https://github.com/yourusername/ha_dashboard/discussions)
- **Home Assistant Community**: Post in [Home Assistant Community](https://community.home-assistant.io/)

## Roadmap

- **v1.1** (Coming soon)
  - Drag-to-reorder entity cards
  - Custom views creation
  - Cross-device sync via Home Assistant storage
  - More entity control options (climate, media player, etc.)

- **v1.2** (Planned)
  - Dashboard templates for common setups
  - Entity history graphs
  - Voice control integration
  - Automation suggestions

- **v2.0** (Future)
  - Desktop app version
  - Mobile app version
  - Voice assistant integration
  - AI-powered entity suggestions

## Changelog

### v1.0.0 (Initial Release)
- Native Home Assistant integration
- Multi-view navigation with breadcrumbs
- Favorite views (up to 5)
- Real-time entity updates via WebSocket
- Persistent customization settings
- Responsive design
- Entity control (toggle lights, switches, run scripts)
- Light theme

## Credits

Built with ❤️ for the Home Assistant community.

---

**Need Help?** Check the [documentation](https://github.com/yourusername/ha_dashboard/wiki) or open an [issue](https://github.com/yourusername/ha_dashboard/issues).
