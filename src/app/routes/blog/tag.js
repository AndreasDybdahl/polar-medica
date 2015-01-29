import {BlogService} from '../../services/blog';
import {List} from './list';

import moment from 'moment';

export class Tag extends List {
  static inject() { return [BlogService]; }
  constructor(blogService) {
    this.blogService = blogService;
  }

  activate(params) {
    let {tag} = params;
    this.tag = tag;
    return this.blogService.getPostsForTag(tag)
      .then(({posts, total, page}) => {
        this.posts = posts;
        this.total = total;
        this.page = page;
      });
  }
}