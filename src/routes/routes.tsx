import { GridArea } from "@components/Layout/GridArea";
import { HashRouter, Route, Routes } from "react-router-dom";
import { Home } from "src/screens/Home";
import { Page404 } from "src/screens/Page404";
import { TagsTable } from "src/screens/Table/TagsTable";
import { TargetAudienceTable } from "src/screens/Table/TargetAudienceTable";
import { VideoTable } from "src/screens/Table/VideoTable";

export const AppRoutes = () => {
  return (
    <HashRouter>
      <GridArea>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dados/tags" element={<TagsTable />} />
          <Route path="/dados/publico-alvo" element={<TargetAudienceTable />} />
          <Route path="/dados/vídeos" element={<VideoTable />} />
          <Route path="/*" element={<Page404 />} />
        </Routes>
      </GridArea>
    </HashRouter>
  );
};
