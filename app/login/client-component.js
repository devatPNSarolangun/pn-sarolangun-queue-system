"use client";

import { EyeIcon, EyeOffIcon } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Login() {
  const router = useRouter();
  const [eye, setEye] = useState(true);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    setLoading(true);
    e.preventDefault();
    setError("");

    const res = await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    const data = await res.json();

    if (res.ok) {
      // Save user to localStorage
      setLoading(false);
      localStorage.setItem("user", JSON.stringify(data.user));
      router.push("/pidana"); // Redirect to admin page
    } else {
      setLoading(false);
      setError(data.error || "Login failed");
    }
  };

  return (
    <section className="w-full h-screen max-w-md bg-gray-100 mx-auto flex flex-col justify-center items-center space-y-6 p-6">
      <div className="text-3xl font-bold">Login Administrator</div>
      <div className="w-48">
        <Image
          src="/assets/logo.png"
          alt="logo"
          width={0}
          height={0}
          layout="responsive"
          className="w-48"
        />
      </div>
      <div className="flex flex-col w-full text-lg space-y-3">
        <label>Username</label>
        <input
          type="text"
          className="bg-white rounded-lg border outline-green-600 border-gray-600 text-sm p-3"
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div className="flex flex-col w-full text-lg space-y-3">
        <label>Password</label>
        <div className="relative w-full">
          <input
            type={eye ? "password" : "text"}
            className="w-full bg-white rounded-lg border outline-green-600 border-gray-600 text-sm p-3"
            onChange={(e) => setPassword(e.target.value)}
          />
          {eye ? (
            <EyeOffIcon
              className="absolute bottom-3 too-3 right-3"
              onClick={() => setEye(false)}
            />
          ) : (
            <EyeIcon
              className="absolute bottom-3 too-3 right-3"
              onClick={() => setEye(true)}
            />
          )}
        </div>
      </div>
      <button
        className={`${
          loading && "animate-pulse"
        } w-full text-white bg-green-700 rounded-lg p-3 text-lg font-semibold transition delay-150 duration-300 ease-in-out hover:-translate-y-0.5 hover:scale-105 hover:bg-green-800 cursor-pointer`}
        onClick={handleLogin}
      >
        Login
      </button>
    </section>
  );
}
