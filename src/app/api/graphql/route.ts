import { startServerAndCreateNextHandler } from "@as-integrations/next";
import { ApolloServer } from "@apollo/server";
import { NextRequest } from "next/server";
import prisma from "../../../../prisma/db";
import { PrismaClient } from "@prisma/client";
import superAdminResolvers from "./superAdmin-query";
import { typeDefs } from "./typeDefs";
import adminResolvers from "./admin-query";

export type Context = {
  prisma: PrismaClient;
};

const resolvers = {
  Query: {
    ...superAdminResolvers.Query,
    ...adminResolvers.Query,
  },

  SuperAdmin: {
    ...superAdminResolvers.SuperAdmin,
  },

  Admin: {
    ...adminResolvers.Admin,
  },

  User: {
    ...adminResolvers.User,
  },

  Batch: {
    ...adminResolvers.Batch,
  },

  Student: {
    ...adminResolvers.Student,
  },

  Mutation: {
    ...superAdminResolvers.Mutation,
    ...adminResolvers.Mutation,
  },
};

const apolloServer = new ApolloServer<Context>({
  resolvers,
  typeDefs,
});

const handler = startServerAndCreateNextHandler(apolloServer, {
  context: async (req: NextRequest) => ({
    req,
    prisma,
  }),
});

export { handler as GET, handler as POST };
