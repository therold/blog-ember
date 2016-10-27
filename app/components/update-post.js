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
    // this.get('post.categories')
    //   .map(category => {
    //     return category.get('id');
    //   }).forEach(id => {
    //     this.removeCategories.addObject(id);
    //   });
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
      this.set('isUpdateShowing', false);
      this.set('isNewCategoriesShowing', false);
      this.set('title', this.get('post.title'));
      this.set('author', this.get('post.author'));
      this.set('body', this.get('post.body'));
      this.removeCategories.clear();
    },
    update(post) {
      var categories = post.get('categories');
      // post.get('categories').map(category => console.log(category.get('name')));
      var params = {
        title: this.get('title'),
        author: this.get('author'),
        body: this.get('body'),
      };
      this.set('isUpdateShowing', false);
      this.sendAction('update', post, params, this.removeCategories);
    },
    delete(post) {
      // if(confirm('Are you sure you want to delete this post?')) {
        this.sendAction('delete', post);
      // }
    }
  }

});
