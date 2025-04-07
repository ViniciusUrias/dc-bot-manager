import { NextResponse, type NextRequest } from "next/server";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/v1";

export async function middleware(request: NextRequest) {
	const sessionToken = request.cookies.get("session_token")?.value;
	const { pathname } = request.nextUrl;

	// Rotas públicas
	const publicPaths = ["/login", "/register"];

	// Verificar autenticação para rotas protegidas
	if (!publicPaths.includes(pathname)) {
		if (!sessionToken) {
			return NextResponse.redirect(new URL("/login", request.url));
		}

		try {
			// Verificar token com o backend
			const response = await fetch(`${API_URL}/verify-token`, {
				headers: {
					Cookie: `session_token=${sessionToken}`,
				},
			});

			if (!response.ok) {
				throw new Error("Invalid token");
			}
		} catch (error) {
			const response = NextResponse.redirect(new URL("/login", request.url));
			response.cookies.delete("session_token");
			return response;
		}
	}

	return NextResponse.next();
}

export const config = {
	matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
