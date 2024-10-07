import { Link } from "react-router-dom";

export default function Logo() {
  return (
    <Link to="/" className="flex items-center">
      <img
        src={process.env.PUBLIC_URL + "/images/hana/logo.png"}
        alt="logo"
        className="w-14"
      />
      <div className="ml-1 text-hana font-bold flex">
        <p className="mr-3 text-3xl">하나만영</p>
        <p className="flex items-end text-base">하나에서 만나 Young</p>
      </div>
    </Link>
  );
}

export function HeaderLogo({ type, color }) {
  return (
    <Link to="/" className="flex items-center">
      <img
        src={process.env.PUBLIC_URL + "/images/hana/logo.png"}
        alt="logo"
        className="w-10"
      />
      <div className="ml-1 text-hana font-bold flex">
        <p className="mr-3 text-2xl">하나만영</p>
        <p className="flex items-end text-sm">하나에서 만나 Young</p>
        <p className={`ml-3 flex items-end text-sm ${color}`}>{type}</p>
      </div>
    </Link>
  );
}
