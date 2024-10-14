interface UserProfileProps {
    login: string;
    avatar_url: string;
    html_url: string;
    followers: number;
    following: number;
    email: string | null;
    location: string | null;
    bio: string | null;
}