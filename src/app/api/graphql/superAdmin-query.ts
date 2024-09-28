import { Context } from "./route";

export const superAdminTypeDefs = `#graphql
  type Query {
    getAllSuperAdmins: [SuperAdmin]
    getSuperAdminById(id: ID!): SuperAdmin
  }

  type Mutation {
    addSuperAdmin(userName: String, password: String, role: String): SuperAdmin
    updateSuperAdmin(id: ID!, userName: String, password: String, role: String): SuperAdmin
    deleteSuperAdmin(id: ID!): SuperAdmin
  }
`;

const superAdminResolvers = {
  Query: {
    getAllSuperAdmins: async (
      parent: SuperAdmin,
      args: SuperAdmin,
      context: Context
    ) => {
      return await context.prisma.superAdmin.findMany();
    },

    getSuperAdminById: async (
      parent: SuperAdmin,
      args: SuperAdmin,
      context: Context
    ) => {
      return await context.prisma.superAdmin.findUnique({
        where: { id: args.id },
      });
    },
  },

  SuperAdmin: {
    admins: async (parent: SuperAdmin, args: Admin, context: Context) => {
      return await context.prisma.admin.findMany({
        where: {
          superAdminId: parent.id,
        },
      });
    },
  },

  Mutation: {
    addSuperAdmin: async (
      parent: SuperAdmin,
      args: SuperAdmin,
      context: Context
    ) => {
      return await context.prisma.superAdmin.create({
        data: {
          userName: args.userName,
          password: args.password,
          role: args.role || "Super Admin",
        },
      });
    },

    updateSuperAdmin: async (
      parent: SuperAdmin,
      args: SuperAdmin,
      context: Context
    ) => {
      return await context.prisma.superAdmin.update({
        where: { id: args.id },
        data: {
          userName: args.userName,
          password: args.password,
          role: args.role || "Super Admin",
        },
      });
    },

    deleteSuperAdmin: async (
      parent: SuperAdmin,
      args: { id: string },
      context: Context
    ) => {
      return await context.prisma.superAdmin.delete({
        where: { id: args.id },
      });
    },
  },
};

export default superAdminResolvers;
