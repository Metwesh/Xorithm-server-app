"use client";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (!token) router.push("/login"); // Redirect to login page if not logged in
    if (token) router.push("/servers"); // Redirect to servers if logged in
  }, [router]);

  return null;
}
