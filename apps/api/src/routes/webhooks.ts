import { Hono } from "hono";
import { Webhook } from "svix";
import { createUser } from "@envyper/orm/users";
import { generateAccessToken } from "@envyper/orm/accessTokens";

const webhooks = new Hono().post("/", async (c) => {
  const SIGNING_SECRET = process.env.CLERK_SIGNING_SECRET as string;
  if (!SIGNING_SECRET) {
    // send error to expection tracking service
    throw new Error("Error: Add SIGNING_SECRET from Clerk Dashboard");
  }

  const hook = new Webhook(SIGNING_SECRET);

  const payload = await c.req.text();

  const svixId = c.req.header("svix-id");
  const svixTimestamp = c.req.header("svix-timestamp");
  const svixSignature = c.req.header("svix-signature");

  if (!svixId || !svixTimestamp || !svixSignature) {
    // send error to error tracking service
    console.log("Error: Missing svix headers");

    return c.json(
      {
        message: "Error: Missing svix headers",
      },
      400,
    );
  }

  let event: any;

  try {
    event = hook.verify(payload, {
      "svix-id": svixId as string,
      "svix-timestamp": svixTimestamp as string,
      "svix-signature": svixSignature as string,
    });
  } catch (err) {
    console.log("Error: Could not verify webhook:", err);
    return c.json(
      {
        message: "Error: Could not verify webhook",
      },
      400,
    );
  }

  const {
    id: clerkUserId,
    email_addresses,
    first_name,
    last_name,
  } = event.data;

  if (event.type === "user.created") {
    // create user in database
    const user = await createUser({
      clerkUserId,
      email: email_addresses[0]?.email_address,
      firstName: first_name,
      lastName: last_name,
    });

    // generate token for user
    const accessToken = await generateAccessToken(user.clerkUserId);

    return c.json(
      {
        user: user,
        accessToken: accessToken.token,
      },
      200,
    );
  }
});

export default webhooks;
