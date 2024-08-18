import {useEffect, useState} from "react";
import {Session} from "next-auth";
import axios from "axios";

export const useUserProfile = (session: Session | null) => {
    const [userData, setUserData] = useState<UserProfileProps | null>(null);

    useEffect(() => {
        const fetchUserData = async () => {
            if (!session) {
                console.log("No session found");
                return;
            }

            try {
                const result = await axios.get<UserProfileProps>('https://api.github.com/user', {
                    headers: {
                        Authorization: `Bearer ${session.accessToken}`,
                    },
                });
                setUserData(result.data);
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        };

        fetchUserData();
    }, [session]);

    return userData;
};