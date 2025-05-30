// Welcome to Keystone!
//
// This file is what Keystone uses as the entry-point to your headless backend
//
// Keystone imports the default export of this file, expecting a Keystone configuration object
//   you can find out more at https://keystonejs.com/docs/apis/config

import path from "path";
import { config } from "@keystone-6/core";
import type { KeystoneContext } from '@keystone-6/core/types';

// authentication is configured separately here too, but you might move this elsewhere
// when you write your list-level access control functions, as they typically rely on session data
import { session, withAuth } from "./auth";
import { APP_PORT, DATABASE_URL } from "./env";
// to keep this file tidy, we define our schema in a different file
import { lists } from "./schema";
import { isLocked } from "./schema/access-control/isLocked";
import express from "express";

interface Config {
  db: {
    provider: string;
    url: string;
    enableLogging: Array<'error' | 'warn' | 'info' | 'query'>;
  };
  prisma: {
    $queryRaw: <T = unknown>(query: TemplateStringsArray, ...values: unknown[]) => Promise<T>;
  };
}

export default withAuth(
  config({
    storage: {
      my_file_storage: {
        kind: "local", // or 's3' for S3
        type: "file", // or 'image' for image files

        /*******************************/
        /* Local storage configuration */
        /*******************************/
        generateUrl: (path: string) => {
          return `http://${APP_HOST}:${APP_PORT}/files${path}`;
        },
        serverRoute: { path: "/files" },
        storagePath: "public/files", // Path where files will be stored locally

        /****************************/
        /* S3 storage configuration */
        /****************************/

        // bucketName: process.env.S3_BUCKET_NAME,
        // region: process.env.S3_REGION,
        // accessKeyId: process.env.S3_ACCESS_KEY_ID,
        // secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
      },
    },
    db: {
      provider: "postgresql",
      url: DATABASE_URL,
      enableLogging: ["error", "warn", "info", 'query'],
    },
    graphql: {
      apolloConfig: {
        allowBatchedHttpRequests: true,
      }
    },
    server: {
      port: Number(APP_PORT),
      extendExpressApp: (app, context: KeystoneContext) => {
        app.use(express.json());
        app.get('/health', async (req, res) => {
          try {
            await context.prisma.$queryRaw`SELECT 1`;
            res.status(200).json({ status: 'ok', message: 'Service is healthy' });
          } catch (error) {
            console.error('Health check failed:', error);
            res.status(500).json({ 
              status: 'error', 
              message: 'Service is unhealthy', 
              error: error instanceof Error ? error.message : 'Unknown error'
            });
          }
        });
      },
      cors: {
        origin: true,
        credentials: true, // Allow credentials (cookies, authorization headers, etc.)
      }
    },
    ui: {
      isAccessAllowed: (data) => !isLocked(data), // Disable admin view if user is locked
      getAdditionalFiles: [
        () => {
          return [
            {
              mode: "copy",
              inputPath: path.join(__dirname, "..", "public", "favicon.ico"), // Path relative to current file
              outputPath: "public/favicon.ico", // Output in the 'public' directory
            },
          ];
        },
      ],
    },
    lists,
    session,
    telemetry: true,
  }),
);
