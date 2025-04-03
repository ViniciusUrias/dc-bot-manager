import { SlashCommandBuilder, CommandInteraction, Command } from "discord.js";
declare module "discord.js" {
	interface Client {
		commands: Collection<string, any>;
	}
}
// creating a slash command to be used like /user
export default {
  data: new SlashCommandBuilder()
    .setName("2")
    .setDescription("2 information about the user."),
  async execute(interaction: CommandInteraction) {
    // interaction.user is the object representing the User who ran the command
    // interaction.member is the GuildMember object, which represents the user in the specific guild
    await interaction.reply(
      `This command was run by ${interaction.client?.commands?.values()}, who joined on ${interaction.member.joinedAt}.`
    );
  },
};


