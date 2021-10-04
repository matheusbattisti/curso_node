import { useHistory } from "react-router-dom";
import axios from "axios";

export default function useLogout() {
  const history = useHistory();

  const logout = async () => {
    try {
      await axios
        .get(`http://localhost:5000/users/logout`, { withCredentials: true })
        .then((res) => {
          console.log(res);
          history.push("/login");
        });
    } catch (err) {
      console.log(err);
    }
  };

  return {
    logout,
  };
}
