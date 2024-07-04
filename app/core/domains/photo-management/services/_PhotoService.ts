import { PhotoAPI } from '../api/PhotoAPI';

class PhotoService {
  constructor(private api: typeof PhotoAPI) {
    this.api = api;
  }

  async uploadPhoto(eventId: string, file: string) {}

  async getPhoto(url: string) {}
}

export default new PhotoService(PhotoAPI);
