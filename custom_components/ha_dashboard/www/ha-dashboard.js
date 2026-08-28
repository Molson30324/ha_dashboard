/**
 * Advanced Home Dashboard for Home Assistant
 * Native integration with Home Assistant's websocket API and state management
 */

class AdvancedHADashboard {
  constructor() {
    this.hass = null;
    this.state = {
      currentView: 'home',
      breadcrumbs: [{ label: 'Home', view: 'home' }],
      expandedCategory: null,
      showAllEntities: false,
      favorites: [],
      homePageItems: [],
      entities: {},
      categories: {},
      viewConfig: {},
    };
    
    this.categories = [
      { id: 'home', label: 'Home', icon: 'mdi:home' },
      { id: 'areas', label: 'Areas', icon: 'mdi:map-marker', subcategories: ['Floors', 'Rooms'] },
      { id: 'devices', label: 'Devices', icon: 'mdi:devices', subcategories: ['Device Types', 'Devices'] },
      { id: 'scripts', label: 'Scripts', icon: 'mdi:play-circle', subcategories: null },
      { id: 'automations', label: 'Automations', icon: 'mdi:alarm', subcategories: null },
      { id: 'scenes', label: 'Scenes', icon: 'mdi:camera-multiple', subcategories: null },
      { id: 'other', label: 'Other', icon: 'mdi:folder-multiple', subcategories: null },
    ];
    
    this.init();
  }

  /**
   * Initialize the dashboard and connect to Home Assistant
   */
  async init() {
    // Load persisted settings from localStorage
    this.loadPersistedState();
    
    // Wait for Home Assistant API to be available
    if (window.hassWS) {
      this.hass = window.hassWS;
      this.subscribeToStateChanges();
      await this.loadEntities();
      this.render();
    } else {
      // If not available yet, wait and retry
      setTimeout(() => this.init(), 500);
    }
  }

  /**
   * Load persisted state from localStorage (or Home Assistant storage)
   */
  loadPersistedState() {
    const saved = localStorage.getItem('ha_dashboard_state');
    if (saved) {
      const savedState = JSON.parse(saved);
      this.state = { ...this.state, ...savedState };
    }
  }

  /**
   * Save state to localStorage
   */
  savePersistedState() {
    const stateToSave = {
      favorites: this.state.favorites,
      homePageItems: this.state.homePageItems,
      viewConfig: this.state.viewConfig,
    };
    localStorage.setItem('ha_dashboard_state', JSON.stringify(stateToSave));
  }

  /**
   * Subscribe to Home Assistant state changes for real-time updates
   */
  subscribeToStateChanges() {
    if (!this.hass) return;

    // Listen to all state changes
    this.hass.connection.subscribeMessage(
      (message) => {
        if (message.type === 'state_changed') {
          const { entity_id, new_state } = message.data;
          if (new_state) {
            this.state.entities[entity_id] = new_state;
            this.render();
          }
        }
      },
      { type: 'subscribe_events', event_type: 'state_changed' }
    );
  }

  /**
   * Load all entities from Home Assistant
   */
  async loadEntities() {
    if (!this.hass) return;

    try {
      // Get all states from Home Assistant
      const states = await this.hass.callWS({
        type: 'get_states',
      });

      states.forEach(state => {
        this.state.entities[state.entity_id] = state;
      });

      // Organize by area and floor
      this.organizeEntities();
    } catch (error) {
      console.error('Error loading entities:', error);
    }
  }

