import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Role } from "../user/enum/user.roles";

// @Injectable()
// export class RolesGuard implements CanActivate{
//     constructor(private reflector: Reflector){}

//     canActivate(context: ExecutionContext):boolean{
//         const roles = this.reflector.get<string[]>('roles', context.getHandler());
//         if (!roles) {
//             return true;
//         }

//         const request = context.switchToHttp().getRequest();
//         const user = request.user;

//         console.log(user.role)

//         return  isRoledMatched(roles, user.role)
//         //the user.role is coming from database based on the user role
//     }

    
// }

// const isRoledMatched =  (roles, userRole)=>{
//         if (!roles.includes(userRole)) {
//             return false
//         }
//         return true
// }

@Injectable()
export class RolesGuard implements CanActivate{
    constructor(private reflector: Reflector){}

    canActivate(context: ExecutionContext):boolean{
        const roles = this.reflector.get<Role[]>('roles', context.getHandler());
        if (!roles) {
            return true;
        }

        const request = context.switchToHttp().getRequest();
        const user = request.user;

        console.log(user.role)

        return  isRoledMatched(roles, user.role)
        //the user.role is coming from database based on the user role
    }

    
}

const isRoledMatched =  (roles, userRole)=>{
        if (!roles.includes(userRole)) {
            return false
        }
        return true
}