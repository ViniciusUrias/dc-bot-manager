/**
 * Generated by Kubb (https://kubb.dev/).
 * Do not edit manually.
 */

import { z } from 'zod'

export const putV1BotsBotidSyncPathParamsSchema = z.object({
  botId: z.string(),
})

/**
 * @description Default Response
 */
export const putV1BotsBotidSync200Schema = z.any()

export const putV1BotsBotidSyncMutationResponseSchema = z.lazy(() => putV1BotsBotidSync200Schema)