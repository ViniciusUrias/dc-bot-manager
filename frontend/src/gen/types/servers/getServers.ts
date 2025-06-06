/**
 * Generated by Kubb (https://kubb.dev/).
 * Do not edit manually.
 */

/**
 * @description Default Response
 */
export type getV1Servers200 = {
  /**
   * @type string
   */
  id: string
  /**
   * @type string
   */
  name: string
  /**
   * @type string
   */
  description: string | null
  /**
   * @type string
   */
  ownerId: string
  /**
   * @type string, date-time
   */
  createdAt: string
  /**
   * @type string, date-time
   */
  updatedAt: string
  /**
   * @type string
   */
  serverid: string | null
  /**
   * @type array | undefined
   */
  bots?: {
    /**
     * @type string | undefined
     */
    id?: string
    /**
     * @type string | undefined
     */
    name?: string
    /**
     * @type string | undefined
     */
    token?: string
    /**
     * @type boolean | undefined
     */
    active?: boolean
    /**
     * @type string | undefined
     */
    ownerId?: string
    /**
     * @type string | undefined
     */
    prefix?: string
    /**
     * @type string | undefined, date-time
     */
    createdAt?: string
    /**
     * @type string | undefined, date-time
     */
    updatedAt?: string
    /**
     * @type string | undefined
     */
    description?: string
    /**
     * @type array | undefined
     */
    tags?: string[]
    /**
     * @type string
     */
    icon?: string | null
    /**
     * @type string | undefined
     */
    serverId?: string
    /**
     * @type array | undefined
     */
    analytics?: {
      /**
       * @type string | undefined
       */
      id?: string
      /**
       * @type string | undefined
       */
      botId?: string
      /**
       * @type string | undefined
       */
      eventType?: string
      /**
       * @type string | undefined
       */
      data?: string
      /**
       * @type string | undefined, date-time
       */
      timestamp?: string
      bot?: any
    }[]
    /**
     * @type object | undefined
     */
    owner?: {
      /**
       * @type string | undefined
       */
      id?: string
      /**
       * @type string | undefined
       */
      name?: string
      /**
       * @type string | undefined
       */
      email?: string
      /**
       * @type boolean | undefined
       */
      emailVerified?: boolean
      /**
       * @type string
       */
      image?: string | null
      /**
       * @type string | undefined, date-time
       */
      createdAt?: string
      /**
       * @type string | undefined, date-time
       */
      updatedAt?: string
      /**
       * @type array | undefined
       */
      sessions?: {
        /**
         * @type string | undefined
         */
        id?: string
        /**
         * @type string | undefined, date-time
         */
        expiresAt?: string
        /**
         * @type string | undefined
         */
        token?: string
        /**
         * @type string | undefined, date-time
         */
        createdAt?: string
        /**
         * @type string | undefined, date-time
         */
        updatedAt?: string
        /**
         * @type string
         */
        ipAddress?: string | null
        /**
         * @type string
         */
        userAgent?: string | null
        /**
         * @type string | undefined
         */
        userId?: string
        user?: any
      }[]
      /**
       * @type array | undefined
       */
      accounts?: {
        /**
         * @type string | undefined
         */
        id?: string
        /**
         * @type string | undefined
         */
        accountId?: string
        /**
         * @type string | undefined
         */
        providerId?: string
        /**
         * @type string | undefined
         */
        userId?: string
        /**
         * @type string
         */
        accessToken?: string | null
        /**
         * @type string
         */
        refreshToken?: string | null
        /**
         * @type string
         */
        idToken?: string | null
        /**
         * @type string, date-time
         */
        accessTokenExpiresAt?: string | null
        /**
         * @type string, date-time
         */
        refreshTokenExpiresAt?: string | null
        /**
         * @type string
         */
        scope?: string | null
        /**
         * @type string
         */
        password?: string | null
        /**
         * @type string | undefined, date-time
         */
        createdAt?: string
        /**
         * @type string | undefined, date-time
         */
        updatedAt?: string
        user?: any
      }[]
      /**
       * @type array | undefined
       */
      Bot?: any[]
      /**
       * @type array | undefined
       */
      Server?: {
        /**
         * @type string | undefined
         */
        id?: string
        /**
         * @type string | undefined
         */
        name?: string
        /**
         * @type string
         */
        description?: string | null
        /**
         * @type string | undefined
         */
        ownerId?: string
        /**
         * @type string | undefined, date-time
         */
        createdAt?: string
        /**
         * @type string | undefined, date-time
         */
        updatedAt?: string
        /**
         * @type string
         */
        serverid?: string | null
        /**
         * @type array | undefined
         */
        bots?: any[]
        owner?: any
      }[]
    }
    /**
     * @type object | undefined
     */
    server?: {
      /**
       * @type string | undefined
       */
      id?: string
      /**
       * @type string | undefined
       */
      name?: string
      /**
       * @type string
       */
      description?: string | null
      /**
       * @type string | undefined
       */
      ownerId?: string
      /**
       * @type string | undefined, date-time
       */
      createdAt?: string
      /**
       * @type string | undefined, date-time
       */
      updatedAt?: string
      /**
       * @type string
       */
      serverid?: string | null
      /**
       * @type array | undefined
       */
      bots?: any[]
      /**
       * @type object | undefined
       */
      owner?: {
        /**
         * @type string | undefined
         */
        id?: string
        /**
         * @type string | undefined
         */
        name?: string
        /**
         * @type string | undefined
         */
        email?: string
        /**
         * @type boolean | undefined
         */
        emailVerified?: boolean
        /**
         * @type string
         */
        image?: string | null
        /**
         * @type string | undefined, date-time
         */
        createdAt?: string
        /**
         * @type string | undefined, date-time
         */
        updatedAt?: string
        /**
         * @type array | undefined
         */
        sessions?: {
          /**
           * @type string | undefined
           */
          id?: string
          /**
           * @type string | undefined, date-time
           */
          expiresAt?: string
          /**
           * @type string | undefined
           */
          token?: string
          /**
           * @type string | undefined, date-time
           */
          createdAt?: string
          /**
           * @type string | undefined, date-time
           */
          updatedAt?: string
          /**
           * @type string
           */
          ipAddress?: string | null
          /**
           * @type string
           */
          userAgent?: string | null
          /**
           * @type string | undefined
           */
          userId?: string
          user?: any
        }[]
        /**
         * @type array | undefined
         */
        accounts?: {
          /**
           * @type string | undefined
           */
          id?: string
          /**
           * @type string | undefined
           */
          accountId?: string
          /**
           * @type string | undefined
           */
          providerId?: string
          /**
           * @type string | undefined
           */
          userId?: string
          /**
           * @type string
           */
          accessToken?: string | null
          /**
           * @type string
           */
          refreshToken?: string | null
          /**
           * @type string
           */
          idToken?: string | null
          /**
           * @type string, date-time
           */
          accessTokenExpiresAt?: string | null
          /**
           * @type string, date-time
           */
          refreshTokenExpiresAt?: string | null
          /**
           * @type string
           */
          scope?: string | null
          /**
           * @type string
           */
          password?: string | null
          /**
           * @type string | undefined, date-time
           */
          createdAt?: string
          /**
           * @type string | undefined, date-time
           */
          updatedAt?: string
          user?: any
        }[]
        /**
         * @type array | undefined
         */
        Bot?: any[]
        /**
         * @type array | undefined
         */
        Server?: any[]
      }
    }
    /**
     * @type array | undefined
     */
    configurations?: {
      /**
       * @type string | undefined
       */
      id?: string
      /**
       * @type string | undefined
       */
      key?: string
      /**
       * @type string | undefined
       */
      value?: string
      /**
       * @type string | undefined
       */
      botId?: string
      /**
       * @type string | undefined, date-time
       */
      createdAt?: string
      /**
       * @type string | undefined, date-time
       */
      updatedAt?: string
      bot?: any
    }[]
    /**
     * @type array | undefined
     */
    commands?: {
      /**
       * @type string | undefined
       */
      id?: string
      /**
       * @type string | undefined
       */
      name?: string
      /**
       * @type string | undefined
       */
      description?: string
      /**
       * @type string | undefined
       */
      response?: string
      /**
       * @type boolean | undefined
       */
      enabled?: boolean
      /**
       * @type string | undefined
       */
      botId?: string
      /**
       * @type string | undefined, date-time
       */
      createdAt?: string
      /**
       * @type string | undefined, date-time
       */
      updatedAt?: string
      bot?: any
      /**
       * @type array | undefined
       */
      permissions?: {
        /**
         * @type string | undefined
         */
        id?: string
        /**
         * @type string | undefined
         */
        commandId?: string
        /**
         * @type string | undefined
         */
        roleId?: string
        /**
         * @type boolean | undefined
         */
        allow?: boolean
        /**
         * @type string | undefined, date-time
         */
        createdAt?: string
        command?: any
      }[]
      /**
       * @type array | undefined
       */
      usage?: {
        /**
         * @type string | undefined
         */
        id?: string
        /**
         * @type string | undefined
         */
        commandId?: string
        /**
         * @type string | undefined
         */
        userId?: string
        /**
         * @type string | undefined
         */
        guildId?: string
        /**
         * @type string | undefined
         */
        channelId?: string
        /**
         * @type string | undefined, date-time
         */
        timestamp?: string
        command?: any
      }[]
    }[]
    /**
     * @type array | undefined
     */
    events?: {
      /**
       * @type string | undefined
       */
      id?: string
      /**
       * @type string | undefined
       */
      name?: string
      /**
       * @type string | undefined
       */
      action?: string
      /**
       * @type boolean | undefined
       */
      enabled?: boolean
      /**
       * @type string | undefined
       */
      botId?: string
      /**
       * @type string | undefined, date-time
       */
      createdAt?: string
      /**
       * @type string | undefined, date-time
       */
      updatedAt?: string
      bot?: any
    }[]
  }[]
  /**
   * @type object | undefined
   */
  owner?: {
    /**
     * @type string | undefined
     */
    id?: string
    /**
     * @type string | undefined
     */
    name?: string
    /**
     * @type string | undefined
     */
    email?: string
    /**
     * @type boolean | undefined
     */
    emailVerified?: boolean
    /**
     * @type string
     */
    image?: string | null
    /**
     * @type string | undefined, date-time
     */
    createdAt?: string
    /**
     * @type string | undefined, date-time
     */
    updatedAt?: string
    /**
     * @type array | undefined
     */
    sessions?: {
      /**
       * @type string | undefined
       */
      id?: string
      /**
       * @type string | undefined, date-time
       */
      expiresAt?: string
      /**
       * @type string | undefined
       */
      token?: string
      /**
       * @type string | undefined, date-time
       */
      createdAt?: string
      /**
       * @type string | undefined, date-time
       */
      updatedAt?: string
      /**
       * @type string
       */
      ipAddress?: string | null
      /**
       * @type string
       */
      userAgent?: string | null
      /**
       * @type string | undefined
       */
      userId?: string
      user?: any
    }[]
    /**
     * @type array | undefined
     */
    accounts?: {
      /**
       * @type string | undefined
       */
      id?: string
      /**
       * @type string | undefined
       */
      accountId?: string
      /**
       * @type string | undefined
       */
      providerId?: string
      /**
       * @type string | undefined
       */
      userId?: string
      /**
       * @type string
       */
      accessToken?: string | null
      /**
       * @type string
       */
      refreshToken?: string | null
      /**
       * @type string
       */
      idToken?: string | null
      /**
       * @type string, date-time
       */
      accessTokenExpiresAt?: string | null
      /**
       * @type string, date-time
       */
      refreshTokenExpiresAt?: string | null
      /**
       * @type string
       */
      scope?: string | null
      /**
       * @type string
       */
      password?: string | null
      /**
       * @type string | undefined, date-time
       */
      createdAt?: string
      /**
       * @type string | undefined, date-time
       */
      updatedAt?: string
      user?: any
    }[]
    /**
     * @type array | undefined
     */
    Bot?: {
      /**
       * @type string | undefined
       */
      id?: string
      /**
       * @type string | undefined
       */
      name?: string
      /**
       * @type string | undefined
       */
      token?: string
      /**
       * @type boolean | undefined
       */
      active?: boolean
      /**
       * @type string | undefined
       */
      ownerId?: string
      /**
       * @type string | undefined
       */
      prefix?: string
      /**
       * @type string | undefined, date-time
       */
      createdAt?: string
      /**
       * @type string | undefined, date-time
       */
      updatedAt?: string
      /**
       * @type string | undefined
       */
      description?: string
      /**
       * @type array | undefined
       */
      tags?: string[]
      /**
       * @type string
       */
      icon?: string | null
      /**
       * @type string | undefined
       */
      serverId?: string
      /**
       * @type array | undefined
       */
      analytics?: {
        /**
         * @type string | undefined
         */
        id?: string
        /**
         * @type string | undefined
         */
        botId?: string
        /**
         * @type string | undefined
         */
        eventType?: string
        /**
         * @type string | undefined
         */
        data?: string
        /**
         * @type string | undefined, date-time
         */
        timestamp?: string
        bot?: any
      }[]
      owner?: any
      /**
       * @type object | undefined
       */
      server?: {
        /**
         * @type string | undefined
         */
        id?: string
        /**
         * @type string | undefined
         */
        name?: string
        /**
         * @type string
         */
        description?: string | null
        /**
         * @type string | undefined
         */
        ownerId?: string
        /**
         * @type string | undefined, date-time
         */
        createdAt?: string
        /**
         * @type string | undefined, date-time
         */
        updatedAt?: string
        /**
         * @type string
         */
        serverid?: string | null
        /**
         * @type array | undefined
         */
        bots?: any[]
        owner?: any
      }
      /**
       * @type array | undefined
       */
      configurations?: {
        /**
         * @type string | undefined
         */
        id?: string
        /**
         * @type string | undefined
         */
        key?: string
        /**
         * @type string | undefined
         */
        value?: string
        /**
         * @type string | undefined
         */
        botId?: string
        /**
         * @type string | undefined, date-time
         */
        createdAt?: string
        /**
         * @type string | undefined, date-time
         */
        updatedAt?: string
        bot?: any
      }[]
      /**
       * @type array | undefined
       */
      commands?: {
        /**
         * @type string | undefined
         */
        id?: string
        /**
         * @type string | undefined
         */
        name?: string
        /**
         * @type string | undefined
         */
        description?: string
        /**
         * @type string | undefined
         */
        response?: string
        /**
         * @type boolean | undefined
         */
        enabled?: boolean
        /**
         * @type string | undefined
         */
        botId?: string
        /**
         * @type string | undefined, date-time
         */
        createdAt?: string
        /**
         * @type string | undefined, date-time
         */
        updatedAt?: string
        bot?: any
        /**
         * @type array | undefined
         */
        permissions?: {
          /**
           * @type string | undefined
           */
          id?: string
          /**
           * @type string | undefined
           */
          commandId?: string
          /**
           * @type string | undefined
           */
          roleId?: string
          /**
           * @type boolean | undefined
           */
          allow?: boolean
          /**
           * @type string | undefined, date-time
           */
          createdAt?: string
          command?: any
        }[]
        /**
         * @type array | undefined
         */
        usage?: {
          /**
           * @type string | undefined
           */
          id?: string
          /**
           * @type string | undefined
           */
          commandId?: string
          /**
           * @type string | undefined
           */
          userId?: string
          /**
           * @type string | undefined
           */
          guildId?: string
          /**
           * @type string | undefined
           */
          channelId?: string
          /**
           * @type string | undefined, date-time
           */
          timestamp?: string
          command?: any
        }[]
      }[]
      /**
       * @type array | undefined
       */
      events?: {
        /**
         * @type string | undefined
         */
        id?: string
        /**
         * @type string | undefined
         */
        name?: string
        /**
         * @type string | undefined
         */
        action?: string
        /**
         * @type boolean | undefined
         */
        enabled?: boolean
        /**
         * @type string | undefined
         */
        botId?: string
        /**
         * @type string | undefined, date-time
         */
        createdAt?: string
        /**
         * @type string | undefined, date-time
         */
        updatedAt?: string
        bot?: any
      }[]
    }[]
    /**
     * @type array | undefined
     */
    Server?: {
      /**
       * @type string | undefined
       */
      id?: string
      /**
       * @type string | undefined
       */
      name?: string
      /**
       * @type string
       */
      description?: string | null
      /**
       * @type string | undefined
       */
      ownerId?: string
      /**
       * @type string | undefined, date-time
       */
      createdAt?: string
      /**
       * @type string | undefined, date-time
       */
      updatedAt?: string
      /**
       * @type string
       */
      serverid?: string | null
      /**
       * @type array | undefined
       */
      bots?: {
        /**
         * @type string | undefined
         */
        id?: string
        /**
         * @type string | undefined
         */
        name?: string
        /**
         * @type string | undefined
         */
        token?: string
        /**
         * @type boolean | undefined
         */
        active?: boolean
        /**
         * @type string | undefined
         */
        ownerId?: string
        /**
         * @type string | undefined
         */
        prefix?: string
        /**
         * @type string | undefined, date-time
         */
        createdAt?: string
        /**
         * @type string | undefined, date-time
         */
        updatedAt?: string
        /**
         * @type string | undefined
         */
        description?: string
        /**
         * @type array | undefined
         */
        tags?: string[]
        /**
         * @type string
         */
        icon?: string | null
        /**
         * @type string | undefined
         */
        serverId?: string
        /**
         * @type array | undefined
         */
        analytics?: {
          /**
           * @type string | undefined
           */
          id?: string
          /**
           * @type string | undefined
           */
          botId?: string
          /**
           * @type string | undefined
           */
          eventType?: string
          /**
           * @type string | undefined
           */
          data?: string
          /**
           * @type string | undefined, date-time
           */
          timestamp?: string
          bot?: any
        }[]
        owner?: any
        server?: any
        /**
         * @type array | undefined
         */
        configurations?: {
          /**
           * @type string | undefined
           */
          id?: string
          /**
           * @type string | undefined
           */
          key?: string
          /**
           * @type string | undefined
           */
          value?: string
          /**
           * @type string | undefined
           */
          botId?: string
          /**
           * @type string | undefined, date-time
           */
          createdAt?: string
          /**
           * @type string | undefined, date-time
           */
          updatedAt?: string
          bot?: any
        }[]
        /**
         * @type array | undefined
         */
        commands?: {
          /**
           * @type string | undefined
           */
          id?: string
          /**
           * @type string | undefined
           */
          name?: string
          /**
           * @type string | undefined
           */
          description?: string
          /**
           * @type string | undefined
           */
          response?: string
          /**
           * @type boolean | undefined
           */
          enabled?: boolean
          /**
           * @type string | undefined
           */
          botId?: string
          /**
           * @type string | undefined, date-time
           */
          createdAt?: string
          /**
           * @type string | undefined, date-time
           */
          updatedAt?: string
          bot?: any
          /**
           * @type array | undefined
           */
          permissions?: {
            /**
             * @type string | undefined
             */
            id?: string
            /**
             * @type string | undefined
             */
            commandId?: string
            /**
             * @type string | undefined
             */
            roleId?: string
            /**
             * @type boolean | undefined
             */
            allow?: boolean
            /**
             * @type string | undefined, date-time
             */
            createdAt?: string
            command?: any
          }[]
          /**
           * @type array | undefined
           */
          usage?: {
            /**
             * @type string | undefined
             */
            id?: string
            /**
             * @type string | undefined
             */
            commandId?: string
            /**
             * @type string | undefined
             */
            userId?: string
            /**
             * @type string | undefined
             */
            guildId?: string
            /**
             * @type string | undefined
             */
            channelId?: string
            /**
             * @type string | undefined, date-time
             */
            timestamp?: string
            command?: any
          }[]
        }[]
        /**
         * @type array | undefined
         */
        events?: {
          /**
           * @type string | undefined
           */
          id?: string
          /**
           * @type string | undefined
           */
          name?: string
          /**
           * @type string | undefined
           */
          action?: string
          /**
           * @type boolean | undefined
           */
          enabled?: boolean
          /**
           * @type string | undefined
           */
          botId?: string
          /**
           * @type string | undefined, date-time
           */
          createdAt?: string
          /**
           * @type string | undefined, date-time
           */
          updatedAt?: string
          bot?: any
        }[]
      }[]
      owner?: any
    }[]
  }
}[]

export type getV1ServersQueryResponse = getV1Servers200

export type getV1ServersQuery = {
  Response: getV1Servers200
  Errors: any
}