# Quick Start Guide - Advanced Home Dashboard

Get your Advanced Home Dashboard up and running in just a few minutes!

## 5-Minute Installation

### Step 1: Install via HACS

1. Open Home Assistant
2. Go to **HACS** in the left sidebar
3. Click **Integrations**
4. Click the **⋯** menu (three dots) in the top right
5. Select **Custom repositories**
6. Paste this URL: `https://github.com/yourusername/ha_dashboard`
7. Select **Integration** category
8. Click **Add**
9. Search for **Advanced Home Dashboard**
10. Click **Install**

### Step 2: Restart Home Assistant

1. Go to **Settings** → **System** → **Restart**
2. Wait for Home Assistant to restart (2-3 minutes)

### Step 3: Add the Integration

1. Go to **Settings** → **Devices & Services**
2. Click **Create Automation** (bottom right)
3. Look for **Advanced Home Dashboard**
4. Click **Create** (if not visible, refresh the page)

### Step 4: Access the Dashboard

Open your browser and go to:
- **Local**: `http://your-home-assistant-ip:8123/ha_dashboard/`
- **Remote**: `https://your-domain.duckdns.org/ha_dashboard/`

That's it! Your dashboard is ready to use.

## First Time Setup

When you first open the dashboard, it will:

1. **Load your entities** - Automatically discover all devices and entities
2. **Organize by category** - Group them by areas, device types, etc.
3. **Set up smart home page** - Show your most important entities
4. **Save your preferences** - Remember your favorites and settings

## Basic Usage

### Browse Your Home

1. Click **Home** to see your main dashboard
2. Click **Areas** to browse by room or floor
3. Click **Devices** to see all devices grouped by type
4. Click **Scripts** to see and run automation scripts
5. Click **Automations** to see your automation status

### Add Favorites

1. Navigate to any view
2. Click the **☆ star** icon in the top right
3. Up to 5 views can be favorited
4. Your favorites appear in the top navigation

### Control Entities

On any entity card:
- **Lights/Switches**: Click "Toggle" to turn on/off
- **Scripts**: Click "Run" to execute
- **Climate**: View temperature (control coming soon)

### Filter Entities

1. On any view, click **"Show All"** button
2. This toggles between showing only enabled entities vs all entities
3. Your choice is saved for that view

## Common Tasks

### I can't see any entities

**Check 1: Entities are hidden**
- Click "Show All" toggle at the top of any view
- This will show all entities including disabled ones

**Check 2: No entities in that category**
- Try a different view (Areas, Devices, etc.)
- Some categories may be empty if you don't have entities of that type

**Check 3: Entities not discovered**
- Go to **Developer Tools** → **States** in Home Assistant
- Search for your entity to verify it exists
- The entity should appear automatically in the dashboard

### I want to control my climate entity

**Climate control is coming in v1.1!**

For now you can:
1. View your thermostat in the Climate view
2. Control directly in Home Assistant
3. Create scripts to set common temperatures
4. The dashboard will show the current temperature

### I want to reorder entities

**Drag-and-drop is coming in v1.1!**

For now:
1. Use your favorite views to organize
2. Create custom groups in Home Assistant
3. Control the order via Home Assistant's UI

### How do I access from outside my home?

1. Make sure you have remote access set up in Home Assistant
   - Go to **Settings** → **Home Assistant Cloud** (recommended)
   - Or set up your own remote access

2. Access the dashboard:
   - Via Nabu Casa: `https://your-domain.duckdns.org/ha_dashboard/`
   - Or your custom domain: `https://your-domain.com/ha_dashboard/`

## Settings & Configuration

### Customize Your Entities

Edit your `configuration.yaml` to add friendly names and icons:

```yaml
homeassistant:
  customize:
    light.living_room:
      friendly_name: "Living Room Lamp"
      icon: mdi:lamp
```

Then restart Home Assistant.

### Create Custom Groups

Organize related entities into groups:

```yaml
group:
  morning_routine:
    name: "Morning Routine"
    entities:
      - light.bedroom
      - light.kitchen
      - script.start_coffee
```

### Create Scripts for Actions

Run multiple actions with one click:

```yaml
script:
  movie_mode:
    alias: "Movie Mode"
    sequence:
      - service: light.turn_off
        data:
          entity_id: light.living_room
      - service: media_player.turn_on
        data:
          entity_id: media_player.tv
```

## Tips & Tricks

### Organization Tips

- **Use Favorites**: Pin your top 5 most-used views for quick access
- **Create Scripts**: Bundle multiple actions into single-click scripts
- **Group Entities**: Use Home Assistant groups to organize related entities
- **Smart Names**: Give entities clear, descriptive names in the `customize` section

### Performance Tips

- **Large Setup** (100+ entities): Use "Enabled Only" mode to reduce clutter
- **Slow Connection**: The dashboard works offline and syncs when reconnected
- **Mobile**: Use favorites to minimize navigation on smaller screens

### Customization Tips

- **Custom Icons**: Set icons for entities in `configuration.yaml`
- **Friendly Names**: Customize how entities appear in the dashboard
- **Area Setup**: Assign entities to areas in Home Assistant for better organization

## Troubleshooting

### Dashboard won't load

**Try:**
1. Refresh the page (`Ctrl+F5` or `Cmd+Shift+R`)
2. Clear browser cache (see below)
3. Restart Home Assistant
4. Check browser console for errors (F12 → Console)

**Clear browser cache:**
- **Chrome/Firefox**: `Ctrl+Shift+Delete` (Windows) or `Cmd+Shift+Delete` (Mac)
- Select "All time" and check "Cached images and files"

### Real-time updates not working

**Try:**
1. Check WebSocket connection in browser console
2. Restart Home Assistant
3. Disable browser extensions that might block WebSockets

### Entities not appearing

**Try:**
1. Click "Show All" toggle to reveal all entities
2. Go to **Developer Tools** → **States** to verify entity exists
3. Check Home Assistant logs for errors

### Favorites not saving

**Try:**
1. Check browser storage is enabled
2. Disable browser extensions that clear data
3. Try a different browser

## Getting Help

- 📖 **Documentation**: See README.md for detailed documentation
- 🐛 **Report Issues**: Open an issue on GitHub
- 💬 **Ask Questions**: Join the Home Assistant community forum
- ⚡ **Feature Requests**: Suggest ideas on GitHub Discussions

## What's Next?

- Explore all your entities across different views
- Create custom scripts and automations
- Set up your favorite views for quick access
- Check back for new features in upcoming versions

## Roadmap Highlights

- **v1.1**: Drag-to-reorder, climate controls, more entity types
- **v1.2**: Dashboard templates, entity history, voice control
- **v2.0**: Mobile app, desktop app, AI suggestions

---

**Happy automating!** 🏠

Questions? Open an issue or join the Home Assistant community.
