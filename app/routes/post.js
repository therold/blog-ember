import Ember from 'ember';

export default Ember.Route.extend({
  model(params) {
    return this.store.findRecord('post', params.post_id);
  },
  actions: {
    saveComment(params) {
      var newComment = this.store.createRecord('comment', params);
      var post = params.post;
      post.get('comments').addObject(newComment);
      newComment.save().then(() => { return post.save(); });
      this.transitionTo('post', post)
    },
    update(post, params, removeCategories) {
      removeCategories.forEach(id => {
        this.store.findRecord('category', id).then(category => {
          post.get('categories').removeObject(category);
          post.save();
          // remove the post's link to the category
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
      post.get('categories').then(categories => {
        categories.forEach(category => {
          category.get('posts').removeObject(category);
          category.save().then(category => {
            if(category.get('posts').get('length') === 0) {
              // Category is now an orphan. Category has no associated posts.
              category.destroyRecord();
            }
          });
        });
      });
      post.destroyRecord();
      this.transitionTo('index');
    }
  }
});
