import qs from 'qs';
import { useLocation } from 'react-router';

export const useQuery = () => {
    return qs.parse(useLocation().search, { ignoreQueryPrefix: true });
}