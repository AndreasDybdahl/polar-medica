import moment from 'moment';

const PAGE_SIZE = 5;

let posts = [
   {
    id: 2,
    title: 'This is another test post',
    slug: 'this-is-another-test-post',
    date: '2015-01-29T22:26:08.549Z',
    tags: ['test', 'funky'],
    content: `
This post is a lot more funky than the other.

It has stuff that the other does not.

* See
* Here
* Is
* A
* List

#### And a heading
    `
  },
  {
    id: 1,
    title: 'This is a test post',
    slug: 'this-is-a-test-post',
    date: '2015-01-28T22:26:08.549Z',
    tags: ['test'],
    content: `
So I write a little *markdown*, and it just **works**!
    `
  }
];

function unique(arr) {
  let obj = {};
  return arr.filter(itm => {
    if (obj.hasOwnProperty(itm))
      return false;

    return obj[itm] = true;
  });
}

export class BlogService {
  getLatest(page = 1) {
    return new Promise(resolve => {
      let pages = Math.ceil(posts.length - 1 / PAGE_SIZE);
      if (pages === 0)
        pages = 1;

      if (page > pages)
        throw new Error(`There does not exist ${page} pages`);

      let result = posts.slice((page - 1) * PAGE_SIZE, PAGE_SIZE);
      resolve({
        posts: result,
        page: page,
        total: pages
      });
    });
  }

  getTags() {
    return new Promise(resolve => {
      let tags = Array.prototype.concat.apply([], posts.map(p => p.tags));
      tags = unique(tags);
      resolve(tags);
    });
  }

  getPost(year, month, date, slug) {
    return new Promise(resolve => {
      let dateMatch = `${year}-${month}-${date}`;
      let post = posts.filter(p => {
        let date = moment(p.date).format('YYYY-MM-DD');
        return date === dateMatch && p.slug === slug;
      });

      if (post.length === 0)
        return resolve(null);

      resolve(post[0]);
    });
  }
}