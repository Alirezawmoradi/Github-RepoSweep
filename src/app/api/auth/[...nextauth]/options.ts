import {NextAuthOptions} from "next-auth";
import GitHub from "next-auth/providers/GitHub";
import {clientId, clientSecret} from "@/configs/global";

if (!clientId || !clientSecret) {
    throw new Error('missing clientId and clientSecret');
}

export const authOptions: NextAuthOptions = {
    providers: [
        GitHub({
            clientId: clientId,
            clientSecret: clientSecret,
        })
    ]
}