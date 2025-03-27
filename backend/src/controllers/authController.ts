import AuthService from "../services/auth";

const authenticate = async (req, res) => {
	const { email, password } = req.body;

	try {
		const token = await AuthService.login(email, password);
		res.send({ token });
	} catch (error) {
		console.error("Error during login:", error.message);
		res.status(401).send({ error: error.message });
	}
};

const AuthController = { authenticate };

export default AuthController;
