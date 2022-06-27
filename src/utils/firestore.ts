import * as React from 'react';

import { doc, DocumentReference, DocumentSnapshot,onSnapshot } from 'firebase/firestore';

import { firestore as db } from './firebase';

export function useDoc<T>(collection: string, key: string) {
    const [data, setData] = React.useState<DocumentSnapshot<T>>();
    React.useEffect(() => {
        if (!!collection && !!key) {
            const docRef = getReference<T>(collection, key);
            const unsubscribe = onSnapshot(docRef, (snapshot) => {
                setData(snapshot);
            });
            return () => unsubscribe();
        }
    }, [collection, key]);
    return data;
}

export function getReference<T>(collection: string, key: string) {
    return doc(db, collection, key) as DocumentReference<T>;
}
