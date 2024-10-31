import axios from 'axios';

interface TokenResponse {
  access_token: string;
  refresh_token: string;
  expires_in: number;
}

export const refreshGoogleToken = async (refreshToken: string): Promise<TokenResponse> => {
  try {
    const response = await axios.post('https://oauth2.googleapis.com/token', {
      client_id: process.env.GOOGLE_CLIENT_ID,
      client_secret: process.env.GOOGLE_CLIENT_SECRET,
      refresh_token: refreshToken,
      grant_type: 'refresh_token',
    });

    return response.data;
  } catch (error) {
    console.error('Failed to refresh token:', error);
    throw error;
  }
};

export const revokeGoogleAccess = async (accessToken: string): Promise<void> => {
  try {
    await axios.post('https://oauth2.googleapis.com/revoke', null, {
      params: { token: accessToken },
    });
  } catch (error) {
    console.error('Failed to revoke access:', error);
    throw error;
  }
};