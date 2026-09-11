/**
 * @dte/core — auth stubs.
 *
 * DTE apps ship without accounts. This module defines the surface a
 * future membership sign-in would fill in (YouTube OAuth for members,
 * optional local supporter profile) and a no-op default so apps can
 * call it unconditionally today.
 */

import { LINKS } from "@dte/shared";

export type AuthProvider = "youtube" | "guest";

export interface SupporterProfile {
  provider: AuthProvider;
  displayName: string;
  isMember: boolean;
}

export interface AuthResult {
  ok: boolean;
  profile: SupporterProfile | null;
  redirectUrl?: string;
}

/** The sign-in surface (currently: link out to YouTube membership). */
export function signIn(provider: AuthProvider = "youtube"): AuthResult {
  if (provider === "youtube") {
    return { ok: true, profile: null, redirectUrl: LINKS.membership };
  }
  return { ok: false, profile: null };
}

/** Always succeeds — guest is the default identity. */
export function guestProfile(): SupporterProfile {
  return { provider: "guest", displayName: "Messy Viewer", isMember: false };
}

/** Membership upsell URL used by "Become a member" CTAs. */
export function membershipRedirect(): string {
  return LINKS.membership;
}
