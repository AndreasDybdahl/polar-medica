import {BlogService} from 'app/services/blog';

import moment from 'moment';

export class Index {
  static inject() { return [BlogService]; }
  constructor(blogService) {
    this.blogService = blogService;
  }

  activate() {
    return this.blogService.getLatest()
      .then(result => {
        this.posts = result.posts;
        this.total = result.total;
        this.page = result.page;
      });
  }

  url(post) {
    let date = moment(post.date);
    return `#/${date.format('YYYY/MM/DD')}/${post.slug}/`
  }

  date(post) {
    return moment(post.date).format('MMM D');
  }
}