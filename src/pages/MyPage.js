import { Navigate } from "react-router-dom";

const MyPage = () => {
  const isLogggedIn = false;

  if (!isLogggedIn) {
    return <Navigate to="/login" replace={true} />;
  }

  return <div>마이 페이지</div>;
};

export default MyPage;
