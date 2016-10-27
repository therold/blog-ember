import Ember from 'ember';

export default Ember.Route.extend({
  model(params) {
    return this.store.findRecord('post', params.post_id);
  },
  actions: {
    update(post, params, removeCategories) {
      removeCategories.forEach(id => {
        this.store.findRecord('category', id).then(category => {
          post.get('categories').removeObject(category);
          post.save();
          category.get('posts').removeObject(post);
          category.save().then(category => {
            if(category.get('posts').get('length') === 0) {
              // Category is now an orphan. Category has no associated posts.
              category.destroyRecord();
            }
          });
        });
      });
      Object.keys(params).forEach(function(key) {
        post.set(key, params[key]);
      });
      post.save();
      this.transitionTo('index');
    },
    delete(post) {
      post.destroyRecord();
      this.transitionTo('index');
    }
  }
});
