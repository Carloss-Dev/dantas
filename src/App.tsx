import React from "react";
import { AppRoutes } from "./routes/routes";
import { BaseService } from "./service/BaseService.service";

export const App = () => {
  const teste = new BaseService<string>("Teste");

  React.useEffect(() => {
    console.log(teste.getAll());
  }, [teste.getAll]);

  return <AppRoutes />;
};
