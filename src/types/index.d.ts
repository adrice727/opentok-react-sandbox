declare module "*.png";

type Layout = 'standard' | 'stack';

interface OpenTokCredentials {
  apiKey: string;
  sessionId: string;
  token: string;
}