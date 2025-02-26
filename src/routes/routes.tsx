import { GridArea } from "@components/Layout/GridArea";
import { Home } from "@screens/Home";
import { Page404 } from "@screens/Page404";
import { TagsRegister } from "@screens/Registers/TagsRegister";
import { TargetPublic } from "@screens/Registers/TargetPublic,";
import { BrowserRouter, Route, Routes } from "react-router-dom";

export const AppRoutes = () => {
  return (
    <BrowserRouter>
      <GridArea>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cadastro/tags" element={<TagsRegister />} />
          <Route path="/cadastro/publico-alvo" element={<TargetPublic />} />
          <Route path="/*" element={<Page404 />} />
        </Routes>
      </GridArea>
    </BrowserRouter>
  );
};
