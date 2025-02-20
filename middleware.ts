import { NextResponse } from "next/server";
import { jwtVerify } from "jose";
import { cookies } from "next/headers"; // Import cookies from next/headers

interface DecodedToken {
  role: number;
  [key: string]: any; // Extendable to add other properties from the decoded token payload
}

const secretKey = new TextEncoder().encode(process.env.JWT_SECRET as string);

const decodeToken = async (
  token: string | undefined
): Promise<DecodedToken | null> => {
  try {
    if (!token) return null;

    const { payload } = await jwtVerify(token, secretKey);
    return payload as DecodedToken; // Explicitly type the payload as DecodedToken
  } catch (err) {
    return null; // Invalid token or decoding error
  }
};

// Helper function to check if the path is restricted based on the user role
// const checkRestrictedPath = (
//   role: number | null,
//   restrictedPaths: string[],
//   pathname: string
// ): boolean => {
//   return restrictedPaths.includes(pathname) && role !== null;
// };

// const isAdmin = async (req: Request) => {
//   const cookieStore = await cookies(); // Get the cookies from the request
//   const token = cookieStore.get(process.env.TOKEN_NAME as string)?.value;
//   const decodedToken = await decodeToken(token);
//   const restrictedPaths = ["/my-progress", "/register", "/"];

//   const url = new URL(req.url); // Create URL object from the request URL

//   if (
//     decodedToken &&
//     decodedToken.role === 1 &&
//     checkRestrictedPath(decodedToken.role, restrictedPaths, url.pathname)
//   ) {
//     url.pathname = "/dashboard"; // Modify the pathname
//     return NextResponse.redirect(url); // Redirect to dashboard
//   }
//   return null;
// };

const isMember = async (req: Request) => {
  const cookieStore = await cookies(); // Get the cookies from the request
  const token = cookieStore.get(process.env.TOKEN_NAME as string)?.value;
  const decodedToken = await decodeToken(token);
  //   const restrictedPaths = [
  //     "/statistics",
  //     "/population",
  //     "/puroks",
  //     "/",
  //     "/users",
  //     "/users/:id",
  //     "/purok/:id",
  //   ];

  const url = new URL(req.url); // Create URL object from the request URL

  //   if (
  //     decodedToken &&
  //     checkRestrictedPath(decodedToken.role, restrictedPaths, url.pathname)
  //   ) {
  //     url.pathname = "/dashboard"; // Modify the pathname
  //     return NextResponse.redirect(url); // Redirect to dashboard
  //   }
  //   return null;
  const isRestrictedPath = (url: string) => {
    const restrictedPaths = ["/login", "/register"];
    return restrictedPaths.some((path) => url.includes(path));
  };

  if (!decodedToken && !isRestrictedPath(req.url)) {
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }
  // if (
  //   !decodedToken &&
  //   !req.url.includes("/login") &&
  //   !req.url.includes("/register")
  // ) {
  //   url.pathname = "/login";
  //   return NextResponse.redirect(url);
  // }

  if (decodedToken && req.url.includes("/login")) {
    url.pathname = "/"; // Redirect authenticated user to the dashboard
    return NextResponse.redirect(url);
  }

  //   if (!decodedToken && req.url !== "/login" && !req.url.includes("/register")) {
  //     url.pathname = "/login"; // Redirect unauthenticated users to login page
  //     return NextResponse.redirect(url);
  //   }

  // If user is not logged in and tries to access any page other than login, redirect them to the login page
  //   else if (!decodedToken && req.url !== "/login") {
  //     url.pathname = "/login"; // Redirect unauthenticated users to login page
  //     return NextResponse.redirect(url);
  //   }

  // Proceed as normal if no redirects are needed
  return NextResponse.next();
};

// const noUser = async (req: Request) => {
//   const cookieStore = await cookies(); // Get the cookies from the request
//   const token = cookieStore.get(process.env.TOKEN_NAME as string)?.value;
//   const decodedToken = await decodeToken(token);
//   const url = new URL(req.url); // Create URL object from the request URL

//   if (!decodedToken && req.url !== "/login" && !req.url.includes("/register")) {
//     url.pathname = "/login"; // Redirect unauthenticated users to login page
//     return NextResponse.redirect(url);
//   }

//   return NextResponse.next();
// };

// const isAnonymous = async (req: Request) => {
//   const cookieStore = await cookies(); // Get the cookies from the request
//   const token = cookieStore.get(process.env.TOKEN_NAME as string)?.value;
//   const decodedToken = await decodeToken(token);
//   const restrictedPaths = [
//     "/dashboard",
//     "/events",
//     "/my-progress",
//     "/statistics",
//     "/puroks",
//     "/population",
//     "/users",
//     "/users/:id",
//     "/purok/:id",
//   ];

//   const url = new URL(req.url); // Create URL object from the request URL

//   if (
//     !decodedToken &&
//     checkRestrictedPath(null, restrictedPaths, url.pathname)
//   ) {
//     url.pathname = "/"; // Modify the pathname to the homepage
//     return NextResponse.redirect(url); // Redirect to homepage
//   }
//   return null;
// };

export async function middleware(req: Request) {
  //   const adminResponse = await isAdmin(req);
  //   if (adminResponse) return adminResponse;
  //   const noUserResponse = await noUser(req);
  //   if (noUserResponse) return noUserResponse;

  const memberResponse = await isMember(req);
  if (memberResponse) return memberResponse;

  //   const isAnonymousResponse = await isAnonymous(req);
  //   if (isAnonymousResponse) return isAnonymousResponse;

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/home", "/login", "/register", "/blueprint"],
};
