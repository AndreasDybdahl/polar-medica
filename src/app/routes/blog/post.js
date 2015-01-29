import {BlogService} from 'app/services/blog';

import moment from 'moment';

export class Index {
  static inject() { return [BlogService]; }
  constructor(blogService) {
    this.blogService = blogService;
  }

  canActivate(params) {
    let {date, month, year, slug} = params;
    return this.blogService.getPost(year, month, date, slug)
      .then(post => {
        if (post === null)
          return false;

        this.post = post;
        return true;
      });
  }

  url(post) {
    let date = moment(post.date);
    return `#/blog/${date.format('YYYY/MM/DD')}/${post.slug}/`
  }

  date(post) {
    return moment(post.date).format('MMM D');
  }
}