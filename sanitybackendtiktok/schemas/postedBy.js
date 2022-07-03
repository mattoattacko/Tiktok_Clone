export default {
  name: 'postedBy',
  title: 'Posted By',
  type: 'reference', //'reference' means it connects two different documents
  to: [{ type: 'user' }], //its a reference to an array of users. Keeps track of user posted comments
}