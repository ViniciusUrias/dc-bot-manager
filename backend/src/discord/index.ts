import {
	Client,
	Collection,
	CommandInteraction,
	Events,
	GatewayIntentBits,
	MessageFlags,
	PresenceUpdateStatus,
	REST,
	Routes,
	SlashCommandBuilder,
} from "discord.js";
import fs from "node:fs";
import path from "node:path";
declare module "discord.js" {
	interface Client {
		commands: Collection<string, any>;
	}
}
const initiateConnection = async ({ serverId, userId }) => {
	const token = "MTM1NTE5NTc2NTg4MTk2NjY1Mg.G50r-p.z4XI4UbjSMuzHni3i3oH44rhTDkUuw5QlM_4Fo";
	const clientId = "1355195765881966652";
	const guildId = "1205631512007934032";
	const channelId = "1355197976242295017";
	// Create a new client instance
	const client = new Client({ intents: [GatewayIntentBits.Guilds] });

	// When the client is ready, run this code (only once).
	// The distinction between `client: Client<boolean>` and `readyClient: Client<true>` is important for TypeScript developers.
	// It makes some properties non-nullable.
	client.once(Events.ClientReady, (readyClient) => {
		console.log(`Ready! Logged in as ${readyClient.user.tag}`);
	});

	const commands = [];
	// Log in to Discord with your client's token
	client.login(token);

	client.commands = new Collection();

	const foldersPath = path.join(__dirname, "commands");
	const testPath = path.join(__dirname, "users", userId, "servers", serverId, "commands");
	console.log("foldersPath", testPath);
	const commandFolders = fs.readdirSync(foldersPath);
	if (!fs.existsSync(testPath)) {
		fs.mkdirSync(testPath, { recursive: true });
	}

	for (const folder of commandFolders) {
		const commandsPath = path.join(foldersPath, folder);
		const commandFiles = fs.readdirSync(commandsPath).filter((file) => file.endsWith(".ts") || file.endsWith(".js"));
		for (const file of commandFiles) {
			const filePath = path.join(commandsPath, file);
			const command = require(filePath).default;
			console.log(command);
			// Set a new item in the Collection with the key as the command name and the value as the exported module
			if ("data" in command && "execute" in command) {
				commands.push(command.data.toJSON());
				client.commands.set(command.data.name, command);
			} else {
				console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
			}
		}
	}
	const newCommand = {
		data: new SlashCommandBuilder()
			.setName("teste")
			.setDescription("Test command")
			.addStringOption((option) =>
				option
					.setName("category")
					.setDescription("The gif category")
					.setRequired(true)
					.addChoices(
						{ name: "Funny", value: "gif_funny" },
						{ name: "Meme", value: "gif_meme" },
						{ name: "Movie", value: "gif_movie" }
					)
			),
		async execute(interaction: CommandInteraction) {
			console.log("intereaction", interaction);
			const {} = interaction;
			// interaction.user is the object representing the User who ran the command
			// interaction.member is the GuildMember object, which represents the user in the specific guild
			const onlines = async () =>
				interaction.guild.members.fetch({ withPresences: true }).then((fetchedMembers) => {
					const totalOnline = fetchedMembers.filter(
						(member) => member.presence?.status === PresenceUpdateStatus.Online
					);
					return totalOnline.size.toString();
				});
			await interaction.reply({
				content: `Hello ${interaction.user.username}, you are in the guild ${interaction.guild.name}`,
				body: { content: `teste mensagem` },
			});
			await interaction.followUp({
				content: await onlines(),
			});
		},
	};
	client.commands.set(newCommand.data.name, newCommand);
	commands.push(newCommand.data.toJSON());

	client.on(Events.InteractionCreate, async (interaction: CommandInteraction) => {
		if (!interaction.isChatInputCommand()) return;
		console.log("INTERACTION", interaction);
		const command = interaction.client.commands.get(interaction.commandName);

		if (!command) {
			console.error(`No command matching ${interaction.commandName} was found.`);
			return;
		}

		try {
			await command.execute(interaction);
		} catch (error) {
			console.error(error);
			if (interaction.replied || interaction.deferred) {
				await interaction.followUp({
					content: "There was an error while executing this command!",
					flags: MessageFlags.Ephemeral,
				});
			} else {
				await interaction.reply({
					content: "There was an error while executing this command!",
					flags: MessageFlags.Ephemeral,
				});
			}
		}
	});
	const rest = new REST().setToken(token);
	// delete a command
	// rest.delete(Routes.applicationGuildCommand(clientId, guildId, 'commandId'))
	// .then(() => console.log('Successfully deleted guild command'))
	// .catch(console.error);

	(async () => {
		try {
			console.log(`Started refreshing ${commands.length} application (/) commands.`);
			// await rest.post(Routes.channelMessages(channelId), { body: { content: "Hello world!" } });

			// The put method is used to fully refresh all commands in the guild with the current set
			const data = await rest.put(Routes.applicationGuildCommands(clientId, guildId), { body: commands });

			console.log(`Successfully reloaded ${data.length} application (/) commands.`);
		} catch (error) {
			// And of course, make sure you catch and log any errors!
			console.error(error);
		}
	})();
};

export { initiateConnection };
