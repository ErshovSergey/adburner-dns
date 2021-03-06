import path from 'path';
import dotenv from 'dotenv';

const defaultEnv = {
  DNS_OVER_HTTPS: `true`, //process.env items are strings
  HTTPS_REMOTE_ADDRESS: `https://cloudflare-dns.com/dns-query,https://dns.google.com/experimental`,
  UDP_REMOTE_ADDRESS: `1.1.1.1,8.8.8.8`,
  BLOCKED_HOSTS_URL: `https://raw.githubusercontent.com/StevenBlack/hosts/master/hosts`
};

dotenv.config(); //Load the .env file if it exists
const env = Object.assign({}, defaultEnv, process.env); //merge default env with user env

const config = {
  dnsOverHttps: env.DNS_OVER_HTTPS == 'true',
  httpsRemoteAddresses: env.HTTPS_REMOTE_ADDRESS.split(',').map( item=> item.trim()), //Allow comma separated list
  udpRemoteAddresses: env.UDP_REMOTE_ADDRESS.split(',').map( item=> item.trim()), //Allow comma separated list
  blockedHostsUrl: env.BLOCKED_HOSTS_URL,  
  remoteQueryTimeout: 10 * 1000, // 10 Seconds
  blockedHosts: path.resolve(__dirname, '../data/hosts.txt'),
  blackList: path.resolve(__dirname, '../data/blacklist.txt'),
  whiteList: path.resolve(__dirname, '../data/whitelist.txt')
}

export default config;