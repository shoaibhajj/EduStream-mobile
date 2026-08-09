import type { ProfileMeResponse } from "./types";

const BASE_URL = process.env.EXPO_PUBLIC_API_BASE_URL;

export class ApiError extends Error {
  constructor(public status: number, message: string) {
    super(message);
    this.name = "ApiError";
  }
}

export async function apiFetch<T>(
  path: string,
  options: RequestInit = {},
  token?: string | null
): Promise<T> {
  if (!BASE_URL) {
    throw new Error("[apiFetch] EXPO_PUBLIC_API_BASE_URL is not set.");
  }

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...(options.headers as Record<string, string> | undefined),
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const response = await fetch(`${BASE_URL}${path}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    let message = `HTTP ${response.status}`;
    try {
      const body = await response.json();
      message = (body?.error as string) ?? message;
    } catch {
      // non-JSON error body — use status message
    }
    throw new ApiError(response.status, message);
  }

  return response.json() as Promise<T>;
}

// Convenience: typed call for profile/me specifically
export async function fetchProfileMe(
  token: string
): Promise<ProfileMeResponse> {
  return apiFetch<ProfileMeResponse>("/api/profile/me", {}, token);
}