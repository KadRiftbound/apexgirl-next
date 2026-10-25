import { redirect } from "next/navigation";

// Root page: let middleware handle locale detection via Accept-Language.
// Redirect to /en as a safe fallback — middleware will intercept first on
// most requests and route to the correct locale before this runs.
export default function Home() {
  redirect("/en");
}
