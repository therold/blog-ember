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
    update(post) {
      var params = {
        title: this.get('title'),
        author: this.get('author'),
        body: this.get('body'),
      };
      this.set('isUpdateShowing', false);
      this.sendAction('update', post, params);
    }
  }

});
