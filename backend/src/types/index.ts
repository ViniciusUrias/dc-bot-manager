import { z } from 'zod';
import type { Prisma } from '@prisma/client';

/////////////////////////////////////////
// HELPER FUNCTIONS
/////////////////////////////////////////


/////////////////////////////////////////
// ENUMS
/////////////////////////////////////////

export const TransactionIsolationLevelSchema = z.enum(['ReadUncommitted','ReadCommitted','RepeatableRead','Serializable']);

export const UserScalarFieldEnumSchema = z.enum(['id','name','email','emailVerified','image','createdAt','updatedAt']);

export const SessionScalarFieldEnumSchema = z.enum(['id','expiresAt','token','createdAt','updatedAt','ipAddress','userAgent','userId']);

export const AccountScalarFieldEnumSchema = z.enum(['id','accountId','providerId','userId','accessToken','refreshToken','idToken','accessTokenExpiresAt','refreshTokenExpiresAt','scope','password','createdAt','updatedAt']);

export const VerificationScalarFieldEnumSchema = z.enum(['id','identifier','value','expiresAt','createdAt','updatedAt']);

export const ServerScalarFieldEnumSchema = z.enum(['id','name','description','ownerId','createdAt','updatedAt','serverid']);

export const BotScalarFieldEnumSchema = z.enum(['id','name','token','active','ownerId','prefix','createdAt','updatedAt','description','tags','icon','serverId']);

export const CommandScalarFieldEnumSchema = z.enum(['id','name','description','response','enabled','botId','createdAt','updatedAt']);

export const CommandPermissionScalarFieldEnumSchema = z.enum(['id','commandId','roleId','allow','createdAt']);

export const EventScalarFieldEnumSchema = z.enum(['id','name','action','enabled','botId','createdAt','updatedAt']);

export const BotConfigScalarFieldEnumSchema = z.enum(['id','key','value','botId','createdAt','updatedAt']);

export const CommandUsageScalarFieldEnumSchema = z.enum(['id','commandId','userId','guildId','channelId','timestamp']);

export const AnalyticsScalarFieldEnumSchema = z.enum(['id','botId','eventType','data','timestamp']);

export const SortOrderSchema = z.enum(['asc','desc']);

export const QueryModeSchema = z.enum(['default','insensitive']);

export const NullsOrderSchema = z.enum(['first','last']);
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
})

export type User = z.infer<typeof UserSchema>

/////////////////////////////////////////
// USER PARTIAL SCHEMA
/////////////////////////////////////////

export const UserPartialSchema = UserSchema.partial()

export type UserPartial = z.infer<typeof UserPartialSchema>

// USER RELATION SCHEMA
//------------------------------------------------------

export type UserRelations = {
  sessions: SessionWithRelations[];
  accounts: AccountWithRelations[];
  Bot: BotWithRelations[];
  Server: ServerWithRelations[];
};

export type UserWithRelations = z.infer<typeof UserSchema> & UserRelations

export const UserWithRelationsSchema: z.ZodType<UserWithRelations> = UserSchema.merge(z.object({
  sessions: z.lazy(() => SessionWithRelationsSchema).array(),
  accounts: z.lazy(() => AccountWithRelationsSchema).array(),
  Bot: z.lazy(() => BotWithRelationsSchema).array(),
  Server: z.lazy(() => ServerWithRelationsSchema).array(),
}))

// USER PARTIAL RELATION SCHEMA
//------------------------------------------------------

export type UserPartialRelations = {
  sessions?: SessionPartialWithRelations[];
  accounts?: AccountPartialWithRelations[];
  Bot?: BotPartialWithRelations[];
  Server?: ServerPartialWithRelations[];
};

export type UserPartialWithRelations = z.infer<typeof UserPartialSchema> & UserPartialRelations

export const UserPartialWithRelationsSchema: z.ZodType<UserPartialWithRelations> = UserPartialSchema.merge(z.object({
  sessions: z.lazy(() => SessionPartialWithRelationsSchema).array(),
  accounts: z.lazy(() => AccountPartialWithRelationsSchema).array(),
  Bot: z.lazy(() => BotPartialWithRelationsSchema).array(),
  Server: z.lazy(() => ServerPartialWithRelationsSchema).array(),
})).partial()

