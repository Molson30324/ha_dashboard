"""The Advanced Home Dashboard integration."""
import logging
from pathlib import Path

from homeassistant.core import HomeAssistant
from homeassistant.components.http import StaticPathConfig

DOMAIN = "ha_dashboard"
LOGGER = logging.getLogger(__name__)

# Path to static files
BASE_DIR = Path(__file__).parent
WWW_DIR = BASE_DIR / "www"


async def async_setup(hass: HomeAssistant, config: dict) -> bool:
    """Set up the Advanced Home Dashboard component."""
    
    # Register static path for dashboard resources
    hass.http.register_static_path(
        "/ha_dashboard",
        WWW_DIR,
        cache_headers=False,
    )
    
    LOGGER.debug("Advanced Home Dashboard setup complete")
    
    # Store reference in data for use by dashboard
    if DOMAIN not in hass.data:
        hass.data[DOMAIN] = {}
    
    hass.data[DOMAIN]["base_dir"] = BASE_DIR
    
    return True
