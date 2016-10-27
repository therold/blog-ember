import Ember from 'ember';

export default Ember.Component.extend({
  isUpdateShowing: false,
  isNewCategoriesShowing: false,
  removeCategories: Ember.A([]),
  didReceiveAttrs() {
    this.title = this.get('post.title');
    this.author = this.get('post.author');
    this.body = this.get('post.body');
    this.removeCategories.clear();
  },
  actions: {
    removeCategory(category) {
      this.removeCategories.pushObject(category.get('id'));
    },
    undoRemoveCategory(category) {
      var index = this.removeCategories.indexOf(category.get('id'));
      this.removeCategories.removeAt(index);
    },
    showNewCategories() {
      this.set('isNewCategoriesShowing', true);
    },
    showUpdate() {
      this.set('isUpdateShowing', true);
    },
    cancelUpdate() {
      history.back();
    },
    update(post) {
      var newCategories = this.get("newCategories");
      var removeCategories = this.removeCategories;
      var categories = post.get('categories');
      var params = {
        title: this.get('title'),
        author: this.get('author'),
        body: this.get('body'),
      };
      this.set('isUpdateShowing', false);
      this.sendAction('update', post, params, removeCategories, newCategories);
    },
    delete(post) {
      if(confirm('Are you sure you want to delete this post?')) {
        this.sendAction('delete', post);
      }
    }
  }

});
