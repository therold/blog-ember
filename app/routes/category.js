import Ember from 'ember';

export default Ember.Route.extend({
  model(params) {
    return this.store.query('category', { orderBy: 'name', equalTo: 'love'});
  },
});
