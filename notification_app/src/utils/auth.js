// Authentication utility for API calls
import Log from './logger.js';

const AUTH_URL = 'http://20.207.122.201/evaluation-service/auth';

const credentials = {
  email: 'gokulraj.v.2023.cse@ritchennai.edu.in',
  name: 'Gokulraj V',
  rollNo: '2117230020052',
  accessCode: 'BTCDqT',
  clientID: '44a8b644-1767-4fec-a6f5-44f85acb596d',
  clientSecret: 'mVvzRTeyMgUUsUkb',
};

let cachedToken = null;
let tokenExpiry = null;

export const getAuthToken = async () => {
  // Return cached token if still valid (5 min validity)
  if (
    cachedToken &&
    tokenExpiry &&
    Date.now() < tokenExpiry
  ) {
    return cachedToken;
  }

  try {
    await Log('info', 'auth', 'Fetching auth token');

    const response = await fetch(AUTH_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    });

    if (!response.ok) {
      throw new Error(`Auth failed: ${response.status}`);
    }

    const data = await response.json();
    cachedToken = data.access_token;
    tokenExpiry = Date.now() + 5 * 60 * 1000; // 5 min

    return cachedToken;
  } catch (error) {
    await Log('error', 'auth', 'Token fetch failed');
    throw error;
  }
};
