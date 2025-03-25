"use client";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { useRouter } from "next/navigation";

interface User {
  firstName: string;
  lastName: string;
  password: string;
  email: string;
}

export default function SignUp() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const {
    register,
    formState: { errors },
  } = useForm<User>({});

  const setDefault = () => {
    setFirstName("");
    setLastName("");
    setEmail("");
    setPassword("");
  };

  const handleSignUp = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ): Promise<void> => {
    e.preventDefault();
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/sign-up`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName: firstName,
          lastName: lastName,
          email: email,
          password: password,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data);
        router.push("/logIn");
        setDefault();
      } else {
        alert("Could not create user");
        setDefault();
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="signup-page">
      <form className="forms">
        <label>First Name</label>
        <input
          {...register("firstName", { required: true })}
          type="text"
          id="firstName"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
        {errors.firstName && <span>This field is required</span>}
        <label>Last Name</label>
        <input
          {...register("lastName", { required: true })}
          type="text"
          id="lastName"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
        {errors.lastName && <span>This field is required</span>}
        <label>Email</label>
        <input
          {...register("email", { required: true })}
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        {errors.email && <span>This field is required</span>}
        <label>Password</label>
        <input
          {...register("password", { required: true })}
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {errors.password && <span>This field is required</span>}
        <button className="submit-button" onClick={handleSignUp}>
          Sign Up
        </button>{" "}
      </form>
    </div>
  );
}
