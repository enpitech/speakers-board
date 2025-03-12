import type { Route } from "./+types/home";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Speakers Board" },
    { name: "description", content: "Welcome to the Frontendistim Speakers Board!" },
  ];
}

export default function Home() {
  return "Welcome to the Frontendistim Speakers Board!";
}
