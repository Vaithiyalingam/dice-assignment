import Image from "next/image";
import { SearchPage } from "../../ui_components/SearchPage";

export default function Home() {
  return (
    <main className="w-full h-screen p-24">
      <SearchPage />
    </main>
  );
}
