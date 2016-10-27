import Ember from 'ember';

export default Ember.Route.extend({
  model(params) {
    return this.store.findRecord('post', params.post_id);
  },
  actions: {
    update(post, params, removeCategories, newCategories) {
      var controller = this;
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
      if(newCategories) {
        var enteredCategories = newCategories.split(' ');
        enteredCategories.forEach(function(category, i) {
          if(!enteredCategories.slice(0, i).includes(category)) {
            controller.store.query('category', { orderBy: 'name', equalTo: category}).then(queryResult => {
              var savedCategory = queryResult.objectAt(0);
              var params = { name: category, post: post };
              if(!savedCategory) {
                // new category entered.
                var newCategoryItem = controller.store.createRecord('category', params);
                post.get('categories').addObject(newCategoryItem);
                post.save().then(() => {
                  newCategoryItem.get('posts').addObject(post);
                  newCategoryItem.save();
                });
              } else {
                // existing category entered.
                post.get('categories').addObject(savedCategory);
                post.save().then(() => {
                  savedCategory.get('posts').addObject(post);
                  savedCategory.save();
                });
              }
            });
          }
        });
      }
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
      console.log(post);
      var comment_deletions = post.get('comments').map(comment => {
        return comment.destroyRecord();
      });
      Ember.RSVP.all(comment_deletions).then(() => {
        return post.destroyRecord();
      }).then(this.transitionTo('index'));
    }
  }
});
