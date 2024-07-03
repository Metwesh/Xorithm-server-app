interface Server {
  id: number;
  name: string;
  ipAddress: string;
  responseTime: number;
  uptime: number;
  status: string;
}

const servers: Server[] = [
  {
    id: 1,
    name: "Server 1",
    ipAddress: "192.168.0.1",
    responseTime: 50,
    uptime: 99.9,
    status: "Up",
  },
  {
    id: 2,
    name: "Server 2",
    ipAddress: "192.168.0.1",
    responseTime: 50,
    uptime: 99.9,
    status: "Up",
  },
  {
    id: 3,
    name: "Server 3",
    ipAddress: "192.168.0.1",
    responseTime: 50,
    uptime: 99.9,
    status: "Up",
  },
  {
    id: 4,
    name: "Server 4",
    ipAddress: "192.168.0.2",
    responseTime: 100,
    uptime: 98.5,
    status: "Degraded",
  },
  {
    id: 5,
    name: "Server 5",
    ipAddress: "192.168.0.2",
    responseTime: 100,
    uptime: 98.5,
    status: "Degraded",
  },
  {
    id: 6,
    name: "Server 6",
    ipAddress: "192.168.0.2",
    responseTime: 100,
    uptime: 98.5,
    status: "Degraded",
  },
  {
    id: 7,
    name: "Server 7",
    ipAddress: "192.168.0.3",
    responseTime: 200,
    uptime: 95.2,
    status: "Down",
  },
  {
    id: 8,
    name: "Server 8",
    ipAddress: "192.168.0.3",
    responseTime: 200,
    uptime: 95.2,
    status: "Down",
  },
  {
    id: 9,
    name: "Server 9",
    ipAddress: "192.168.0.3",
    responseTime: 200,
    uptime: 95.2,
    status: "Down",
  },
];

export async function GET(req: Request) {
  const serverID = req.url.split("/")[req.url.split("/").length - 1];
  const token = req.headers.get("Authorization")?.split(" ")?.[1];

  if (!token || token !== "your_token_here")
    return new Response("Unauthorized", {
      status: 401,
      statusText: "failed",
    });

  if (!serverID)
    return new Response("Missing server ID", {
      status: 400,
      statusText: "failed",
    });

  return new Response(
    JSON.stringify(servers.filter((server) => server.id === Number(serverID))?.[0]),
    {
      status: 200,
      statusText: "success",
    }
  );
}
