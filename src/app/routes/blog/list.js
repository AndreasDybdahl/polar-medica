import {BlogService} from '../../services/blog';

import moment from 'moment';
import view from './list.html!';

export class List {
  static inject() { return [BlogService]; }
  constructor(blogService) {
    this.blogService = blogService;
  }

  activate() {
    return this.blogService.getLatest()
      .then(({posts, total, page}) => {
        this.posts = posts;
        this.total = total;
        this.page = page;
        this.md = "*this is markdown!*";
      });
  }

  url(post) {
    let date = moment(post.date);
    return `#/blog/${date.format('YYYY/MM/DD')}/${post.slug}/`
  }

  tagUrl(tag) {
    return `#/blog/tags/${tag}/`;
  }

  date(post) {
    return moment(post.date).format('MMM D');
  }

  getViewStrategy() {
    return view;
  }
}