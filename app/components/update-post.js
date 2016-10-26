import Ember from 'ember';

export default Ember.Component.extend({
  isUpdateShowing: false,
  didReceiveAttrs() {
    this.title = this.get('post.title');
    this.author = this.get('post.author');
    this.body = this.get('post.body');
  },
  actions: {
    showUpdate() {
      this.set('isUpdateShowing', true);
    },
    cancelUpdate() {
      this.set('isUpdateShowing', false);
      this.set('title', this.get('post.title'));
      this.set('author', this.get('post.author'));
      this.set('body', this.get('post.body'));
    },
    update(post) {
      var params = {
        title: this.get('title'),
        author: this.get('author'),
        body: this.get('body'),
      };
      this.set('isUpdateShowing', false);
      this.sendAction('update', post, params);
    },
    delete(post) {
      if(confirm('Are you sure you want to delete this post?')) {
        this.sendAction('delete', post);
      }
    }
  }

});
