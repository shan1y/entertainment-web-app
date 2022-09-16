import SearchHeader from "../components/SearchHeader/SearchHeader";
import "../App.scss";
import { Outlet, Navigate } from "react-router-dom";
import Navigation from "../components/Navigation/Navigation";

function PrivateRoute(props: any) {
  const { searchTerm, setSearchTerm } = props;

  const { token } = props;

  const headerProperties = {
    searchTerm: searchTerm,
    setSearchTerm: setSearchTerm,
  };

  return token ? (
    <>
      <Navigation />
      <div className="app__main">
        <SearchHeader {...headerProperties} />
        <Outlet />
      </div>
    </>
  ) : (
    <Navigate to="/login" />
  );
}

export default PrivateRoute;
