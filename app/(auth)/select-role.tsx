import { Redirect } from "expo-router";

// This screen has no backend API.
// Role is always assigned server-side (student by default, changed by admin only).
// Any navigation here routes back to the auth gate.
export default function SelectRole() {
  return <Redirect href="/" />;
}
