import { BASE_URL } from "../constants/constants";    

export const handleLogIn = async () => { 
        try {
            const res = await fetch(`${BASE_URL}/api/auth/login`, {
                method: "POST",
                headers: {
                "Content-Type": "application/json",
                },
                body: JSON.stringify({
                email,
                password,
                }),
            });
            const data = await res.json();
            if (res.status === 200) {
                setVisible(false);
                localStorage.setItem("token", data.token);
                setEmail("");
                setPassword("");
                setIsLoggedIn(true);
            }
            
        } catch (error) {
            console.log(error)
        }
  }
  
  export const handleRegister = async () => { 
    try {
      await fetch(`${BASE_URL}/api/auth/register`, {
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
        console.log("message")
          if (res.status === 200) {
            setRegisterView(false);
            setFirstName("");
            setLastName("");
            setEmail("");
            setPassword("");
            setConfirmPassword("");
          }
        })
        
        
    } catch (error) {
        console.log(error)
    }
  }