const { 
  Client, 
  GatewayIntentBits, 
  ActionRowBuilder, 
  StringSelectMenuBuilder 
} = require("discord.js");

const client = new Client({
  intents: [GatewayIntentBits.Guilds]
});

client.once("ready", () => {
  console.log("Bot is online!");
});

client.on("interactionCreate", async interaction => {
  if (interaction.isChatInputCommand()) {
    if (interaction.commandName === "ticket") {
      const menu = new StringSelectMenuBuilder()
        .setCustomId("ticket_menu")
        .setPlaceholder("Select ticket reason")
        .addOptions(
          { label: "Support", value: "support" },
          { label: "Partnership", value: "partner" },
          { label: "Question", value: "question" }
        );

      const row = new ActionRowBuilder().addComponents(menu);

      await interaction.reply({
        content: "🎟️ Create a ticket:",
        components: [row]
      });
    }
  }

  if (interaction.isStringSelectMenu()) {
    if (interaction.customId === "ticket_menu") {
      await interaction.reply({
        content: `✅ Ticket created for **${interaction.values[0]}**`,
        ephemeral: true
      });
    }
  }
});

client.login(process.env.TOKEN);
