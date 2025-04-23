import { GridArea } from "@components/layout/GridArea";
import { TagsProvider } from "@contexts/Tags.context";
import { Home } from "@screens/Home";
import { Page404 } from "@screens/Page404";
import { TargetAudienceTable } from "@screens/Table/TargetAudienceTable";
import { VideoTable } from "@screens/Table/VideoTable";
import Tags from "@screens/Tags/";
import { HashRouter, Route, Routes } from "react-router-dom";

export const AppRoutes = () => {
  return (
    <HashRouter>
      <GridArea>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/dados/tags"
            element={
              <TagsProvider>
                <Tags />
              </TagsProvider>
            }
          />
          <Route path="/dados/publico-alvo" element={<TargetAudienceTable />} />
          <Route path="/dados/vídeos" element={<VideoTable />} />
          <Route path="/*" element={<Page404 />} />
        </Routes>
      </GridArea>
    </HashRouter>
  );
};
