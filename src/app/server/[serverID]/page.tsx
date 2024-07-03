"use client";
import { TopNavLayout } from "@/components/topNavLayout";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface ServerDetails {
  name: string;
  ipAddress: string;
  responseTime: number;
  uptime: number;
  status: string;
}

export default function ServerPage() {
  const router = useRouter();
  const { serverID } = useParams();
  const [serverDetails, setServerDetails] = useState<ServerDetails | null>(
    null
  );

  useEffect(() => {
    // Fetch server status based on serverID
    const fetchServerStatus = async () => {
      try {
        const response = await fetch(`/api/servers/${serverID}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${sessionStorage.getItem("token")}`,
          },
        });
        if (response.status === 401) {
          router.push("/login");
          return;
        }
        const data = await response.json();
        setServerDetails(data);
      } catch (error) {
        console.error("Failed to fetch server status:", error);
      }
    };

    fetchServerStatus();
  }, [serverID, router]);

  return (
    <div className="bg-gray-100 min-h-screen">
      <TopNavLayout />
      {!serverDetails ? (
        <div className="flex items-center justify-center h-screen">
          <h1 className="text-xl font-medium">Loading...</h1>
        </div>
      ) : (
        <div className="max-w-md mt-12 mx-auto bg-white shadow-lg rounded-lg p-4">
          <div className="flex items-center justify-start mb-4">
            <button
              onClick={() => router.back()}
              className="focus:outline-none"
            >
              <svg
                className="h-6 w-6 text-gray-600 hover:text-gray-800"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>
          </div>
          <h1 className="text-xl font-semibold text-gray-800">
            {serverDetails.name}
          </h1>
          <p className="mt-2 text-gray-600">
            IP Address:&nbsp;
            <span className="text-gray-700">{serverDetails.ipAddress}</span>
          </p>
          <p className="text-gray-600">
            Response Time:&nbsp;
            <span className="text-green-500">
              {serverDetails.responseTime} ms
            </span>
          </p>
          <p className="text-gray-600">
            Uptime:&nbsp;
            <span className="text-blue-500">{serverDetails.uptime} hours</span>
          </p>
          <p className="text-gray-600">
            Status:&nbsp;
            <span
              className={`server-status-${serverDetails.status.toLowerCase()}`}
            >{`• ${serverDetails.status}`}</span>
          </p>
        </div>
      )}
    </div>
  );
}
