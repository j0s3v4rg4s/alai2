import * as React from 'react';

import { Skeleton } from '@mui/material';

import { STORAGE } from 'constants/storage.constants';
import { downloadFile } from 'utils/superbase';

export type ImgStorageProps = {
    path: string;
    alt?: string;
    className?: string;
};

const ImgStorage: React.FC<ImgStorageProps> = (props) => {
    const [url, setUrl] = React.useState<string>();
    React.useEffect(() => {
        downloadFile(STORAGE.bucketName, props.path)
            .then((response) => {
                if(response) {
                    const objectURL = URL.createObjectURL(response);
                    setUrl(objectURL);
                }
            })
    }, [props.path]);
    return url ? (
        <img src={url} alt={props.alt} className={props.className} />
    ) : (
        <Skeleton animation="wave" variant="circular" width={100} height={100} />
    );
};

export default ImgStorage;
