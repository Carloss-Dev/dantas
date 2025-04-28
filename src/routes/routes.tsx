import { GridArea } from "@/components/layout/GridArea";
import {
  TagsProvider,
  TargetAudienceProvider,
  VideoProvider,
} from "@/contexts";
import {
  Home,
  Page404,
  TagPage,
  TargetAudiencePage,
  VideoPage,
} from "@/screens";
import { BrowserRouter, Route, Routes } from "react-router-dom";

export const AppRoutes = () => {
  return (
    <BrowserRouter>
      <GridArea>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/dados/tags"
            element={
              <TagsProvider>
                <TagPage />
              </TagsProvider>
            }
          />
          <Route
            path="/dados/publico-alvo"
            element={
              <TargetAudienceProvider>
                <TargetAudiencePage />
              </TargetAudienceProvider>
            }
          />
          <Route
            path="/dados/vídeos"
            element={
              <TagsProvider>
                <TargetAudienceProvider>
                  <VideoProvider>
                    <VideoPage />
                  </VideoProvider>
                </TargetAudienceProvider>
              </TagsProvider>
            }
          />
          <Route path="/*" element={<Page404 />} />
        </Routes>
      </GridArea>
    </BrowserRouter>
  );
};
