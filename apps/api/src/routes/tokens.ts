import { getUser } from "@envyper/orm/utils";
import { UserSchema } from "@envyper/zod";
import { zValidator } from "@hono/zod-validator";
import { generateAccessToken, getAccessToken } from "@envyper/orm/accessTokens";
import { Hono } from "hono";

const tokens = new Hono()

  .get(
    "/",
    zValidator("query", UserSchema.pick({ clerkUserId: true })),
    async (c) => {
      const { clerkUserId } = c.req.valid("query");

      const accessToken = await getAccessToken(clerkUserId);
      if (!accessToken) {
        return c.json(
          {
            message:
              "Could not find access token. Make sure you are authenticated",
          },
          400,
        );
      }

      return c.json(
        {
          accessToken: accessToken,
        },
        200,
      );
    },
  )

  .post(
    "/refresh",
    zValidator("json", UserSchema.pick({ clerkUserId: true })),
    async (c) => {
      const { clerkUserId } = c.req.valid("json");

      const user = await getUser(clerkUserId);
      if (!user) {
        return c.json(
          {
            message: "User not authorized",
          },
          401,
        );
      }

      const newToken = await generateAccessToken(clerkUserId);
      return c.json(
        {
          accessToken: newToken.token,
        },
        200,
      );
    },
  );

export default tokens;
