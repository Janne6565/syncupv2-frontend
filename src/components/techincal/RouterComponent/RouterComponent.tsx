import { Route, Routes } from "react-router";
import LayoutPage from "pages/LayoutPage/LayoutPage.tsx";
import HomePage from "pages/HomePage/HomePage.tsx";
import MapPage from "pages/MapPage/MapPage.tsx";
import UploadPage from "pages/UploadPage/UploadPage.tsx";
import NotFoundPage from "pages/NotFoundPage/NotFoundPage.tsx";
import LoginPage from "pages/LoginPage/LoginPage.tsx";

const RouterComponent = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<LayoutPage />}>
          <Route index element={<HomePage />} />
          <Route path="/maps" element={<MapPage />} />
          <Route path="/upload" element={<UploadPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </>
  );
};

export default RouterComponent;
