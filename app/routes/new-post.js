import Ember from 'ember';

export default Ember.Route.extend({
  model() {
    return
  },
  actions: {
    save(params, categories) {
      var controller = this;
      var newPost = controller.store.createRecord('post', params);
      newPost.save()
        .then((post) => {
          var enteredCategories = categories.split(' ');
          enteredCategories.forEach(function(category, i) {
            if(!enteredCategories.slice(0, i).includes(category)) {
              controller.store.query('category', { orderBy: 'name', equalTo: category}).then(queryResult => {
                var savedCategory = queryResult.objectAt(0);
                var params = { name: category, post: newPost };
                if(!savedCategory) {
                  // new category entered.
                  var newCategoryItem = controller.store.createRecord('category', params);
                  newPost.get('categories').addObject(newCategoryItem);
                  newPost.save().then(() => {
                    newCategoryItem.get('posts').addObject(newPost);
                    newCategoryItem.save();
                  });
                } else {
                  // existing category entered.
                  newPost.get('categories').addObject(savedCategory);
                  newPost.save().then(() => {
                    savedCategory.get('posts').addObject(newPost);
                    savedCategory.save();
                  })
                }
              });
            }
          });
        });
      this.transitionTo('index');
    }
  }
});
