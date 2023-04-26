import { sign } from "jsonwebtoken";
import dayjs from "dayjs";

import authConfig from '../config/auth';

class SessionProvider {
    public async generateToken(id: string): Promise<any> {
        const token = sign(
            {},
            authConfig.jwt.secret,
            {
                subject: id,
                expiresIn: dayjs().add(authConfig.jwt.expiresIn, "second").unix()
            }
        );

        return token;
    }
}

export default SessionProvider;
