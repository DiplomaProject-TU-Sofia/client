import { AUTH_URL } from "../constants/constants";

export const logIn = async (email, password) => {
  try {
    const res = await fetch(`${AUTH_URL}/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });
    if (res.status === 200) {
      const data = await res.json();
      localStorage.setItem("token", data.token);
      localStorage.setItem("role", data.role);
      return data;
    }
  } catch (error) {
    console.log(error);
  }
};

export const register = async (
  firstName,
  lastName,
  email,
  password,
  confirmPassword
) => {
  try {
    await fetch(`${AUTH_URL}/api/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        firstName,
        lastName,
        email,
        password,
        confirmPassword,
      }),
    }).then((res) => {
      return res.status;
    });
  } catch (error) {
    console.log(error);
  }
};

export const logOut = () => {
  localStorage.removeItem("token");
};
