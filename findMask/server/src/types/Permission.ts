import { registerEnumType } from "type-graphql";

enum Permission {
  ADMIN = "Admin",
  WORKER = "Worker"
}

registerEnumType(Permission, {
  name: "Permission",
  description: "Permission enum type"
});

export default Permission;