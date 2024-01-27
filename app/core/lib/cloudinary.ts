import { Cloudinary } from '@cloudinary/url-gen';

const cloudName = process.env.CLOUD_NAME;

export const cloudinary = new Cloudinary({ cloud: { cloudName }, url: { secure: true } });
