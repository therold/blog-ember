import Ember from 'ember';

export default Ember.Component.extend({
  isNewCommentShowing: false,
  actions: {
    showNewComment() {
      this.set('isNewCommentShowing', true);
    },
    cancel() {
      this.set('isNewCommentShowing', false);
      this.set('title', '');
      this.set('body', '');
      this.set('author', '');
    },
    save() {
      var now = new Date();
      var params = {
        title: this.get('title'),
        body: this.get('body'),
        author: this.get('author'),
        date: now,
        timestamp: now.getTime(),
        post: this.get('post')
      }
      this.sendAction('save', params);
      this.set('isNewCommentShowing', false);
      this.set('title', '');
      this.set('body', '');
      this.set('author', '');
    }
  }
});
