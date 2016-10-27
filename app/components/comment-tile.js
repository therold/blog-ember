import Ember from 'ember';

export default Ember.Component.extend({
  commentToEdit: null,
  actions: {
    showEdit(comment) {
      this.set('commentToEdit', comment.get('id'));
    },
    cancelUpdate() {
      this.set('commentToEdit', null);
    },
    update(comment, params) {
      this.set('commentToEdit', null);
      this.sendAction('update', comment, params);
    },
    delete(comment) {
      this.sendAction('delete', comment);
    }
  }
});
