import { adminTypeDefs } from "./admin-query";
import { superAdminTypeDefs } from "./superAdmin-query";

const baseTypeDefs = `#graphql
  type SuperAdmin {
    id: ID!
    userName: String
    password: String
    role: String
    admins: [Admin]
  }

  type Admin {
    id: ID!
    createdAt: String
    updatedAt: String
    userName: String
    password: String
    role: String
    superAdminId: String
    superAdmin: SuperAdmin
    users: [User]
  }

  type User {
    id: ID!
    createdAt: String
    updatedAt: String
    userName: String
    password: String
    role: String
    adminId: String
    admin: Admin
    batches: [Batch]
  }

  type Batch {
    id: ID!
    createdAt: String
    updatedAt: String
    batchName: String
    inTime: String
    outTime: String
    state: Boolean
    userId: String
    user: User
    students: [Student]
  }

  type Student {
    id: ID!
    createdAt: String
    updatedAt: String
    studentName: String
    aadhar_number: Int
    state: String
    batchId: String
    batch: Batch
    fingerprints: [FingerPrint]
    details: Details
  }

  type FingerPrint {
    id: ID!
    image: String
    priority: Int
    studentId: String
    student: Student
  }

  type Details {
    id: ID!
    aadhar_number: Int
    mobile: Int
    email: String
    address: String
    domicileState: String
    domicileDistrict: String
    idType: String
    dob: String
    gender: String
    maritalStatus: String
    fatherGuardian: String
    motherGuardian: String
    religion: String
    castCategory: String
    disability: Boolean
    disabilityType: String
    employed: Boolean
    employmentStatus: String
    employmentDetails: String
    trainingProgram: String
    studentId: String
    student: Student
  }
`;

export const typeDefs = `#graphql
  ${baseTypeDefs}
  ${superAdminTypeDefs}
  ${adminTypeDefs}
`;
