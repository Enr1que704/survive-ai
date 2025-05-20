import { SlashCommandBuilder } from 'discord.js';
import generateResponse from '../api/apiCalls.js';

export const data = new SlashCommandBuilder()
    .setName('ai')
    .setDescription('Ask the AI a question')
    .addStringOption(option =>
        option.setName('prompt')
            .setDescription('The prompt to send to the AI')
            .setRequired(true));

export async function execute(interaction) {
    await interaction.deferReply();
    
    const prompt = interaction.options.getString('prompt');
    console.log('AI Prompt:', prompt);
    
    try {
        const response = await generateResponse(prompt);
        console.log('AI Response:', response);
        await interaction.editReply(response);
    } catch (error) {
        console.error('Error in AI command:', error);
        await interaction.editReply('Sorry, there was an error processing your request.');
    }
} 