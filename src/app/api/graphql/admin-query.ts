import type { Context } from "./route";

export const adminTypeDefs = `#graphql
    type  Query {
        getAllAdmins: [Admin]
        getAdminByID(id: ID!): Admin
    }

    type Mutation {
        updateAdmin(id: ID!, userName: String, password: String, role: String): Admin
    }

`;

const adminResolvers = {
  Query: {
    getAllAdmins: async (
      parent: SuperAdmin,
      args: SuperAdmin,
      context: Context
    ) => {
      return await context.prisma.admin.findMany();
    },

    getAdminByID: async (
      parent: SuperAdmin,
      args: SuperAdmin,
      context: Context
    ) => {
      return await context.prisma.admin.findUnique({ where: { id: args.id } });
    },
  },

  Admin: {
    users: async (parent: Admin, args: User, context: Context) => {
      return await context.prisma.user.findMany({
        where: { adminId: parent.id },
      });
    },
  },

  User: {
    batches: async (parent: User, args: Batch, context: Context) => {
      return await context.prisma.batch.findMany({
        where: { userId: parent.id },
      });
    },
  },

  Batch: {
    students: async (parent: Batch, args: Student, context: Context) => {
      return await context.prisma.student.findMany({
        where: { batchId: parent.id },
      });
    },
  },

  Student: {
    fingerprints: async (
      parent: Student,
      args: FingerPrint,
      context: Context
    ) => {
      return await context.prisma.fingerPrint.findMany({
        where: { studentId: parent.id },
      });
    },

    /* details: async (parent: Student, args: Details, context: Context) => {
      return await context.prisma.details.findUnique({
        where: { studentId: parent.id },
      });
    }, */
  },

  Mutation: {
    updateAdmin: async (parent: Admin, args: Admin, context: Context) => {
      return await context.prisma.admin.update({
        where: { id: args.id },
        data: {
          userName: args.userName,
          password: args.password,
          role: args.role || "Admin",
        },
      });
    },
  },
};

export default adminResolvers;
