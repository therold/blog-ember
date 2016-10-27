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
  }
});
