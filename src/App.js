import { Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import AuthLayout from "components/AuthLayout";
import Spiner from "Spiner";

const Login = lazy(() => import("modules/Authentication/pages/Login"));
const Register = lazy(() => import("modules/Authentication/pages/Register"));
const ListProject = lazy(() =>
  import("modules/List/pages/project/ListProject")
);
const CreateProject = lazy(() =>
  import("modules/List/pages/project/CreateProject")
);
const UpdateProject = lazy(() =>
  import("modules/List/pages/project/UpdateProject")
);
const ListTask = lazy(() => import("modules/List/pages/task/ListTask"));
const CreateTask = lazy(() => import("modules/List/pages/task/CreateTask"));
const UpdateTask = lazy(() => import("modules/List/pages/task/UpdateTask"));
const ListUser = lazy(() => import("modules/List/pages/user/ListUser"));
const UpdateUser = lazy(() => import("modules/List/pages/user/UpdateUser"));
const CreateUser = lazy(() => import("modules/List/pages/user/CreateUser"));

function App() {
  return (
    <Suspense fallback={<Spiner/>}>
      <Routes>
        <Route path="/" element={<ListProject />} />
        <Route path="/addproject" element={<CreateProject />} />
        <Route path="/updateproject/:projectId" element={<UpdateProject />} />
        <Route path="/task/:taskId" element={<ListTask />} />
        <Route path="/task/:taskId/addtask" element={<CreateTask />} />
        <Route path="/task/updatetask/:taskId" element={<UpdateTask />} />

        <Route path="/user" element={<ListUser />} />
        <Route path="/user/:userId" element={<UpdateUser />} />
        <Route path="/CreateUser" element={<CreateUser />} />

        <Route path="/" element={<AuthLayout />}>
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Route>
      </Routes>
    </Suspense>
    // <Spiner/>
  );
}

export default App;

