import Ember from 'ember';

export default Ember.Component.extend({
  didReceiveAttrs() {
    this.title = this.get('comment.title');
    this.author = this.get('comment.author');
    this.body = this.get('comment.body');
  },
  actions: {
    cancelUpdate() {
      this.sendAction('cancel');
    },
    update(comment) {
      var params = {
        title: this.get('title'),
        author: this.get('author'),
        body: this.get('body'),
      };
      this.sendAction('update', comment, params);
    },
    delete(comment) {
      if(confirm('Are you sure you want to delete this post?')) {
        this.sendAction('delete', comment);
      }
    }
  }
});
