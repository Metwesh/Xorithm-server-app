import React, { useEffect, useState } from "react";
import "./serversList.css";
import { useRouter } from "next/navigation";

interface Server {
  id: number;
  name: string;
  ipAddress: string;
  responseTime: number;
  uptime: number;
  status: string;
}

export default function ServersList() {
  const router = useRouter();
  const [servers, setServers] = useState<Server[]>([]);
  const [filteredServers, setFilteredServers] = useState<Server[]>([]);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");

  useEffect(() => {
    async function fetchServers() {
      const response = await fetch("/api/servers", {
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
      const data: Server[] = await response.json();
      setServers(data);
      setFilteredServers(data);
    }
    fetchServers();
  }, [router]);

  const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const filterValue = event.target.value.toLowerCase();
    const filtered = servers.filter((server) =>
      server.name.toLowerCase().includes(filterValue)
    );
    setFilteredServers(filtered);
  };

  const handleSortClick = () => {
    const sorted = [...servers].sort((a, b) =>
      sortOrder === "asc"
        ? a.name.localeCompare(b.name)
        : b.name.localeCompare(a.name)
    );
    setFilteredServers(sorted);
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  return (
    <div className="max-w-md mx-auto my-5 p-5 rounded-lg shadow-lg bg-white">
      <input
        type="search"
        placeholder="Search"
        onChange={handleFilterChange}
        className="block w-full px-3 py-2 mb-5 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
      />
      <button
        onClick={handleSortClick}
        className="px-5 py-2 bg-indigo-600 text-white rounded-md cursor-pointer mb-5 hover:bg-indigo-500"
      >
        Sort
      </button>

      {filteredServers.length > 0 ? (
        filteredServers.map((server) => (
          <div
            key={server.id}
            onClick={() => router.push(`/server/${server.id}`)}
            className="server-item mb-2.5 p-4 border border-gray-200 rounded-md transition-shadow duration-300 ease-in-out hover:shadow-md"
          >
            <div className="server-details flex items-center justify-between">
              <p>{server.name}</p>
              <p
                className={`server-status-${server.status.toLowerCase()}`}
              >{`• ${server.status}`}</p>
            </div>
          </div>
        ))
      ) : (
        <div className="flex items-center justify-center h-48">
          <h1 className="text-xl font-medium">Loading...</h1>
        </div>
      )}
    </div>
  );
}
