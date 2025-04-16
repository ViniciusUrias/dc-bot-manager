import { z } from "zod";

/////////////////////////////////////////
// HELPER FUNCTIONS
/////////////////////////////////////////

/////////////////////////////////////////
// ENUMS
/////////////////////////////////////////

export const TransactionIsolationLevelSchema = z.enum([
	"ReadUncommitted",
	"ReadCommitted",
	"RepeatableRead",
	"Serializable",
]);

export const UserScalarFieldEnumSchema = z.enum([
	"id",
	"name",
	"email",
	"emailVerified",
	"image",
	"createdAt",
	"updatedAt",
]);

export const SessionScalarFieldEnumSchema = z.enum([
	"id",
	"expiresAt",
	"token",
	"createdAt",
	"updatedAt",
	"ipAddress",
	"userAgent",
	"userId",
]);

export const AccountScalarFieldEnumSchema = z.enum([
	"id",
	"accountId",
	"providerId",
	"userId",
	"accessToken",
	"refreshToken",
	"idToken",
	"accessTokenExpiresAt",
	"refreshTokenExpiresAt",
	"scope",
	"password",
	"createdAt",
	"updatedAt",
]);

export const VerificationScalarFieldEnumSchema = z.enum([
	"id",
	"identifier",
	"value",
	"expiresAt",
	"createdAt",
	"updatedAt",
]);

export const ServerScalarFieldEnumSchema = z.enum([
	"id",
	"name",
	"description",
	"ownerId",
	"createdAt",
	"updatedAt",
	"serverid",
]);

export const BotScalarFieldEnumSchema = z.enum([
	"id",
	"name",
	"token",
	"active",
	"ownerId",
	"prefix",
	"createdAt",
	"updatedAt",
	"description",
	"tags",
	"icon",
	"serverId",
]);

export const CommandScalarFieldEnumSchema = z.enum([
	"id",
	"name",
	"description",
	"response",
	"enabled",
	"botId",
	"createdAt",
	"updatedAt",
]);

export const CommandPermissionScalarFieldEnumSchema = z.enum(["id", "commandId", "roleId", "allow", "createdAt"]);

export const EventScalarFieldEnumSchema = z.enum([
	"id",
	"name",
	"action",
	"enabled",
	"botId",
	"createdAt",
	"updatedAt",
]);

export const BotConfigScalarFieldEnumSchema = z.enum(["id", "key", "value", "botId", "createdAt", "updatedAt"]);

export const CommandUsageScalarFieldEnumSchema = z.enum([
	"id",
	"commandId",
	"userId",
	"guildId",
	"channelId",
	"timestamp",
]);

export const AnalyticsScalarFieldEnumSchema = z.enum(["id", "botId", "eventType", "data", "timestamp"]);

export const SortOrderSchema = z.enum(["asc", "desc"]);

export const QueryModeSchema = z.enum(["default", "insensitive"]);

export const NullsOrderSchema = z.enum(["first", "last"]);
/////////////////////////////////////////
// MODELS
/////////////////////////////////////////

/////////////////////////////////////////
// USER SCHEMA
/////////////////////////////////////////

export const UserSchema = z.object({
	id: z.string(),
	name: z.string(),
	email: z.string(),
	emailVerified: z.boolean(),
	image: z.string().nullable(),
	createdAt: z.coerce.date(),
	updatedAt: z.coerce.date(),
});

export type User = z.infer<typeof UserSchema>;

/////////////////////////////////////////
// SESSION SCHEMA
/////////////////////////////////////////

export const SessionSchema = z.object({
	id: z.string(),
	expiresAt: z.coerce.date(),
	token: z.string(),
	createdAt: z.coerce.date(),
	updatedAt: z.coerce.date(),
	ipAddress: z.string().nullable(),
	userAgent: z.string().nullable(),
	userId: z.string(),
});

export type Session = z.infer<typeof SessionSchema>;

/////////////////////////////////////////
// ACCOUNT SCHEMA
/////////////////////////////////////////

