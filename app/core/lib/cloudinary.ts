import { Cloudinary } from '@cloudinary/url-gen';

const cloudName = process.env.EXPO_PUBLIC_CLOUD_NAME;

export const cloudinary = new Cloudinary({ cloud: { cloudName, apiKey: '121569739225482', apiSecret: 'XDDARPcs1U96DjWjvElCnkTcMsw' }, url: { secure: true } });
