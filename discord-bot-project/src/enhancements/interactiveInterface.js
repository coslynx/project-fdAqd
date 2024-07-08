const { Client, MessageActionRow, MessageButton } = require('discord.js');

const client = new Client();

client.on('messageCreate', async (message) => {
  if (message.content === '!play') {
    const row = new MessageActionRow()
      .addComponents(
        new MessageButton()
          .setCustomId('play_button')
          .setLabel('Play')
          .setStyle('PRIMARY')
      );

    await message.reply({ content: 'Click to play music:', components: [row] });
  }
});

client.on('interactionCreate', async (interaction) => {
  if (!interaction.isButton()) return;

  if (interaction.customId === 'play_button') {
    await interaction.reply('Playing music...');
  }
});

client.login('your-bot-token');