import axios from "axios";

const cookieSender = {
  withCredentials: true,
};

const BASE_URL = "https://tour-next.onrender.com/";

export async function getUser() {
  const res = await axios.get(
    `${BASE_URL}api/v1/users/isLogedIn`,
    cookieSender
  );
  return res.data.user;
}
