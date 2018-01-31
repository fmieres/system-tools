const 
  url = require('url')
;

/*
from : https://m.facebook.com/story.php?story_fbid=1884144798564604&id=100009073063152
to   : https://facebook.com/100009073063152/posts/1884144798564604
*/

function main(mobile_url){
  queryString = url.parse(mobile_url).query
  query = new url.URLSearchParams(queryString)
  return `https://facebook.com/${query.get('id')}/posts/${query.get('story_fbid')}`
}


console.log(main(process.argv[2]))