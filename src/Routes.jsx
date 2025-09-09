import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import NotFound from "pages/NotFound";
import AIDesignStudioMoodGenerator from './pages/ai-design-studio-mood-generator';
import ARShoppingExperienceSpatialCart from './pages/ar-shopping-experience-spatial-cart';
import ARCameraPortalHomepage from './pages/ar-camera-portal-homepage';
import ARMeasurementPlanningTools from './pages/ar-measurement-planning-tools';
import MySpacesProjectManagement from './pages/my-spaces-project-management';
import SmartCatalogFurnitureUniverse from './pages/smart-catalog-furniture-universe';

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your route here */}
        <Route path="/" element={<AIDesignStudioMoodGenerator />} />
        <Route path="/ai-design-studio-mood-generator" element={<AIDesignStudioMoodGenerator />} />
        <Route path="/ar-shopping-experience-spatial-cart" element={<ARShoppingExperienceSpatialCart />} />
        <Route path="/ar-camera-portal-homepage" element={<ARCameraPortalHomepage />} />
        <Route path="/ar-measurement-planning-tools" element={<ARMeasurementPlanningTools />} />
        <Route path="/my-spaces-project-management" element={<MySpacesProjectManagement />} />
        <Route path="/smart-catalog-furniture-universe" element={<SmartCatalogFurnitureUniverse />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;
