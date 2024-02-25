import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import config from "../config";
import AppError from "../errors/AppError";
import { TUserRole } from "../modules/user/user.interface";
import User from "../modules/user/user.model";
import catchAsync from "../utils/catchAsync";

const auth = (...requiredRoles: TUserRole[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;

    // if the token is sent from the client
    if (!token) {
      throw new AppError(401, "Your are not Authorized!");
    }

    // check if the token is valid
    const decoded = jwt.verify(token, config.jwt_access_secret as string) as JwtPayload;

    const { role, userId, iat } = decoded;

    // checking if the user is exist
    const user = await User.isUserExistsByCustomId(userId);
    if (!user) {
      throw new AppError(404, "This User is Not Found!");
    }

    // checking if the user is already deleted
    const isDeleted = user?.isDeleted;
    if (isDeleted) {
      throw new AppError(403, "This User is Deleted");
    }

    // checking if the user is already blocked
    const userStatus = user?.status;
    if (userStatus === "blocked") {
      throw new AppError(403, "This User is Blocked");
    }

    if (
      user.passwordChangeAt &&
      User.isJWTIssuedBeforePasswordChanged(user.passwordChangeAt, iat as number)
    ) {
      throw new AppError(401, "You are not authorized!");
    }

    if (requiredRoles && !requiredRoles.includes(role)) {
      throw new AppError(401, "You are not authorized!");
    }

    // decoded
    (req as any).user = decoded as JwtPayload;
    next();
  });
};
export default auth;
