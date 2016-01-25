import {HttpClient} from '../../auth/auth';

export class OfficeService {
  static inject() { return [HttpClient]; }
  constructor(http) {
    this.http = http;
  }

  post(data) {
    return this.http.post('api/office', { body: data });
  }

  put(data) {
    return this.http.put('api/office', { body: data });
  }

  getAll(data) {
    return this.http.get('api/office')
      .then(response => response.json());
  }

  getPaginated(page, types, doctorCount, doctorName, officeName, pageSize) {
    doctorName = encodeURI(doctorName);
    officeName = encodeURI(officeName);
    return this.http.get(`api/office?page=${page}&types=${types}&doctorCount=${doctorCount}&doctorName=${doctorName}&officeName=${officeName}&pageSize=${pageSize}`)
      .then(response => response.json());
  }

  get(id) {
    return this.http.get(`api/office/${id}`)
      .then(response => response.json());
  }
}
