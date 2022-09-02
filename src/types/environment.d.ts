declare global {
	namespace NodeJS {
		interface ProcessEnv {
			DISCORD_REDIRECT_URI: string;
			DISCORD_CLIENT_ID: string;
			DISCORD_CLIENT_SECRET: string;
			DISCORD_BOT_TOKEN: string;
			DISCORD_GUILD_ID: string;
			DISCORD_CHANNEL_ID: string;
			DISCORD_ROLE_CAP_HOLDER_ID: string;
		}
	}
}

export {}; // required for declarations to work
