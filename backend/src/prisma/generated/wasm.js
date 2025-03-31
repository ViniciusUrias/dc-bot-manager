
Object.defineProperty(exports, "__esModule", { value: true });

const {
  PrismaClientKnownRequestError,
  PrismaClientUnknownRequestError,
  PrismaClientRustPanicError,
  PrismaClientInitializationError,
  PrismaClientValidationError,
  getPrismaClient,
  sqltag,
  empty,
  join,
  raw,
  skip,
  Decimal,
  Debug,
  objectEnumValues,
  makeStrictEnum,
  Extensions,
  warnOnce,
  defineDmmfProperty,
  Public,
  getRuntime,
  createParam,
} = require('./runtime/wasm.js')


const Prisma = {}

exports.Prisma = Prisma
exports.$Enums = {}

/**
 * Prisma Client JS version: 6.5.0
 * Query Engine version: 173f8d54f8d52e692c7e27e72a88314ec7aeff60
 */
Prisma.prismaVersion = {
  client: "6.5.0",
  engine: "173f8d54f8d52e692c7e27e72a88314ec7aeff60"
}

Prisma.PrismaClientKnownRequestError = PrismaClientKnownRequestError;
Prisma.PrismaClientUnknownRequestError = PrismaClientUnknownRequestError
Prisma.PrismaClientRustPanicError = PrismaClientRustPanicError
Prisma.PrismaClientInitializationError = PrismaClientInitializationError
Prisma.PrismaClientValidationError = PrismaClientValidationError
Prisma.Decimal = Decimal

/**
 * Re-export of sql-template-tag
 */
Prisma.sql = sqltag
Prisma.empty = empty
Prisma.join = join
Prisma.raw = raw
Prisma.validator = Public.validator

/**
* Extensions
*/
Prisma.getExtensionContext = Extensions.getExtensionContext
Prisma.defineExtension = Extensions.defineExtension

/**
 * Shorthand utilities for JSON filtering
 */
Prisma.DbNull = objectEnumValues.instances.DbNull
Prisma.JsonNull = objectEnumValues.instances.JsonNull
Prisma.AnyNull = objectEnumValues.instances.AnyNull

Prisma.NullTypes = {
  DbNull: objectEnumValues.classes.DbNull,
  JsonNull: objectEnumValues.classes.JsonNull,
  AnyNull: objectEnumValues.classes.AnyNull
}





/**
 * Enums
 */
exports.Prisma.TransactionIsolationLevel = makeStrictEnum({
  ReadUncommitted: 'ReadUncommitted',
  ReadCommitted: 'ReadCommitted',
  RepeatableRead: 'RepeatableRead',
  Serializable: 'Serializable'
});

