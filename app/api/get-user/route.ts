import { getDirectusUser } from "@/server/utils/get-directus-user";

export async function POST(req: Request) {
  const { appApiKey, token } = await req.json();

  if (!appApiKey || appApiKey !== process.env.APP_API_KEY || !token) {
    return Response.json({ message: "Unauthorized" }, { status: 401 });
  }

  const user = await getDirectusUser(token);

  return Response.json(user);
}
