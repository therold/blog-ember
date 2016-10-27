import Ember from 'ember';

export default Ember.Route.extend({
  model() {
    return this.store.findAll('post', { reload: true }).then(post => post.sortBy('timestamp').reverse()
    );
  }
});
