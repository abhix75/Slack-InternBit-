const { App } = require("@slack/bolt");
require("dotenv").config();

const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  signingSecret: process.env.SLACK_SIGNING_SECRET,
  socketMode: true,
  appToken: process.env.SLACK_APP_TOKEN,
});

app.command("/forward", async ({ command, ack, say, client }) => {
  await ack();
  if (command.channel_name === "channel-1") {
    const message = command.text;
    const uppercaseMessage = message.toUpperCase();

    try {
      await client.chat.postMessage({
        channel: "channel-2",
        text: uppercaseMessage,
      });
    } catch (error) {
      console.error(error);
    }
  } else {
    await say("This command can only be used in Channel 1.");
  }
});

(async () => {
  await app.start(process.env.PORT);
  console.log(`⚡️ Bot app is running on port ${process.env.PORT}!`);
})();