exports.Prisma.UserScalarFieldEnum = {
  id: 'id',
  email: 'email',
  password: 'password',
  name: 'name',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.SessionScalarFieldEnum = {
  id: 'id',
  userId: 'userId',
  token: 'token',
  expiresAt: 'expiresAt',
  createdAt: 'createdAt'
};

exports.Prisma.ServerScalarFieldEnum = {
  id: 'id',
  name: 'name',
  ownerId: 'ownerId',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  serverid: 'serverid'
};

exports.Prisma.BotScalarFieldEnum = {
  id: 'id',
  name: 'name',
  token: 'token',
  active: 'active',
  ownerId: 'ownerId',
  prefix: 'prefix',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  serverId: 'serverId'
};

exports.Prisma.CommandScalarFieldEnum = {
  id: 'id',
  name: 'name',
  description: 'description',
  response: 'response',
  enabled: 'enabled',
  botId: 'botId',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.CommandPermissionScalarFieldEnum = {
  id: 'id',
  commandId: 'commandId',
  roleId: 'roleId',
  allow: 'allow',
  createdAt: 'createdAt'
};

exports.Prisma.EventScalarFieldEnum = {
  id: 'id',
  name: 'name',
  action: 'action',
  enabled: 'enabled',
  botId: 'botId',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.BotConfigScalarFieldEnum = {
  id: 'id',
  key: 'key',
  value: 'value',
  botId: 'botId',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.CommandUsageScalarFieldEnum = {
  id: 'id',
  commandId: 'commandId',
  userId: 'userId',
  guildId: 'guildId',
  channelId: 'channelId',
  timestamp: 'timestamp'
};

exports.Prisma.AnalyticsScalarFieldEnum = {
  id: 'id',
  botId: 'botId',
  eventType: 'eventType',
  data: 'data',
  timestamp: 'timestamp'
};

exports.Prisma.SortOrder = {
  asc: 'asc',
  desc: 'desc'
};

exports.Prisma.JsonNullValueInput = {
  JsonNull: Prisma.JsonNull
};

exports.Prisma.QueryMode = {
  default: 'default',
  insensitive: 'insensitive'
};

exports.Prisma.NullsOrder = {
  first: 'first',
  last: 'last'
};

exports.Prisma.JsonNullValueFilter = {
  DbNull: Prisma.DbNull,
  JsonNull: Prisma.JsonNull,
  AnyNull: Prisma.AnyNull
};


exports.Prisma.ModelName = {
  User: 'User',
  Session: 'Session',
  Server: 'Server',
  Bot: 'Bot',
  Command: 'Command',
  CommandPermission: 'CommandPermission',
  Event: 'Event',
  BotConfig: 'BotConfig',
  CommandUsage: 'CommandUsage',
  Analytics: 'Analytics'
};
/**
 * Create the Client
 */
const config = {
  "generator": {
    "name": "client",
    "provider": {
      "fromEnvVar": null,
      "value": "prisma-client-js"
    },
    "output": {
      "value": "C:\\Users\\vinic\\projects\\discord-bot\\backend\\src\\prisma\\generated",
      "fromEnvVar": null
    },
    "config": {
      "engineType": "library"
    },
    "binaryTargets": [
      {
        "fromEnvVar": null,
        "value": "windows",
        "native": true
      }
    ],
    "previewFeatures": [
      "driverAdapters",
      "typedSql"
    ],
    "sourceFilePath": "C:\\Users\\vinic\\projects\\discord-bot\\backend\\src\\prisma\\schema.prisma",
    "isCustomOutput": true
  },
  "relativeEnvPaths": {
    "rootEnvPath": null,
    "schemaEnvPath": "../../../.env"
  },
  "relativePath": "..",
  "clientVersion": "6.5.0",
  "engineVersion": "173f8d54f8d52e692c7e27e72a88314ec7aeff60",
  "datasourceNames": [
    "db"
  ],
  "activeProvider": "postgresql",
  "postinstall": false,
  "inlineDatasources": {
    "db": {
      "url": {
        "fromEnvVar": "DATABASE_URL",
        "value": null
      }
    }
  },
  "inlineSchema": "generator client {\n  provider        = \"prisma-client-js\"\n  output          = \"./generated\"\n  previewFeatures = [\"driverAdapters\", \"typedSql\"]\n}\n\ndatasource db {\n  provider = \"postgresql\"\n  url      = env(\"DATABASE_URL\")\n}\n\nmodel User {\n  id        String    @id @default(uuid())\n  email     String    @unique\n  password  String\n  name      String?\n  createdAt DateTime  @default(now())\n  updatedAt DateTime  @updatedAt\n  bots      Bot[]\n  servers   Server[]\n  sessions  Session[]\n\n  @@map(\"users\")\n}\n\nmodel Session {\n  id        String   @id @default(uuid())\n  userId    String\n  token     String   @unique\n  expiresAt DateTime\n  createdAt DateTime @default(now())\n  user      User     @relation(fields: [userId], references: [id])\n}\n\nmodel Server {\n  id        String   @id @default(uuid())\n  name      String   @unique\n  ownerId   String\n  createdAt DateTime @default(now())\n  updatedAt DateTime @updatedAt\n  serverid  String?  @unique(map: \"server_unique\")\n  bots      Bot[]\n  owner     User     @relation(fields: [ownerId], references: [id])\n}\n\nmodel Bot {\n  id             String      @id @default(uuid())\n  name           String\n  token          String\n  active         Boolean     @default(true)\n  ownerId        String\n  prefix         String      @default(\"!\")\n  createdAt      DateTime    @default(now())\n  updatedAt      DateTime    @updatedAt\n  serverId       String\n  analytics      Analytics[]\n  owner          User        @relation(fields: [ownerId], references: [id])\n  server         Server      @relation(fields: [serverId], references: [id])\n  configurations BotConfig[]\n  commands       Command[]\n  events         Event[]\n}\n\nmodel Command {\n  id          String              @id @default(uuid())\n  name        String\n  description String\n  response    String\n  enabled     Boolean             @default(true)\n  botId       String\n  createdAt   DateTime            @default(now())\n  updatedAt   DateTime            @updatedAt\n  bot         Bot                 @relation(fields: [botId], references: [id])\n  permissions CommandPermission[]\n  usage       CommandUsage[]\n}\n\nmodel CommandPermission {\n  id        String   @id @default(uuid())\n  commandId String\n  roleId    String\n  allow     Boolean  @default(true)\n  createdAt DateTime @default(now())\n  command   Command  @relation(fields: [commandId], references: [id])\n}\n\nmodel Event {\n  id        String   @id @default(uuid())\n  name      String\n  action    String\n  enabled   Boolean  @default(true)\n  botId     String\n  createdAt DateTime @default(now())\n  updatedAt DateTime @updatedAt\n  bot       Bot      @relation(fields: [botId], references: [id])\n}\n\nmodel BotConfig {\n  id        String   @id @default(uuid())\n  key       String\n  value     String\n  botId     String\n  createdAt DateTime @default(now())\n  updatedAt DateTime @updatedAt\n  bot       Bot      @relation(fields: [botId], references: [id])\n}\n\nmodel CommandUsage {\n  id        String   @id @default(uuid())\n  commandId String\n  userId    String\n  guildId   String\n  channelId String\n  timestamp DateTime @default(now())\n  command   Command  @relation(fields: [commandId], references: [id])\n}\n\nmodel Analytics {\n  id        String   @id @default(uuid())\n  botId     String\n  eventType String\n  data      Json\n  timestamp DateTime @default(now())\n  bot       Bot      @relation(fields: [botId], references: [id])\n}\n",
  "inlineSchemaHash": "43dd0b9173f4f322c2e1ae38c569d8f9241291da1ef4c77551089684e05ac7f3",
  "copyEngine": true
}
config.dirname = '/'

config.runtimeDataModel = JSON.parse("{\"models\":{\"User\":{\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"email\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"password\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"name\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"createdAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"},{\"name\":\"updatedAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"},{\"name\":\"bots\",\"kind\":\"object\",\"type\":\"Bot\",\"relationName\":\"BotToUser\"},{\"name\":\"servers\",\"kind\":\"object\",\"type\":\"Server\",\"relationName\":\"ServerToUser\"},{\"name\":\"sessions\",\"kind\":\"object\",\"type\":\"Session\",\"relationName\":\"SessionToUser\"}],\"dbName\":\"users\"},\"Session\":{\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"userId\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"token\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"expiresAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"},{\"name\":\"createdAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"},{\"name\":\"user\",\"kind\":\"object\",\"type\":\"User\",\"relationName\":\"SessionToUser\"}],\"dbName\":null},\"Server\":{\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"name\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"ownerId\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"createdAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"},{\"name\":\"updatedAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"},{\"name\":\"serverid\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"bots\",\"kind\":\"object\",\"type\":\"Bot\",\"relationName\":\"BotToServer\"},{\"name\":\"owner\",\"kind\":\"object\",\"type\":\"User\",\"relationName\":\"ServerToUser\"}],\"dbName\":null},\"Bot\":{\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"name\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"token\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"active\",\"kind\":\"scalar\",\"type\":\"Boolean\"},{\"name\":\"ownerId\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"prefix\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"createdAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"},{\"name\":\"updatedAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"},{\"name\":\"serverId\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"analytics\",\"kind\":\"object\",\"type\":\"Analytics\",\"relationName\":\"AnalyticsToBot\"},{\"name\":\"owner\",\"kind\":\"object\",\"type\":\"User\",\"relationName\":\"BotToUser\"},{\"name\":\"server\",\"kind\":\"object\",\"type\":\"Server\",\"relationName\":\"BotToServer\"},{\"name\":\"configurations\",\"kind\":\"object\",\"type\":\"BotConfig\",\"relationName\":\"BotToBotConfig\"},{\"name\":\"commands\",\"kind\":\"object\",\"type\":\"Command\",\"relationName\":\"BotToCommand\"},{\"name\":\"events\",\"kind\":\"object\",\"type\":\"Event\",\"relationName\":\"BotToEvent\"}],\"dbName\":null},\"Command\":{\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"name\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"description\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"response\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"enabled\",\"kind\":\"scalar\",\"type\":\"Boolean\"},{\"name\":\"botId\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"createdAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"},{\"name\":\"updatedAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"},{\"name\":\"bot\",\"kind\":\"object\",\"type\":\"Bot\",\"relationName\":\"BotToCommand\"},{\"name\":\"permissions\",\"kind\":\"object\",\"type\":\"CommandPermission\",\"relationName\":\"CommandToCommandPermission\"},{\"name\":\"usage\",\"kind\":\"object\",\"type\":\"CommandUsage\",\"relationName\":\"CommandToCommandUsage\"}],\"dbName\":null},\"CommandPermission\":{\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"commandId\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"roleId\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"allow\",\"kind\":\"scalar\",\"type\":\"Boolean\"},{\"name\":\"createdAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"},{\"name\":\"command\",\"kind\":\"object\",\"type\":\"Command\",\"relationName\":\"CommandToCommandPermission\"}],\"dbName\":null},\"Event\":{\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"name\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"action\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"enabled\",\"kind\":\"scalar\",\"type\":\"Boolean\"},{\"name\":\"botId\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"createdAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"},{\"name\":\"updatedAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"},{\"name\":\"bot\",\"kind\":\"object\",\"type\":\"Bot\",\"relationName\":\"BotToEvent\"}],\"dbName\":null},\"BotConfig\":{\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"key\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"value\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"botId\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"createdAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"},{\"name\":\"updatedAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"},{\"name\":\"bot\",\"kind\":\"object\",\"type\":\"Bot\",\"relationName\":\"BotToBotConfig\"}],\"dbName\":null},\"CommandUsage\":{\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"commandId\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"userId\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"guildId\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"channelId\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"timestamp\",\"kind\":\"scalar\",\"type\":\"DateTime\"},{\"name\":\"command\",\"kind\":\"object\",\"type\":\"Command\",\"relationName\":\"CommandToCommandUsage\"}],\"dbName\":null},\"Analytics\":{\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"botId\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"eventType\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"data\",\"kind\":\"scalar\",\"type\":\"Json\"},{\"name\":\"timestamp\",\"kind\":\"scalar\",\"type\":\"DateTime\"},{\"name\":\"bot\",\"kind\":\"object\",\"type\":\"Bot\",\"relationName\":\"AnalyticsToBot\"}],\"dbName\":null}},\"enums\":{},\"types\":{}}")
defineDmmfProperty(exports.Prisma, config.runtimeDataModel)
config.engineWasm = {
  getRuntime: () => require('./query_engine_bg.js'),
  getQueryEngineWasmModule: async () => {
    const loader = (await import('#wasm-engine-loader')).default
    const engine = (await loader).default
    return engine 
  }
}
config.compilerWasm = undefined

config.injectableEdgeEnv = () => ({
  parsed: {
    DATABASE_URL: typeof globalThis !== 'undefined' && globalThis['DATABASE_URL'] || typeof process !== 'undefined' && process.env && process.env.DATABASE_URL || undefined
  }
})

if (typeof globalThis !== 'undefined' && globalThis['DEBUG'] || typeof process !== 'undefined' && process.env && process.env.DEBUG || undefined) {
  Debug.enable(typeof globalThis !== 'undefined' && globalThis['DEBUG'] || typeof process !== 'undefined' && process.env && process.env.DEBUG || undefined)
}

const PrismaClient = getPrismaClient(config)
exports.PrismaClient = PrismaClient
Object.assign(exports, Prisma)