  /**
   * Organize entities by area, floor, device type, etc.
   */
  organizeEntities() {
    const categories = {
      floors: new Set(),
      rooms: new Map(),
      deviceTypes: new Set(),
      devices: new Map(),
      scripts: [],
      automations: [],
      scenes: [],
      other: [],
    };

    Object.values(this.state.entities).forEach(entity => {
      const entityId = entity.entity_id;
      const attributes = entity.attributes || {};
      const domain = entityId.split('.')[0];

      // Categorize by domain
      if (domain === 'script') {
        categories.scripts.push(entity);
      } else if (domain === 'automation') {
        categories.automations.push(entity);
      } else if (domain === 'scene') {
        categories.scenes.push(entity);
      } else {
        // Organize by area/floor if available
        if (attributes.area_id) {
          const area = attributes.area_id;
          if (!categories.rooms.has(area)) {
            categories.rooms.set(area, []);
          }
          categories.rooms.get(area).push(entity);
        }

        // Organize by device type
        const deviceType = attributes.device_class || domain;
        if (!categories.devices.has(deviceType)) {
          categories.devices.set(deviceType, []);
        }
        categories.devices.get(deviceType).push(entity);

        // Add to other category
        categories.other.push(entity);
      }

      // Collect floors
      if (attributes.area_id) {
        categories.floors.add(attributes.area_id);
      }
    });

    this.state.categories = categories;
  }

  /**
   * Navigate to a view
   */
  navigate(categoryId, subcategory = null) {
    const category = this.categories.find(c => c.id === categoryId);
    const newBreadcrumbs = [{ label: 'Home', view: 'home' }];

    if (categoryId !== 'home') {
      newBreadcrumbs.push({ label: category.label, view: categoryId });
      if (subcategory) {
        newBreadcrumbs.push({ label: subcategory, view: `${categoryId}-${subcategory}` });
      }
      this.state.currentView = subcategory ? `${categoryId}-${subcategory}` : categoryId;
    } else {
      this.state.currentView = 'home';
    }

    this.state.breadcrumbs = newBreadcrumbs;
    this.state.expandedCategory = null;
    this.render();
  }

  /**
   * Toggle favorite view
   */
  toggleFavorite(viewId) {
    const idx = this.state.favorites.indexOf(viewId);
    if (idx >= 0) {
      this.state.favorites.splice(idx, 1);
    } else if (this.state.favorites.length < 5) {
      this.state.favorites.push(viewId);
    }
    this.savePersistedState();
    this.render();
  }

  /**
   * Check if view is favorite
   */
  isFavorite(viewId) {
    return this.state.favorites.includes(viewId);
  }

  /**
   * Get entities for current view
   */
  getEntitiesForView() {
    if (this.state.currentView === 'home') return [];

    const [category, subcategory] = this.state.currentView.split('-');
    let entities = [];

    if (category === 'areas') {
      if (subcategory === 'Floors') {
        return Array.from(this.state.categories.floors || []);
      } else if (subcategory === 'Rooms') {
        return Array.from(this.state.categories.rooms?.keys() || []);
      }
    } else if (category === 'devices') {
      if (subcategory === 'DeviceTypes') {
        return Array.from(this.state.categories.devices?.keys() || []);
      } else if (subcategory === 'Devices') {
        return Object.values(this.state.entities).filter(e => 
          !['script', 'automation', 'scene'].includes(e.entity_id.split('.')[0])
        );
      }
    } else if (category === 'scripts') {
      entities = this.state.categories.scripts || [];
    } else if (category === 'automations') {
      entities = this.state.categories.automations || [];
    } else if (category === 'scenes') {
      entities = this.state.categories.scenes || [];
    } else if (category === 'other') {
      entities = this.state.categories.other || [];
    }

    // Filter by enabled/visible if not showing all
    if (!this.state.showAllEntities) {
      entities = entities.filter(e => {
        const domain = e.entity_id.split('.')[0];
        // Show by default, hide sensors unless enabled
        return domain !== 'sensor' || e.attributes?.enabled !== false;
      });
    }

    return entities;
  }

  /**
   * Call a service (for scripts, automations, toggles, etc.)
   */
  async callService(domain, service, entityId, serviceData = {}) {
    if (!this.hass) return;

    try {
      await this.hass.callService(domain, service, {
        entity_id: entityId,
        ...serviceData,
      });
    } catch (error) {
      console.error('Error calling service:', error);
    }
  }

  /**
   * Toggle an entity (light, switch, etc.)
   */
  toggleEntity(entityId) {
    const domain = entityId.split('.')[0];
    if (domain === 'light' || domain === 'switch') {
      this.callService(domain, 'toggle', entityId);
    } else if (domain === 'script') {
      this.callService('script', 'turn_on', entityId);
    }
  }

