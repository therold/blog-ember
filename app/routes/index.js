import Ember from 'ember';

export default Ember.Route.extend({
  model() {
    return this.store.query('post',
      { orderBy: 'timestamp', limitToLast: 5 },
      { reload: true })
        .then(post => post.sortBy('timestamp').reverse());
  }
});
