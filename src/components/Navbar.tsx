import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className=" flex justify-between items-center w-full py-6 px-12 border-b  ">
      <div>
        <h1 className=" text-3xl font-semibold">Todo</h1>
      </div>
      <div>
        <ul className=" flex items-center gap-x-3 text-lg">
          <li>
            <Link
              to="/login"
              className="py-1 px-6 rounded-lg hover:bg-gray-100 transition-colors duration-300"
            >
              Connexion
            </Link>
          </li>
          <li>
            <Link
              to="/register"
              className=" bg-black text-white py-1 px-6 rounded-lg hover:bg-[#222024] transition-colors duration-300"
            >
              Inscription
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
