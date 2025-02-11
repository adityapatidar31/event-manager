import axios from "axios";

const cookieSender = {
  withCredentials: true,
};

const BASE_URL = "https://event-manager-2u4t.onrender.com/";

export async function getUser() {
  const res = await axios.get(
    `${BASE_URL}api/v1/users/isLogedIn`,
    cookieSender
  );
  return res.data.user;
}

interface User {
  _id: string;
  name: string;
  email: string;
  role: "admin" | "user";
  __v: number;
}

export async function loginUser(data: {
  email: string;
  password: string;
}): Promise<User> {
  const res = await axios.post(
    `${BASE_URL}api/v1/users/login`,
    data,
    cookieSender
  );
  const user = res.data.data.user;
  return user;
}

interface signBody {
  email: string;
  password: string;
  passwordConfirm: string;
  name: string;
}

export async function signUpUser(body: signBody): Promise<User> {
  const res = await axios.post(
    `${BASE_URL}api/v1/users/signup`,
    body,
    cookieSender
  );
  return res.data.data.user;
}