export type UserWithPartialRelations = z.infer<typeof UserSchema> & UserPartialRelations

export const UserWithPartialRelationsSchema: z.ZodType<UserWithPartialRelations> = UserSchema.merge(z.object({
  sessions: z.lazy(() => SessionPartialWithRelationsSchema).array(),
  accounts: z.lazy(() => AccountPartialWithRelationsSchema).array(),
  Bot: z.lazy(() => BotPartialWithRelationsSchema).array(),
  Server: z.lazy(() => ServerPartialWithRelationsSchema).array(),
}).partial())

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
})

export type Session = z.infer<typeof SessionSchema>

/////////////////////////////////////////
// SESSION PARTIAL SCHEMA
/////////////////////////////////////////

export const SessionPartialSchema = SessionSchema.partial()

export type SessionPartial = z.infer<typeof SessionPartialSchema>

// SESSION RELATION SCHEMA
//------------------------------------------------------

export type SessionRelations = {
  user: UserWithRelations;
};

export type SessionWithRelations = z.infer<typeof SessionSchema> & SessionRelations

export const SessionWithRelationsSchema: z.ZodType<SessionWithRelations> = SessionSchema.merge(z.object({
  user: z.lazy(() => UserWithRelationsSchema),
}))

// SESSION PARTIAL RELATION SCHEMA
//------------------------------------------------------

export type SessionPartialRelations = {
  user?: UserPartialWithRelations;
};

export type SessionPartialWithRelations = z.infer<typeof SessionPartialSchema> & SessionPartialRelations

export const SessionPartialWithRelationsSchema: z.ZodType<SessionPartialWithRelations> = SessionPartialSchema.merge(z.object({
  user: z.lazy(() => UserPartialWithRelationsSchema),
})).partial()

export type SessionWithPartialRelations = z.infer<typeof SessionSchema> & SessionPartialRelations

export const SessionWithPartialRelationsSchema: z.ZodType<SessionWithPartialRelations> = SessionSchema.merge(z.object({
  user: z.lazy(() => UserPartialWithRelationsSchema),
}).partial())

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
})

export type Account = z.infer<typeof AccountSchema>

/////////////////////////////////////////
// ACCOUNT PARTIAL SCHEMA
/////////////////////////////////////////

export const AccountPartialSchema = AccountSchema.partial()

export type AccountPartial = z.infer<typeof AccountPartialSchema>

// ACCOUNT RELATION SCHEMA
//------------------------------------------------------

export type AccountRelations = {
  user: UserWithRelations;
};

export type AccountWithRelations = z.infer<typeof AccountSchema> & AccountRelations

export const AccountWithRelationsSchema: z.ZodType<AccountWithRelations> = AccountSchema.merge(z.object({
  user: z.lazy(() => UserWithRelationsSchema),
}))

// ACCOUNT PARTIAL RELATION SCHEMA
//------------------------------------------------------

export type AccountPartialRelations = {
  user?: UserPartialWithRelations;
};

export type AccountPartialWithRelations = z.infer<typeof AccountPartialSchema> & AccountPartialRelations

export const AccountPartialWithRelationsSchema: z.ZodType<AccountPartialWithRelations> = AccountPartialSchema.merge(z.object({
  user: z.lazy(() => UserPartialWithRelationsSchema),
})).partial()

export type AccountWithPartialRelations = z.infer<typeof AccountSchema> & AccountPartialRelations

export const AccountWithPartialRelationsSchema: z.ZodType<AccountWithPartialRelations> = AccountSchema.merge(z.object({
  user: z.lazy(() => UserPartialWithRelationsSchema),
}).partial())

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
})

export type Verification = z.infer<typeof VerificationSchema>

/////////////////////////////////////////
// VERIFICATION PARTIAL SCHEMA
/////////////////////////////////////////

export const VerificationPartialSchema = VerificationSchema.partial()

