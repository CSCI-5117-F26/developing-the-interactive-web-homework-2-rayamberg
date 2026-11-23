/* from better-auth documentation */
import { betterAuth } from "better-auth";
import { mongodbAdapter } from "@better-auth/mongo-adapter";
import { client, db } from '#lib/server/db.ts';
import { sveltekitCookies } from "better-auth/svelte-kit";
import { getRequestEvent } from "$app/server";

export const auth = betterAuth({
  database: mongodbAdapter(db, { client }),
  emailAndPassword: {
    enabled: true
  },
  plugins: [sveltekitCookies(getRequestEvent)] //must be last
   /*below possibly for later integration with social sign on. don't remember if we are 
  supposed to implement social sign on or not*/ 
   /*socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }
  }*/
});
