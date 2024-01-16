require("./server.js");

const { Client } = require("discord.js-selfbot-v13");
const client = new Client({
  checkUpdate: false
});
const { stripIndents } = require("common-tags");
const config = require("./config.json");

client.login(process.env.TOKEN);

client.on("ready", (client) => {
  console.log(`${client.user.tag} is ready!`);
  console.log("--------------------------------");
  console.log(`Servers  :: ${client.guilds.cache.size}`);
  console.log(`Channels :: ${client.channels.cache.size}`);
  console.log(`Users    :: ${client.users.cache.size}`);

  client.user.setStatus("dnd");
  
  /* TYPE ACTIVITY
    0 = Playing
    1 = Streaming
    2 = Listening to
    3 = Watching
    4 = Custom
    5 = Competing */
  client.user.setActivity({
    name: "Test",
    type: 0
  })
});

client.on("messageCreate", (msg) => {
  let args = msg.content.trim().split(/ +/);
  let cmd = args.shift().toLowerCase();
  if (!config.owners.includes(msg.author.id)) return;
  
  if (cmd == "ping") {
    msg.channel.send(stripIndents` \`\`\`md
      Latency: ${new Date().getTime() - msg.createdTimestamp}ms
      API: ${Math.round(client.ws.ping)}ms
    \`\`\``);
  }
  
    if (cmd == "eval" || cmd == "ev") {
    try {
      const code = args.join(" ");
      if (!code) return;
      let evaled = eval(code);
      if (typeof evaled !== "string")
        evaled = require("util").inspect(evaled, { depth: 0 });
      let output = clean(evaled);
      if (output.length > 2000) {
        console.log(output);
        msg.channel.send(stripIndents`\`\`\`js
          Error on console
        \`\`\``);
      } else {
        msg.channel.send(`\`\`\`js\n${output}\`\`\``);
      }
    } catch (error) {
      let err = clean(error);
      if (err.length > 2000) {
        console.log(err);
        msg.channel.send(`\`\`\`js
        Error on console
        \`\`\``);
      } else {
        msg.channel.send(`**ERROR**\n\`\`\`js\n${err}\`\`\``);
      }
    }
  }
  
})

function clean(string) {
  if (typeof text === "string") {
    return string
      .replace(/`/g, "`" + String.fromCharCode(8203))
      .replace(/@/g, "@" + String.fromCharCode(8203));
  } else {
    return string;
  }
}