export type VerificationPartial = z.infer<typeof VerificationPartialSchema>

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
})

export type Server = z.infer<typeof ServerSchema>

/////////////////////////////////////////
// SERVER PARTIAL SCHEMA
/////////////////////////////////////////

export const ServerPartialSchema = ServerSchema.partial()

export type ServerPartial = z.infer<typeof ServerPartialSchema>

// SERVER RELATION SCHEMA
//------------------------------------------------------

export type ServerRelations = {
  bots: BotWithRelations[];
  owner: UserWithRelations;
};

export type ServerWithRelations = z.infer<typeof ServerSchema> & ServerRelations

export const ServerWithRelationsSchema: z.ZodType<ServerWithRelations> = ServerSchema.merge(z.object({
  bots: z.lazy(() => BotWithRelationsSchema).array(),
  owner: z.lazy(() => UserWithRelationsSchema),
}))

// SERVER PARTIAL RELATION SCHEMA
//------------------------------------------------------

export type ServerPartialRelations = {
  bots?: BotPartialWithRelations[];
  owner?: UserPartialWithRelations;
};

export type ServerPartialWithRelations = z.infer<typeof ServerPartialSchema> & ServerPartialRelations

export const ServerPartialWithRelationsSchema: z.ZodType<ServerPartialWithRelations> = ServerPartialSchema.merge(z.object({
  bots: z.lazy(() => BotPartialWithRelationsSchema).array(),
  owner: z.lazy(() => UserPartialWithRelationsSchema),
})).partial()

export type ServerWithPartialRelations = z.infer<typeof ServerSchema> & ServerPartialRelations

export const ServerWithPartialRelationsSchema: z.ZodType<ServerWithPartialRelations> = ServerSchema.merge(z.object({
  bots: z.lazy(() => BotPartialWithRelationsSchema).array(),
  owner: z.lazy(() => UserPartialWithRelationsSchema),
}).partial())

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
})

export type Bot = z.infer<typeof BotSchema>

/////////////////////////////////////////
// BOT PARTIAL SCHEMA
/////////////////////////////////////////

export const BotPartialSchema = BotSchema.partial()

export type BotPartial = z.infer<typeof BotPartialSchema>

// BOT RELATION SCHEMA
//------------------------------------------------------

export type BotRelations = {
  analytics: AnalyticsWithRelations[];
  owner: UserWithRelations;
  server: ServerWithRelations;
  configurations: BotConfigWithRelations[];
  commands: CommandWithRelations[];
  events: EventWithRelations[];
};

export type BotWithRelations = z.infer<typeof BotSchema> & BotRelations

export const BotWithRelationsSchema: z.ZodType<BotWithRelations> = BotSchema.merge(z.object({
  analytics: z.lazy(() => AnalyticsWithRelationsSchema).array(),
  owner: z.lazy(() => UserWithRelationsSchema),
  server: z.lazy(() => ServerWithRelationsSchema),
  configurations: z.lazy(() => BotConfigWithRelationsSchema).array(),
  commands: z.lazy(() => CommandWithRelationsSchema).array(),
  events: z.lazy(() => EventWithRelationsSchema).array(),
}))

// BOT PARTIAL RELATION SCHEMA
//------------------------------------------------------

export type BotPartialRelations = {
  analytics?: AnalyticsPartialWithRelations[];
  owner?: UserPartialWithRelations;
  server?: ServerPartialWithRelations;
  configurations?: BotConfigPartialWithRelations[];
  commands?: CommandPartialWithRelations[];
  events?: EventPartialWithRelations[];
};

export type BotPartialWithRelations = z.infer<typeof BotPartialSchema> & BotPartialRelations

export const BotPartialWithRelationsSchema: z.ZodType<BotPartialWithRelations> = BotPartialSchema.merge(z.object({
  analytics: z.lazy(() => AnalyticsPartialWithRelationsSchema).array(),
  owner: z.lazy(() => UserPartialWithRelationsSchema),
  server: z.lazy(() => ServerPartialWithRelationsSchema),
  configurations: z.lazy(() => BotConfigPartialWithRelationsSchema).array(),
  commands: z.lazy(() => CommandPartialWithRelationsSchema).array(),
  events: z.lazy(() => EventPartialWithRelationsSchema).array(),
})).partial()

