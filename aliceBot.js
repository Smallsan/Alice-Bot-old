import { Client, GatewayIntentBits } from 'discord.js'
import { logMessageToLocal } from './modules/LocalMessageLogger.js'
import { logMessageToChannel } from './modules/ChannelMessageLogger.js'
import { logToOwner } from './modules/StalkerMessageLogger.js'
import { messageCommands } from './Commands/MessageCommands.js'
import { setPresence } from './modules/Presence.js'
import config from './config/config.json' assert { type: 'json' }
import keys from './keys.json' assert { type: 'json' }

const presenceName = config.presenceName
const presenceType = config.presenceType
const url = config.url

export const client = new Client({
  intents: [
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.Guilds
  ]
})

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}`)
  setPresence(presenceName, presenceType, url)
})

client.on('messageCreate', async message => {
  if (message.author.bot || !message.guild) return
  logMessageToLocal(message)
  logMessageToChannel(message)
  logToOwner(message)
  messageCommands(message)
})

client.login(keys.discordTestApi)