export const AccountSchema = z.object({
	id: z.string(),
	accountId: z.string(),
	providerId: z.string(),
	userId: z.string(),
	accessToken: z.string().nullable(),
	refreshToken: z.string().nullable(),
	idToken: z.string().nullable(),
	accessTokenExpiresAt: z.coerce.date().nullable(),
	refreshTokenExpiresAt: z.coerce.date().nullable(),
	scope: z.string().nullable(),
	password: z.string().nullable(),
	createdAt: z.coerce.date(),
	updatedAt: z.coerce.date(),
});

export type Account = z.infer<typeof AccountSchema>;

/////////////////////////////////////////
// VERIFICATION SCHEMA
/////////////////////////////////////////

export const VerificationSchema = z.object({
	id: z.string(),
	identifier: z.string(),
	value: z.string(),
	expiresAt: z.coerce.date(),
	createdAt: z.coerce.date().nullable(),
	updatedAt: z.coerce.date().nullable(),
});

export type Verification = z.infer<typeof VerificationSchema>;

/////////////////////////////////////////
// SERVER SCHEMA
/////////////////////////////////////////

export const ServerSchema = z.object({
	id: z.string(),
	name: z.string(),
	description: z.string().nullable(),
	ownerId: z.string(),
	createdAt: z.coerce.date(),
	updatedAt: z.coerce.date(),
	serverid: z.string().nullable(),
});

export type Server = z.infer<typeof ServerSchema>;

/////////////////////////////////////////
// BOT SCHEMA
/////////////////////////////////////////

export const BotSchema = z.object({
	id: z.string(),
	name: z.string(),
	token: z.string(),
	active: z.boolean(),
	ownerId: z.string(),
	prefix: z.string(),
	createdAt: z.coerce.date(),
	updatedAt: z.coerce.date(),
	description: z.string(),
	tags: z.string().array(),
	icon: z.string().nullable(),
	serverId: z.string(),
});

export type Bot = z.infer<typeof BotSchema>;

/////////////////////////////////////////
// COMMAND SCHEMA
/////////////////////////////////////////

export const CommandSchema = z.object({
	id: z.string(),
	name: z.string(),
	description: z.string(),
	response: z.string(),
	enabled: z.boolean(),
	botId: z.string(),
	createdAt: z.coerce.date(),
	updatedAt: z.coerce.date(),
});

export type Command = z.infer<typeof CommandSchema>;

/////////////////////////////////////////
// COMMAND PERMISSION SCHEMA
/////////////////////////////////////////

export const CommandPermissionSchema = z.object({
	id: z.string(),
	commandId: z.string(),
	roleId: z.string(),
	allow: z.boolean(),
	createdAt: z.coerce.date(),
});

export type CommandPermission = z.infer<typeof CommandPermissionSchema>;

/////////////////////////////////////////
// EVENT SCHEMA
/////////////////////////////////////////

export const EventSchema = z.object({
	id: z.string(),
	name: z.string(),
	action: z.string(),
	enabled: z.boolean(),
	botId: z.string(),
	createdAt: z.coerce.date(),
	updatedAt: z.coerce.date(),
});

export type Event = z.infer<typeof EventSchema>;

/////////////////////////////////////////
// BOT CONFIG SCHEMA
/////////////////////////////////////////

export const BotConfigSchema = z.object({
	id: z.string(),
	key: z.string(),
	value: z.string(),
	botId: z.string(),
	createdAt: z.coerce.date(),
	updatedAt: z.coerce.date(),
});

export type BotConfig = z.infer<typeof BotConfigSchema>;

/////////////////////////////////////////
// COMMAND USAGE SCHEMA
/////////////////////////////////////////

export const CommandUsageSchema = z.object({
	id: z.string(),
	commandId: z.string(),
	userId: z.string(),
	guildId: z.string(),
	channelId: z.string(),
	timestamp: z.coerce.date(),
});

export type CommandUsage = z.infer<typeof CommandUsageSchema>;

/////////////////////////////////////////
// ANALYTICS SCHEMA
/////////////////////////////////////////

export const AnalyticsSchema = z.object({
	id: z.string(),
	botId: z.string(),
	eventType: z.string(),
	data: z.string(),
	timestamp: z.coerce.date(),
});

export type Analytics = z.infer<typeof AnalyticsSchema>;
