import api from "../../../utils/api";

import { useState, useEffect } from "react";

function Profile() {
  const [user, setUser] = useState({});

  useEffect(() => {
    const token = localStorage.getItem("token");

    const data = api
      .get("/users/checkuser", {
        headers: {
          Authorization: `Bearer ${JSON.parse(token)}`,
        },
      })
      .then((response) => {
        return response.data;
      });
  }, []);
  return (
    <section>
      <h1>Profile</h1>
    </section>
  );
}

export default Profile;
