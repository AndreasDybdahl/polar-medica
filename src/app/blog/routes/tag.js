import {BlogService} from '../services/blog';
import {List} from './list';

import moment from 'moment';
import view from './tag.html!';

export class Tag extends List {
  static inject() { return [BlogService]; }
  constructor(blogService) {
    super(blogService);
  }

  activate(params, qs, config) {
    let {tag} = params;
    this.tag = tag;
    return this.blogService.getPostsForTag(tag)
      .then(({posts, total, page}) => {
        this.posts = posts;
        this.total = total;
        this.page = page;

        config.navModel.title = `Tag: ${tag}`;
      });
  }

  getViewStrategy() {
    return view;
  }
}