import { useRouter } from 'next/router';


export const useCurrentPathname = () => {
    const r = useRouter();
    return r.asPath.split('/')[r.asPath.split('/').length - 1];
};