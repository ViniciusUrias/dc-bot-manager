import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

export const { handlers, signIn, signOut, auth } = NextAuth({
	providers: [
		Credentials({
			credentials: {
				email: { label: "Email", type: "email" },
				password: { label: "Password", type: "password" },
			},
			authorize: async (credentials) => {
				try {
					const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
						method: "POST",
						headers: {
							"Content-Type": "application/json",
						},
						body: JSON.stringify({
							email: credentials.email,
							password: credentials.password,
						}),
					});

					if (!response.ok) {
						throw new Error("Invalid credentials");
					}

					const user = await response.json();
					console.log("USER RESPONSE JSON", user);
					// Return the user object which will be saved in the session
					return user;
				} catch (error) {
					console.error("Authorization error:", error);
					return null;
				}
			},
		}),
	],
	// Add session configuration if needed
	session: {
		strategy: "jwt",
	},
	// Add pages configuration if you want custom pages
	pages: {
		signIn: "/login",
	},
	// Add callbacks if you need to customize the session
	callbacks: {
		async jwt({ token, user }) {
			// Persist user data to the token right after sign in
			console.log("JWT", { token, user });
			if (user) {
				token.id = user.id;
				token.name = user.name;
				token.email = user.email;
			}
			return token;
		},
		async session({ session, token }) {
			console.log("SESSION", { session, token });

			// Send properties to the client, like an access_token and user id
			if (token?.id) {
				session.user.id = token.id as string;
				session.user.name = token.name as string;
				session.user.email = token.email as string;
			}
			return session;
		},
	},
});
