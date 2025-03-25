"use client";
import { useForm } from "react-hook-form";
import { useContext, useState } from "react";
import { useRouter } from "next/navigation";
import { AuthContext } from "../_context/AuthContext";
import Link from "next/link";

type Input = {
  email: string;
  password: string;
};

export default function SignIn() {
  const { login } = useContext(AuthContext)!;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const {
    register,
    formState: { errors },
  } = useForm<Input>({});

  const handleLogin = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>): Promise<void> => {
    e.preventDefault();

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/sign-in`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        login(data.user, data.token);
        router.push(`/account/${data.user.id}`);
      } else {
        alert("Wrong username or password");
        throw new Error("Wrong username or password");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="signin-page">
      <form className="forms">
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
        <button className="submit-button" onClick={handleLogin}>
          Log In
        </button>{" "}
      </form>
      <p>
        Dont have an account? Sign up{" "}
        <Link href="/signUp">
          <span>here!</span>
        </Link>
      </p>
    </div>
  );
}
