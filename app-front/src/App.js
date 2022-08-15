import Footer from "./components/Footer";
import Gestion from "./components/Gestion";
import Login from "./components/Login";
import Menu from "./components/Menu";
import Navbar from "./components/Navbar";
import { AuthProvider } from "./context/AuthContext";
import { RutasProvider } from "./context/RutasContext";

function App() {
  return (
    <div>
      <div className="wrapper">
        <RutasProvider>
          <AuthProvider>
            <Navbar />
            <Menu />
            {/* Lógica de la aplicación */}
            <Login />
            <Gestion />
            <Footer />
          </AuthProvider>
        </RutasProvider>
      </div>
    </div>
  );
}

export default App;
