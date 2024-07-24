import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage.jsx";
import RegisterPage from "./pages/RegisterPage.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";
import TaskPage from "./pages/TaskPage.jsx";
import TaskFormPage from "./pages/TaskFormPage.jsx";
import ProfilePage from "./pages/ProfilePage.jsx";
import HomePage from "./pages/HomePage.jsx";
import ProtectedRoute from './ProtectedRoute.jsx'
import { TaskProvider } from "./context/TaskContext.jsx";
import Navbar from "./components/Navbar.jsx";


function App() {
  return (
    <AuthProvider>
     <TaskProvider>
       <BrowserRouter>
        <main className="container mx-auto px-10">
        <Navbar/>
         <Routes>
           <Route path="/" element={<HomePage/>}></Route>
           <Route path="/login" element={<LoginPage></LoginPage>}></Route>
          <Route path="/register" element={<RegisterPage></RegisterPage>}></Route>
         
          <Route element={<ProtectedRoute></ProtectedRoute>}>
          <Route path="/tasks" element={<TaskPage/>}></Route>
          <Route path="/add-task" element={<TaskFormPage/>}></Route>
          <Route path="/tasks/:id" element={<TaskFormPage/>}></Route>
          <Route path="/profile" element={<ProfilePage/>}></Route>
          </Route>
        </Routes>
        </main>
      </BrowserRouter>
     </TaskProvider>
    </AuthProvider>
  );
}

export default App;
