import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";

import authConfig from '../config/auth';

export default async function ensureAuthenticated(
    request: Request,
    response: Response,
    next: NextFunction
): Promise<any> {
    const authHeader = request.headers.authorization;

    if (!authHeader) {
        return response.status(401).json({ error: "Token JWT inválido" });
    }

    const [type, token] = authHeader.split(' ');

    try {
        const decoded = verify(token, authConfig.jwt.secret);

        return next();
    } catch {
        return response.status(401).json({ error: 'Token JWT Inválido' });
    }
}