import Ember from 'ember';

export default Ember.Route.extend({
  model(params) {
    return this.store.query('category', { orderBy: 'name', equalTo: params.category_name})
    .then(result => { return result.objectAt(0); });
  },
});
