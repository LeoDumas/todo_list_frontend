import React, { useEffect } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

const Home: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const handleButtonClick = () => {
      const jwt = Cookies.get("jwt");
      if (jwt) {
        navigate("/todo");
      } else {
        navigate("/register");
      }
    };

    const button = document.getElementById("start-button");
    if (button) {
      button.addEventListener("click", handleButtonClick);
    }

    return () => {
      if (button) {
        button.removeEventListener("click", handleButtonClick);
      }
    };
  }, [navigate]);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <header className="bg-blue-600 text-white py-20">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              Bienvenue sur TodoApp
            </h1>
            <p className="text-lg md:text-2xl mb-8">
              Gérez vos tâches facilement et efficacement.
            </p>
            <button
              id="start-button"
              className="bg-white text-blue-600 font-semibold py-2 px-4 rounded shadow-lg hover:bg-gray-200 transition duration-300"
            >
              Commencez maintenant
            </button>
          </div>
        </header>
        <section className="py-20">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
              Fonctionnalités
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-lg text-center">
                <h3 className="text-xl font-bold mb-4">Gestion des tâches</h3>
                <p>
                  Créez, modifiez et supprimez des tâches facilement pour rester
                  organisé.
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-lg text-center">
                <h3 className="text-xl font-bold mb-4">Recherche rapide</h3>
                <p>
                  Trouvez rapidement vos tâches grâce à notre fonction de
                  recherche intégrée.
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-lg text-center">
                <h3 className="text-xl font-bold mb-4">Tri par état</h3>
                <p>
                  Triez vos tâches par date de fin ou par état pour une
                  meilleure gestion.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; 2024 TodoApp. Tous droits réservés.</p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
