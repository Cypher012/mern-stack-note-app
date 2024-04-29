import Notes from "./components/notes";
import { QueryClient, QueryClientProvider } from "react-query";
// import { ReactQueryDevtools } from "react-query/devtools";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/Auth/login";
import Home from "./components/home";
import Navbar from "./components/navbar";
import SignUp from "./components/Auth/signUp";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signUp" element={<SignUp />} />
          <Route path="/notes" element={<Notes />} />
        </Routes>
      </BrowserRouter>
      {/* <ReactQueryDevtools initialIsOpen={false} position="bottom-right" /> */}
    </QueryClientProvider>
  );
}

export default App;
