import type React from "react";
import { Navbar } from "./Navbar";

interface IPropsGridArea {
  children: React.ReactNode;
}

export const GridArea = ({ children }: IPropsGridArea) => {
  return (
    <main className="flex min-h-screen w-full flex-col bg-white">
      <header className="h-15 w-full">
        <Navbar />
      </header>
      <section className="w-full py-10">{children}</section>
    </main>
  );
};