export type BotWithPartialRelations = z.infer<typeof BotSchema> & BotPartialRelations

export const BotWithPartialRelationsSchema: z.ZodType<BotWithPartialRelations> = BotSchema.merge(z.object({
  analytics: z.lazy(() => AnalyticsPartialWithRelationsSchema).array(),
  owner: z.lazy(() => UserPartialWithRelationsSchema),
  server: z.lazy(() => ServerPartialWithRelationsSchema),
  configurations: z.lazy(() => BotConfigPartialWithRelationsSchema).array(),
  commands: z.lazy(() => CommandPartialWithRelationsSchema).array(),
  events: z.lazy(() => EventPartialWithRelationsSchema).array(),
}).partial())

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
})

export type Command = z.infer<typeof CommandSchema>

/////////////////////////////////////////
// COMMAND PARTIAL SCHEMA
/////////////////////////////////////////

export const CommandPartialSchema = CommandSchema.partial()

export type CommandPartial = z.infer<typeof CommandPartialSchema>

// COMMAND RELATION SCHEMA
//------------------------------------------------------

export type CommandRelations = {
  bot: BotWithRelations;
  permissions: CommandPermissionWithRelations[];
  usage: CommandUsageWithRelations[];
};

export type CommandWithRelations = z.infer<typeof CommandSchema> & CommandRelations

export const CommandWithRelationsSchema: z.ZodType<CommandWithRelations> = CommandSchema.merge(z.object({
  bot: z.lazy(() => BotWithRelationsSchema),
  permissions: z.lazy(() => CommandPermissionWithRelationsSchema).array(),
  usage: z.lazy(() => CommandUsageWithRelationsSchema).array(),
}))

// COMMAND PARTIAL RELATION SCHEMA
//------------------------------------------------------

export type CommandPartialRelations = {
  bot?: BotPartialWithRelations;
  permissions?: CommandPermissionPartialWithRelations[];
  usage?: CommandUsagePartialWithRelations[];
};

export type CommandPartialWithRelations = z.infer<typeof CommandPartialSchema> & CommandPartialRelations

export const CommandPartialWithRelationsSchema: z.ZodType<CommandPartialWithRelations> = CommandPartialSchema.merge(z.object({
  bot: z.lazy(() => BotPartialWithRelationsSchema),
  permissions: z.lazy(() => CommandPermissionPartialWithRelationsSchema).array(),
  usage: z.lazy(() => CommandUsagePartialWithRelationsSchema).array(),
})).partial()

export type CommandWithPartialRelations = z.infer<typeof CommandSchema> & CommandPartialRelations

export const CommandWithPartialRelationsSchema: z.ZodType<CommandWithPartialRelations> = CommandSchema.merge(z.object({
  bot: z.lazy(() => BotPartialWithRelationsSchema),
  permissions: z.lazy(() => CommandPermissionPartialWithRelationsSchema).array(),
  usage: z.lazy(() => CommandUsagePartialWithRelationsSchema).array(),
}).partial())

/////////////////////////////////////////
// COMMAND PERMISSION SCHEMA
/////////////////////////////////////////

export const CommandPermissionSchema = z.object({
  id: z.string(),
  commandId: z.string(),
  roleId: z.string(),
  allow: z.boolean(),
  createdAt: z.coerce.date(),
})

export type CommandPermission = z.infer<typeof CommandPermissionSchema>

/////////////////////////////////////////
// COMMAND PERMISSION PARTIAL SCHEMA
/////////////////////////////////////////

export const CommandPermissionPartialSchema = CommandPermissionSchema.partial()

export type CommandPermissionPartial = z.infer<typeof CommandPermissionPartialSchema>

// COMMAND PERMISSION RELATION SCHEMA
//------------------------------------------------------

export type CommandPermissionRelations = {
  command: CommandWithRelations;
};

export type CommandPermissionWithRelations = z.infer<typeof CommandPermissionSchema> & CommandPermissionRelations

