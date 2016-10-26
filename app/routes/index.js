import Ember from 'ember';

export default Ember.Route.extend({
  model() {
    return this.store.query('post', {
      orderBy: 'date',
      limitToLast: 5
    }).then(post => post.sortBy('date').reverse());
  }
});
