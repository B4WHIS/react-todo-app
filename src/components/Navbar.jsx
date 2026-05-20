import { Link } from "react-router-dom";

function Navbar() {
  return (
    <>
      <Link to="/">Trang chủ</Link>
      <Link to="/about">Giới thiệu</Link>
    </>
  );
}
export default Navbar;
