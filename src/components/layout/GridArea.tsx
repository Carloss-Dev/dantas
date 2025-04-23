import type React from "react";
import { Navbar } from "./Navbar";

interface IPropsGridArea {
  children: React.ReactNode;
}

export const GridArea = ({ children }: IPropsGridArea) => {
  return (
    <main className="grid h-screen w-screen grid-cols-12 grid-rows-[50px_1fr_50px] bg-white">
      <header className="col-span-12 row-span-1">
        <Navbar />
      </header>
      <section className="col-span-12 row-start-2 row-end-3 grid grid-cols-12 p-4">
        {children}
      </section>
    </main>
  );
};
