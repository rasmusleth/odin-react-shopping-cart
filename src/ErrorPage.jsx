import { Link } from "react-router-dom";
import { useRouteError } from "react-router-dom";

const ErrorPage = () => {
  const error = useRouteError();
  console.error(error);

  return (
    <div className="errorPageWrapper">
      <div>
        <h1 className="heading-style-h3">Sorry, page not found</h1>
        <div className="spacerSmall"></div>
        <p>We cannot find the page you are looking for..</p>
        <div className="spacerXSmall"></div>
        <p>Looking for the menu? Click the button below</p>
      </div>
      <div className="spacerSmall"></div>
      <Link to="/" className="btn btnPrimary">
        Go to menu
      </Link>
      <div className="spacerSmall"></div>
      <p>
        Error text: <i>{error.statusText || error.message}</i>
      </p>
    </div>
  );
};

export default ErrorPage;
