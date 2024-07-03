"use client";
import { TopNavLayout } from "../../components/topNavLayout";
import ServersList from "@/components/serversList";

export default function Dashboard() {
  return (
    <div className="bg-gray-100 min-h-screen">
      <TopNavLayout />
      <ServersList />
    </div>
  );
}
