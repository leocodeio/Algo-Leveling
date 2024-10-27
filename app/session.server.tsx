// app/sessions.ts
import { createCookieSessionStorage, redirect } from "@remix-run/cloudflare";
import { UserSession } from "./model/user-session";
import { randomBytes } from "node:crypto";

const sessionSecret = process.env.SESSION_SECRET || "s3cr3t"; // Ensure to set a real secret in production

type sessionData = UserSession; // Use the UserSession type for session data

type sessionFlashData = {
  error: string;
};

export const sessionStorage = createCookieSessionStorage<
  sessionData,
  sessionFlashData
>({
  // a Cookie from `createCookie` or the CookieOptions to create one
  cookie: {
    name: "TB__session",

    // all of these are optional
    domain: process.env.DOMAIN_NAME || "localhost",
    // Expires can also be set (although maxAge overrides it when used in combination).
    // Note that this method is NOT recommended as `new Date` creates only one date on each server deployment, not a dynamic date in the future!
    //
    // expires: new Date(Date.now() + 60_000),
    httpOnly: true,
    // Max age is in seconds, so 60 is 1 minute
    maxAge: 60 * 60,
    // This configures the path where the cookie will be available, / means
    // everywhere
    path: "/",
    sameSite: "lax",
    secrets: [sessionSecret],
    secure: process.env.NODE_ENV === "production",
  },
});

export function generateCSRFToken() {
  return randomBytes(100).toString("base64");
}

export async function getUserSession(request: Request) {
  const session = await sessionStorage.getSession(
    request.headers.get("Cookie")
  );

  return session;
}

export async function getUserInfo(
  request: Request
): Promise<UserSession | null> {
  const session = await getUserSession(request);

  if (!session) {
    return null;
  }

  const userSession: UserSession = {
    id: session.get("id") || "",
    access_token: session.get("access_token") || "",
    lightOrDarkMode:
      (session.get("lightOrDarkMode") as "light" | "dark") || "light",
    language: session.get("language") || "en",
    CSRFToken: session.get("CSRFToken") || "",
    metrics: session.get("metrics") || { lastLogin: new Date(), loginCount: 0 },
    impersonatingFromUserId:
      session.get("impersonatingFromUserId") || undefined,
  };

  return userSession;
}

export async function logout(request: Request) {
  const session = await sessionStorage.getSession(
    request.headers.get("Cookie")
  );

  if (session) {
    await sessionStorage.destroySession(session);
  }

  return redirect("/login", {
    headers: {
      "Set-Cookie": await sessionStorage.commitSession(session),
    },
  });
}

export async function createUserSession(
  request: Request,
  userSession: UserSession,
  redirectTo: string = ""
) {
  // console.log(
  //   "at session.server.ts we have, req",
  //   request,
  //   "userSession",
  //   userSession,
  //   "redirectTo",
  //   redirectTo,
  // );
  const session = await sessionStorage.getSession(
    request.headers.get("Cookie")
  );

  session.set("id", userSession.id);
  session.set("access_token", userSession.access_token);
  session.set("lightOrDarkMode", userSession.lightOrDarkMode);
  session.set("language", userSession.language);
  session.set("CSRFToken", userSession.CSRFToken);
  session.set("metrics", userSession.metrics);
  session.set("impersonatingFromUserId", userSession.impersonatingFromUserId);
  console.log("when session is created userId is", userSession.id);
  return redirect(redirectTo, {
    headers: {
      "Set-Cookie": await sessionStorage.commitSession(session),
    },
  });
}

export async function destroyUserSession(request: Request) {
  const session = await getSession(request.headers.get("Cookie"));
  // console.log("--------------bp-------------------");
  // console.log(session.data)
  // Check if session exists before trying to destroy it
  if (session) {
    return redirect("/login", {
      headers: {
        "Set-Cookie": await destroySession(session),
      },
    });
  }
  return redirect("/login"); // Default redirect if no session found
}

export async function isUserLoggedIn(request: Request) {
  const userSession = await getUserSession(request);
  // console.log("userSession", userSession);
  // console.log(userSession.get("id"));
  if (userSession.get("id") === null) {
    // if there is no user session, redirect to login
    throw redirect("/login");
  }
  return userSession;
}

export const { getSession, commitSession, destroySession } = sessionStorage;
