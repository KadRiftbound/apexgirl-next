import { notFound } from "next/navigation";

// Any URL under a language that matches no page renders the site's own 404 inside the language layout.
export default function CatchAll() {
  notFound();
}
