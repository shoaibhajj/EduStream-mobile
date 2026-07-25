// app/index.tsx
// Temporary entry point — redirects to student browse flow.
// Once auth is added, this will redirect based on role.
import { Redirect } from "expo-router";

export default function Index() {
  return <Redirect href="/(student)" />;
}
