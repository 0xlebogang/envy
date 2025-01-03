import { auth } from "@clerk/nextjs/server";

const apiUrl = process.env.NEXT_PUBLIC_API_URL as string;

export const fetchVariables = async (projectId: string) => {
  const { getToken } = await auth();

  try {
    const res = await fetch(`${apiUrl}/variables?projectId=${projectId}`, {
      headers: {
        Authorization: `Bearer ${(await getToken()) as string}`,
      },
    });

    const body = await res.json();
    return body;
  } catch (e) {
    console.log(e);
  }
};