export const CommandPermissionWithRelationsSchema: z.ZodType<CommandPermissionWithRelations> = CommandPermissionSchema.merge(z.object({
  command: z.lazy(() => CommandWithRelationsSchema),
}))

// COMMAND PERMISSION PARTIAL RELATION SCHEMA
//------------------------------------------------------

export type CommandPermissionPartialRelations = {
  command?: CommandPartialWithRelations;
};

export type CommandPermissionPartialWithRelations = z.infer<typeof CommandPermissionPartialSchema> & CommandPermissionPartialRelations

export const CommandPermissionPartialWithRelationsSchema: z.ZodType<CommandPermissionPartialWithRelations> = CommandPermissionPartialSchema.merge(z.object({
  command: z.lazy(() => CommandPartialWithRelationsSchema),
})).partial()

export type CommandPermissionWithPartialRelations = z.infer<typeof CommandPermissionSchema> & CommandPermissionPartialRelations

export const CommandPermissionWithPartialRelationsSchema: z.ZodType<CommandPermissionWithPartialRelations> = CommandPermissionSchema.merge(z.object({
  command: z.lazy(() => CommandPartialWithRelationsSchema),
}).partial())

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
})

export type Event = z.infer<typeof EventSchema>

/////////////////////////////////////////
// EVENT PARTIAL SCHEMA
/////////////////////////////////////////

export const EventPartialSchema = EventSchema.partial()

export type EventPartial = z.infer<typeof EventPartialSchema>

// EVENT RELATION SCHEMA
//------------------------------------------------------

export type EventRelations = {
  bot: BotWithRelations;
};

export type EventWithRelations = z.infer<typeof EventSchema> & EventRelations

export const EventWithRelationsSchema: z.ZodType<EventWithRelations> = EventSchema.merge(z.object({
  bot: z.lazy(() => BotWithRelationsSchema),
}))

// EVENT PARTIAL RELATION SCHEMA
//------------------------------------------------------

export type EventPartialRelations = {
  bot?: BotPartialWithRelations;
};

export type EventPartialWithRelations = z.infer<typeof EventPartialSchema> & EventPartialRelations

export const EventPartialWithRelationsSchema: z.ZodType<EventPartialWithRelations> = EventPartialSchema.merge(z.object({
  bot: z.lazy(() => BotPartialWithRelationsSchema),
})).partial()

export type EventWithPartialRelations = z.infer<typeof EventSchema> & EventPartialRelations

export const EventWithPartialRelationsSchema: z.ZodType<EventWithPartialRelations> = EventSchema.merge(z.object({
  bot: z.lazy(() => BotPartialWithRelationsSchema),
}).partial())

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
})

export type BotConfig = z.infer<typeof BotConfigSchema>

/////////////////////////////////////////
// BOT CONFIG PARTIAL SCHEMA
/////////////////////////////////////////

export const BotConfigPartialSchema = BotConfigSchema.partial()

export type BotConfigPartial = z.infer<typeof BotConfigPartialSchema>

// BOT CONFIG RELATION SCHEMA
//------------------------------------------------------

export type BotConfigRelations = {
  bot: BotWithRelations;
};

export type BotConfigWithRelations = z.infer<typeof BotConfigSchema> & BotConfigRelations

export const BotConfigWithRelationsSchema: z.ZodType<BotConfigWithRelations> = BotConfigSchema.merge(z.object({
  bot: z.lazy(() => BotWithRelationsSchema),
}))

// BOT CONFIG PARTIAL RELATION SCHEMA
//------------------------------------------------------

export type BotConfigPartialRelations = {
  bot?: BotPartialWithRelations;
};

export type BotConfigPartialWithRelations = z.infer<typeof BotConfigPartialSchema> & BotConfigPartialRelations

export const BotConfigPartialWithRelationsSchema: z.ZodType<BotConfigPartialWithRelations> = BotConfigPartialSchema.merge(z.object({
  bot: z.lazy(() => BotPartialWithRelationsSchema),
})).partial()

