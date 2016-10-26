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
          categories.split(' ').forEach(function(category) {
            controller.store.query('categoryList', { orderBy: 'name', equalTo: category}).then(exists => {
              if(!exists.objectAt(0)) {
                var params = { name: category };
                var newCategoryListItem = controller.store.createRecord('categoryList', params);
                newCategoryListItem.save();
              }
            });
            var params = { name: category, post: post };
            var newCategory = controller.store.createRecord('category', params);
            newCategory.save().then(function() {
              return post.save();
            });
          });
        });
      this.transitionTo('index');
    }
  }
});
