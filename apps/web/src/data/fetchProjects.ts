import { auth } from "@clerk/nextjs/server";

const apiUrl = process.env.NEXT_PUBLIC_API_URL as string;

export const fetchProjects = async () => {
  let isLoading = true;

  const { getToken } = await auth();

  try {
    const res = await fetch(`${apiUrl}/projects`, {
      headers: {
        Authorization: `Bearer ${(await getToken()) as string}`,
      },
    });

    const { data } = await res.json();
    isLoading = false;

    return {
      data,
      isLoading,
    };
  } catch (e) {
    console.log(e);
  }
};

export const fetchProjectById = async (projectId: string) => {
  let isLoading = true;

  const { getToken } = await auth();

  try {
    const res = await fetch(`${apiUrl}/projects/${projectId}`, {
      headers: {
        Authorization: `Bearer ${(await getToken()) as string}`,
      },
    });

    const { data } = await res.json();
    isLoading = false;

    return {
      data,
      isLoading,
    };
  } catch (e) {
    console.log(e);
  }
};
