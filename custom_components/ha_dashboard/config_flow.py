"""Config flow for Advanced Home Dashboard integration."""
import logging
from typing import Any, Dict, Optional

import voluptuous as vol
from homeassistant import config_entries
from homeassistant.core import HomeAssistant
from homeassistant.data_entry_flow import FlowResult

_LOGGER = logging.getLogger(__name__)

DOMAIN = "ha_dashboard"


class AdvancedHADashboardConfigFlow(config_entries.ConfigFlow, domain=DOMAIN):
    """Handle a config flow for Advanced Home Dashboard."""

    VERSION = 1

    async def async_step_user(
        self, user_input: Optional[Dict[str, Any]] = None
    ) -> FlowResult:
        """Handle the initial step."""
        if user_input is not None:
            await self.async_set_unique_id(DOMAIN)
            self._abort_if_unique_id_configured()
            
            return self.async_create_entry(
                title="Advanced Home Dashboard",
                data=user_input,
            )

        return self.async_show_form(
            step_id="user",
            data_schema=vol.Schema({}),
            description_placeholders={
                "dashboard_url": "/ha_dashboard/",
            },
        )
      
