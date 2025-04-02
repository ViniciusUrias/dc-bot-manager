// prisma/postinstall.js
const { execSync } = require("child_process");

try {
	console.log("Generating Prisma client...");
	execSync("npx prisma generate", { stdio: "inherit" });
} catch (error) {
	console.error("Prisma client generation failed:", error);
	process.exit(1);
}
