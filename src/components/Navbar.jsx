import { Outlet, Link } from "react-router-dom";

const Navbar = () => {
  return (
    <>
      <nav>
        {/* <Link to="/Comments"><button>Comments</button></Link>
        <Link to="/Photos"><button>Photos</button></Link> */}
        <Link to="/Albums"><button>Albums</button></Link>
        <Link to="/Posts"><button>Posts</button></Link>
        <Link to="/Todos"><button>Todos</button></Link>
        <Link to="/"><button>Home</button></Link>
      </nav>

      <Outlet />
    </>
  );
};

export default Navbar;