export type BotConfigWithPartialRelations = z.infer<typeof BotConfigSchema> & BotConfigPartialRelations

export const BotConfigWithPartialRelationsSchema: z.ZodType<BotConfigWithPartialRelations> = BotConfigSchema.merge(z.object({
  bot: z.lazy(() => BotPartialWithRelationsSchema),
}).partial())

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
})

export type CommandUsage = z.infer<typeof CommandUsageSchema>

/////////////////////////////////////////
// COMMAND USAGE PARTIAL SCHEMA
/////////////////////////////////////////

export const CommandUsagePartialSchema = CommandUsageSchema.partial()

export type CommandUsagePartial = z.infer<typeof CommandUsagePartialSchema>

// COMMAND USAGE RELATION SCHEMA
//------------------------------------------------------

export type CommandUsageRelations = {
  command: CommandWithRelations;
};

export type CommandUsageWithRelations = z.infer<typeof CommandUsageSchema> & CommandUsageRelations

export const CommandUsageWithRelationsSchema: z.ZodType<CommandUsageWithRelations> = CommandUsageSchema.merge(z.object({
  command: z.lazy(() => CommandWithRelationsSchema),
}))

// COMMAND USAGE PARTIAL RELATION SCHEMA
//------------------------------------------------------

export type CommandUsagePartialRelations = {
  command?: CommandPartialWithRelations;
};

export type CommandUsagePartialWithRelations = z.infer<typeof CommandUsagePartialSchema> & CommandUsagePartialRelations

export const CommandUsagePartialWithRelationsSchema: z.ZodType<CommandUsagePartialWithRelations> = CommandUsagePartialSchema.merge(z.object({
  command: z.lazy(() => CommandPartialWithRelationsSchema),
})).partial()

export type CommandUsageWithPartialRelations = z.infer<typeof CommandUsageSchema> & CommandUsagePartialRelations

export const CommandUsageWithPartialRelationsSchema: z.ZodType<CommandUsageWithPartialRelations> = CommandUsageSchema.merge(z.object({
  command: z.lazy(() => CommandPartialWithRelationsSchema),
}).partial())

/////////////////////////////////////////
// ANALYTICS SCHEMA
/////////////////////////////////////////

export const AnalyticsSchema = z.object({
  id: z.string(),
  botId: z.string(),
  eventType: z.string(),
  data: z.string(),
  timestamp: z.coerce.date(),
})

export type Analytics = z.infer<typeof AnalyticsSchema>

/////////////////////////////////////////
// ANALYTICS PARTIAL SCHEMA
/////////////////////////////////////////

export const AnalyticsPartialSchema = AnalyticsSchema.partial()

export type AnalyticsPartial = z.infer<typeof AnalyticsPartialSchema>

// ANALYTICS RELATION SCHEMA
//------------------------------------------------------

export type AnalyticsRelations = {
  bot: BotWithRelations;
};

export type AnalyticsWithRelations = z.infer<typeof AnalyticsSchema> & AnalyticsRelations

export const AnalyticsWithRelationsSchema: z.ZodType<AnalyticsWithRelations> = AnalyticsSchema.merge(z.object({
  bot: z.lazy(() => BotWithRelationsSchema),
}))

// ANALYTICS PARTIAL RELATION SCHEMA
//------------------------------------------------------

export type AnalyticsPartialRelations = {
  bot?: BotPartialWithRelations;
};

export type AnalyticsPartialWithRelations = z.infer<typeof AnalyticsPartialSchema> & AnalyticsPartialRelations

export const AnalyticsPartialWithRelationsSchema: z.ZodType<AnalyticsPartialWithRelations> = AnalyticsPartialSchema.merge(z.object({
  bot: z.lazy(() => BotPartialWithRelationsSchema),
})).partial()

export type AnalyticsWithPartialRelations = z.infer<typeof AnalyticsSchema> & AnalyticsPartialRelations

export const AnalyticsWithPartialRelationsSchema: z.ZodType<AnalyticsWithPartialRelations> = AnalyticsSchema.merge(z.object({
  bot: z.lazy(() => BotPartialWithRelationsSchema),
}).partial())
