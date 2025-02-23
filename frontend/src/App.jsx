import { Route, Routes } from "react-router-dom";
import AdminLayout from "./components/layouts/AdminLayout";
import AdminHome from "./components/pages/AdminHome";
import Issues from "./components/Issues";

function App() {
  return (
    <Routes>
      <Route path="/" eleme={<AdminLayout />}>
        <Route index element={<AdminHome />} />
        <Route path="/issues" element={<Issues />} />
      </Route>
    </Routes>
  );
}

export default App;
