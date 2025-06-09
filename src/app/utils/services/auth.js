import { AUTH_URL } from "../constants/constants";

export const logIn = async (email, password,setData,toast) => {
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
      setData(data);
    } else { 
      toast.error("Wrong email or password")
    }
  } catch (error) {
    toast.error("Something went wrong")
  }
};

export const register = async (
  firstName,
  lastName,
  email,
  password,
  confirmPassword,
  toast
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
      if(res.status === 200) toast.success("Successfully registered")
      return res.status;
    });
  } catch (error) {
    toast.error("Something went wrong")
  }
};

export const logOut = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("role");
};