  /**
   * Render the dashboard UI
   */
  render() {
    const container = document.getElementById('ha-dashboard-container');
    if (!container) return;

    container.innerHTML = this.getHTML();
    this.attachEventListeners();
  }

  /**
   * Generate HTML for the dashboard
   */
  getHTML() {
    return `
      <div class="ha-dashboard">
        ${this.getTopNavHTML()}
        <div class="dashboard-main">
          ${this.getContentHTML()}
        </div>
      </div>
    `;
  }

  /**
   * Generate top navigation HTML
   */
  getTopNavHTML() {
    return `
      <nav class="ha-dashboard-nav">
        <div class="nav-container">
          <div class="nav-top">
            <div class="nav-logo">
              <ha-icon icon="mdi:home-assistant"></ha-icon>
              <span>HA Dashboard</span>
            </div>

            <div class="favorites">
              ${this.state.favorites.map(fav => `
                <button class="nav-button" data-navigate="${fav}">
                  <ha-icon icon="mdi:star" style="color: var(--state-icon-accent-color);"></ha-icon>
                  <span>${fav}</span>
                </button>
              `).join('')}
            </div>

            <div class="nav-categories">
              ${this.categories.map(cat => `
                <div class="nav-item">
                  <button class="nav-button ${this.state.currentView === cat.id ? 'active' : ''}" data-toggle-category="${cat.id}">
                    <ha-icon icon="${cat.icon}"></ha-icon>
                    <span>${cat.label}</span>
                    ${cat.subcategories ? '<ha-icon icon="mdi:chevron-down" class="chevron"></ha-icon>' : ''}
                  </button>
                  ${cat.subcategories && this.state.expandedCategory === cat.id ? `
                    <div class="dropdown">
                      ${cat.subcategories.map(sub => `
                        <button class="dropdown-item" data-navigate="${cat.id}" data-subcategory="${sub}">
                          ${sub}
                        </button>
                      `).join('')}
                    </div>
                  ` : ''}
                </div>
              `).join('')}
            </div>

            ${this.state.currentView !== 'home' ? `
              <button class="fav-button ${this.isFavorite(this.state.currentView.split('-')[0]) ? 'favorited' : ''}" 
                      data-toggle-fav="${this.state.currentView.split('-')[0]}"
                      title="Add to favorites">
                <ha-icon icon="${this.isFavorite(this.state.currentView.split('-')[0]) ? 'mdi:star' : 'mdi:star-outline'}"></ha-icon>
              </button>
            ` : ''}
          </div>

          ${this.state.breadcrumbs.length > 1 ? `
            <div class="breadcrumbs">
              ${this.state.breadcrumbs.map((bc, idx) => `
                ${idx > 0 ? '<ha-icon icon="mdi:chevron-right" class="breadcrumb-sep"></ha-icon>' : ''}
                <button class="breadcrumb-button" data-navigate="${bc.view}">${bc.label}</button>
              `).join('')}
            </div>
          ` : ''}
        </div>
      </nav>
    `;
  }

  /**
   * Generate content area HTML
   */
  getContentHTML() {
    if (this.state.currentView === 'home') {
      return this.getHomeHTML();
    }
    return this.getViewHTML();
  }

  /**
   * Generate home page HTML
   */
  getHomeHTML() {
    return `
      <div class="dashboard-content">
        <h1>Home Dashboard</h1>
        <p class="subtitle">Welcome back. Customize this page by adding your favorite entities.</p>
        
        ${this.state.homePageItems.length > 0 ? `
          <div class="entity-grid">
            ${this.state.homePageItems.map(item => {
              const entity = this.state.entities[item.id];
              return entity ? this.getEntityCardHTML(entity) : '';
            }).join('')}
          </div>
        ` : `
          <div class="empty-state">
            <ha-icon icon="mdi:home-outline"></ha-icon>
            <p>No items on your home page yet.</p>
            <p class="text-secondary">Start by visiting other views and adding favorites.</p>
          </div>
        `}
      </div>
    `;
  }

