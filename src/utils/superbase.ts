import * as React from 'react';

import { createClient, PostgrestError } from '@supabase/supabase-js';

const superBaseUrl = process.env.REACT_APP_SUPABASE_URL as string;
const superBaseApi = process.env.REACT_APP_SUPABASE_API as string;

const supabase = createClient(superBaseUrl, superBaseApi);

async function downloadFile(bucketName: string, path: string, onErrorAction?: (err: Error) => void) {
    const { data, error } = await supabase.storage.from(bucketName).download(path);
    if (error && onErrorAction) {
        onErrorAction(error);
        return null;
    }
    return data;
}

export function useGetRows<T>(
    tableName: string,
    column: keyof T,
    value: T[keyof T],
    onErrorAction?: (err: PostgrestError) => void
) {
    const [data, setData] = React.useState<T[] | null>(null);
    React.useEffect(() => {
        supabase
            .from<T>(tableName)
            .select('*')
            .eq(column, value)
            .then(({ data, error }) => {
                setData(data);
                if (onErrorAction && error) {
                    onErrorAction(error);
                }
            });
    }, [tableName, column, value, onErrorAction]);
    return data;
}

export { supabase, downloadFile };
