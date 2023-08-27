import { formatLogEmbed } from './LogEmbedFormatter.js'
import config from '../config/config.json' assert { type: 'json' }
import { client } from '../AliceBot.js'


let isChannelMessageLoggerEnabled = config.isChannelMessageLoggerEnabled
let channelId = config.messageLoggerChannelId

export function logMessageToChannel (message) {
  const messageChannel = client.channels.cache.get(channelId)

  //checks if the message was sent in a text channel
  if (messageChannel?.isTextBased() && isChannelMessageLoggerEnabled) {
    const embed = formatLogEmbed(message)
    messageChannel.send({ embeds: [embed] })
  } else {
    console.log('Target channel not found or is not a text channel.')
  }
}
