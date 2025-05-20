import { Collection } from 'discord.js';
import * as aiCommand from './ai.js';

const commands = [aiCommand];

export const commandsCollection = new Collection();

for (const command of commands) {
    commandsCollection.set(command.data.name, command);
}

export const commandsData = commands.map(command => command.data.toJSON()); 