  /**
   * Generate view page HTML
   */
  getViewHTML() {
    const viewEntities = this.getEntitiesForView();
    const title = this.state.breadcrumbs[this.state.breadcrumbs.length - 1].label;

    return `
      <div class="dashboard-content">
        <div class="view-header">
          <h1>${title}</h1>
          <button class="toggle-button" data-toggle-show-all>
            ${this.state.showAllEntities ? 'Enabled Only' : 'Show All'}
          </button>
        </div>

        ${viewEntities.length > 0 ? `
          <div class="entity-grid">
            ${viewEntities.map(entity => this.getEntityCardHTML(entity)).join('')}
          </div>
        ` : `
          <div class="empty-state">
            <ha-icon icon="mdi:folder-open"></ha-icon>
            <p>No entities found in this view.</p>
          </div>
        `}
      </div>
    `;
  }

  /**
   * Generate entity card HTML
   */
  getEntityCardHTML(entity) {
    const domain = entity.entity_id.split('.')[0];
    const friendlyName = entity.attributes?.friendly_name || entity.entity_id;
    const state = entity.state;
    const stateClass = state === 'off' || state === 'unavailable' ? 'off' : 'on';

    return `
      <div class="entity-card" data-entity-id="${entity.entity_id}">
        <div class="entity-header">
          <div class="entity-info">
            <div class="entity-icon">
              <ha-icon icon="${this.getEntityIcon(entity)}"></ha-icon>
            </div>
            <div>
              <p class="entity-name">${friendlyName}</p>
              <p class="entity-meta">${domain} • ${state}</p>
            </div>
          </div>
          <div class="entity-state ${stateClass}">
            ${state}
          </div>
        </div>
        ${['light', 'switch', 'script'].includes(domain) ? `
          <div class="entity-actions">
            <button class="action-button" data-toggle-entity="${entity.entity_id}">
              ${domain === 'script' ? 'Run' : 'Toggle'}
            </button>
          </div>
        ` : ''}
      </div>
    `;
  }

  /**
   * Get appropriate icon for entity based on domain
   */
  getEntityIcon(entity) {
    const domain = entity.entity_id.split('.')[0];
    const customIcon = entity.attributes?.icon;

    if (customIcon) return customIcon;

    const iconMap = {
      light: 'mdi:lightbulb',
      switch: 'mdi:toggle-switch',
      climate: 'mdi:thermostat',
      sensor: 'mdi:gauge',
      binary_sensor: 'mdi:checkbox-marked-circle',
      script: 'mdi:play-circle',
      automation: 'mdi:alarm',
      scene: 'mdi:palette',
      lock: 'mdi:lock',
      cover: 'mdi:window-shade',
      media_player: 'mdi:play-circle',
    };

    return iconMap[domain] || 'mdi:folder';
  }

  /**
   * Attach event listeners to rendered elements
   */
  attachEventListeners() {
    // Navigation buttons
    document.querySelectorAll('[data-navigate]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const categoryId = btn.dataset.navigate;
        const subcategory = btn.dataset.subcategory || null;
        this.navigate(categoryId, subcategory);
      });
    });

    // Category toggles
    document.querySelectorAll('[data-toggle-category]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const categoryId = btn.dataset.toggleCategory;
        const category = this.categories.find(c => c.id === categoryId);
        
        if (category.subcategories) {
          this.state.expandedCategory = this.state.expandedCategory === categoryId ? null : categoryId;
          this.render();
        } else {
          this.navigate(categoryId);
        }
      });
    });

    // Favorite toggle
    document.querySelectorAll('[data-toggle-fav]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const viewId = btn.dataset.toggleFav;
        this.toggleFavorite(viewId);
      });
    });

    // Show all toggle
    document.querySelector('[data-toggle-show-all]')?.addEventListener('click', (e) => {
      e.preventDefault();
      this.state.showAllEntities = !this.state.showAllEntities;
      this.render();
    });

    // Entity toggles
    document.querySelectorAll('[data-toggle-entity]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const entityId = btn.dataset.toggleEntity;
        this.toggleEntity(entityId);
      });
    });
  }
}

// Initialize when document is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    window.advancedHADashboard = new AdvancedHADashboard();
  });
} else {
  window.advancedHADashboard = new AdvancedHADashboard();
}
