/**
 * Plugins where the option 'client.sync' is enabled, will ask the backend for a
 * config file. And here we go, thats me. If you edit any of these element below
 * everything will be synced the all clients (where this option is enabled).
 * 
 * Be sure that you click on 'Sync configuaration' in your dashboard.
 */
export const client_config: any = {
  "client": {
    "prefix": "§3Observer §8->§7 ",
    "event_prefix": "§3Observer §f- §l§b${event}§f§r -§7 ",
    "sync": false,
    "random": true
  },
  "backend": {
    "host": "127.0.0.1",
    "port": "1337",
    "username": "YOUR_PLUGIN_USERNAME",
    "password": "SUPER_SECRET"
  }
}