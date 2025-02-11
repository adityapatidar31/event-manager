import axios from "axios";

export const cookieSender = {
  withCredentials: true,
};

export const BASE_URL = "https://event-manager--inky.vercel.app/";

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

export async function createEvent(body: {
  name: string;
  description: string;
  capacity: number;
  category: string;
  duration: number;
  date: string;
  location: string;
}) {
  await axios.post(`${BASE_URL}api/v1/events`, body, cookieSender);
}
