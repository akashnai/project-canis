import { Message } from "whatsapp-web.js";
import fs from "fs/promises";
import log from "../components/utils/log";

export const info = {
  command: "restart",
  description: "Restart the bot.",
  usage: "restart",
  example: "restart",
  role: "admin",
  cooldown: 5000,
};

export default async function (msg: Message) {
  if (!/^restart$/i.test(msg.body)) return;
  await msg.react("🔄");

  const tempDir = "./.temp";
  await fs.mkdir(tempDir, { recursive: true });

  const tempPath = `${tempDir}/restart`;
  await fs.writeFile(tempPath, JSON.stringify(msg));

  log.info("restart", "exiting...");
  process.exit(0);
}
