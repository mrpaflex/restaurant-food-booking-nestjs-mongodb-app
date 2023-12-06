import { SetMetadata } from "@nestjs/common";
import { Role } from "../user/enum/user.roles";

export const Roles = (...roles: Role[])=> SetMetadata('roles', roles)