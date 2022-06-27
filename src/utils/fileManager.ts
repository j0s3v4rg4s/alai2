import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { storage } from 'utils/firebase';

export function uploadFile(url: string, file: File) {
    const reference = ref(storage, url);
    return uploadBytes(reference, file).then((snapshot) => {
        return snapshot.ref;
    });
}

export function downloadFile(url: string) {
    const reference = ref(storage, url);
    return getDownloadURL(reference);
}
