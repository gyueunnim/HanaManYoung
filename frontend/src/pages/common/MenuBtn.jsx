import { Link } from "react-router-dom";

export default function MenuBtn({ name, target, currentPath, onClick }) {
  const isActive = currentPath === target;

  return (
    <Link to={target} className="w-full" onClick={onClick}>
      <div
        className={`py-2 text-center text-lg text-gray-600 font-bold cursor-pointer transition-colors duration-300 ease-in-out ${
          isActive
            ? "border-b-2 border-emerald-600"
            : "border-b-2 border-transparent hover:border-emerald-600"
        }`}
      >
        {name}
      </div>
    </Link>
  );
}
