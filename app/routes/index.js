import Ember from 'ember';

export default Ember.Route.extend({
  model() {
    return this.store.findAll('post').then(post => post.sortBy('date').reverse().objectsAt([0,1,2,3,4]));
  }
});
