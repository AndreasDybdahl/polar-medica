import {HttpClient} from '../../auth/auth';

export class OfficeService {
  static inject() { return [HttpClient]; }
  constructor(http) {
    this.http = http;
  }

  post(data) {
    return this.http.post('http://localhost:24655/api/office', { body: data });
  }
  
  put(data) {
    return this.http.put('http://localhost:24655/api/office', { body: data });
  }

  getAll(data) {
    return this.http.get('http://localhost:24655/api/office')
      .then(response => response.json());
  }
  
  getPaginated(page, pageSize) {
    return this.http.get(`http://localhost:24655/api/office/page/${page}`)
      .then(response => response.json());
  }
  
  getPaginatedFiltered(page, name, pageSize) {
    return this.http.get(`http://localhost:24655/api/office/page/${page}/${name}`)
      .then(response => response.json());
  }
  
  get(id) {
    return this.http.get(`http://localhost:24655/api/office/${id}`)
      .then(response => response.json());
  }
}