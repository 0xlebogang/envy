import { getUser } from "@envyper/orm/utils";
import { UserSchema } from "@envyper/zod";
import { zValidator } from "@hono/zod-validator";
import { generateAccessToken, getAccessToken } from "@envyper/orm/accessTokens";
import { getAuth } from "@hono/clerk-auth";
import { Hono } from "hono";

const tokens = new Hono()

  .get("/", async (c) => {
    const auth = getAuth(c);
    if (!auth?.userId) {
      return c.json({ message: "User not authenticated" }, 401);
    }

    const data = await getAccessToken(auth?.userId as string);
    if (!data) {
      return c.json(
        {
          message: "No access token associated with this user",
        },
        404,
      );
    }

    return c.json(
      {
        data,
      },
      200,
    );
  })

  .post(
    "/refresh",
    zValidator("json", UserSchema.pick({ clerkUserId: true })),
    async (c) => {
      const auth = getAuth(c);
      if (!auth?.userId) {
        return c.json({ message: "User not authenticated" }, 401);
      }

      const user = await getUser(auth?.userId as string);
      if (!user) {
        return c.json(
          {
            message: "No provided user id",
          },
          400,
        );
      }

      const newToken = await generateAccessToken(auth?.userId as string);
      return c.json(
        {
          data: newToken,
        },
        200,
      );
    },
  );

export default tokens;
