import type { SVGProps } from "react";

export const NewRocketIcon = (props: SVGProps<SVGSVGElement>) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={24}
        height={25}
        viewBox="0 0 24 25"
        fill="none"
        {...props}
    >
        <g fill="currentColor" clipPath="url(#a)">
            <path d="M15.262 3.486c1.215 1.969 2.375 5.146 2.668 10.229l2.25 2.745a3.75 3.75 0 0 1 .82 2.343v4.947a.75.75 0 0 1-1.35.45l-1.688-2.25c-.248-.333-.63-.6-1.128-.855-.32-.162-.62-.288-.94-.423l-.294-.125c-1.05.642-2.325.953-3.6.953s-2.55-.31-3.6-.953c-.102.046-.2.086-.297.127-.316.133-.616.259-.938.421-.497.255-.878.522-1.128.855L4.35 24.2A.75.75 0 0 1 3 23.75v-4.947c0-.852.29-1.678.822-2.343l.006-.008 2.246-2.737c.295-4.985 1.453-8.151 2.66-10.134.7-1.15 1.41-1.893 1.966-2.355.279-.234.58-.44.901-.615A.824.824 0 0 1 12 .5c.152 0 .255.04.375.096.056.026.129.061.217.113.178.099.416.25.695.472.56.446 1.275 1.168 1.975 2.305ZM14.25 9.5c0-1.657-1.008-3-2.25-3s-2.25 1.343-2.25 3c0 1.658 1.008 3 2.25 3s2.25-1.342 2.25-3Z" />
            <path d="M12 22.248c.75 0 1.498-.07 2.218-.209L12.6 24.198a.75.75 0 0 1-1.2 0L9.78 22.039c.72.14 1.47.209 2.219.209Z" />
        </g>
        <defs>
            <clipPath id="a">
                <path fill="currentColor" d="M0 .5h24v24H0z" />
            </clipPath>
        </defs>
    </svg>
);