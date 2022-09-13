import { Request, Response, NextFunction } from "express";
import { type Role } from "discord.js";
import botClient from "../lib/client";

const AddRole = async (discordUserId: string) => {
  const BOT_TOKEN = process.env.DISCORD_BOT_TOKEN;
  const GUILD_ID = process.env.DISCORD_GUILD_ID;
  const ROLE_CAP_HOLDER_ID = process.env.DISCORD_ROLE_CAP_HOLDER_ID;
  let errors: { [index: string]: string } = { message: "" };

  if (botClient.isReady() === false) {
    await botClient.login(BOT_TOKEN);
    console.debug("Bot client re-logged in");
  }

  try {
    let guild = await botClient.guilds.cache.get(GUILD_ID!);
    if (!guild) {
      guild = await botClient.guilds.fetch(GUILD_ID!);
      console.debug("Guild is fetched as it is not cached");
    }

    let guildRole = await guild.roles.cache.get(ROLE_CAP_HOLDER_ID!);
    if (!guildRole) {
      guildRole = (await guild.roles.fetch(ROLE_CAP_HOLDER_ID!)) as Role;
      console.debug("Role is fetched as it is not cached");
    }

    const member = await guild.members.fetch(discordUserId);
    await member.roles.add(guildRole!);
  } catch (err) {
    errors.message = err as string;
    return { hasAdded: false, errors };
  }

  return { hasAdded: true, errors };
};

const add = async (req: Request, res: Response) => {
  const { discordUserId, MESHER_TOKEN } = req.body;
  const hasAdded = false;
  let errors: { [index: string]: string } = { message: "" };

  if (!discordUserId) {
    errors.message = "Not Found";
    return res.status(404).json({ hasAdded, errors });
  }
  if (MESHER_TOKEN !== process.env.MESHER_TOKEN) {
    errors.message = "Unauthorized";
    return res.status(401).json({ hasAdded, errors });
  }

  try {
    res.status(200).json(await AddRole(discordUserId));
  } catch (err) {
    if (typeof err === "string") errors.message = err as string;
    else errors.message = "Unknown error";
    res.status(400).json({ hasAdded, errors });
  }
};

const test = (req: Request, res: Response) => {
  res.render("testView");
};

export default { add, test };
