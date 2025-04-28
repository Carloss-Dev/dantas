import marioCorrendo from "/assets/mario-correndo.gif";

export const Page404 = () => {
  return (
    <section className="col-span-12 flex flex-col items-center justify-center">
      <h2 className="text-4xl font-bold tracking-tight">
        404 Página não encontrada...
      </h2>
      <img src={marioCorrendo} alt="Mario correndo" />
    </section>
  );
};
