import Ember from 'ember';

export default Ember.Component.extend({
  actions: {
    save() {
      var params = {
        title: this.get('title'),
        author: this.get('author'),
        body: this.get('body'),
        date: new Date()
      };
      this.sendAction('save', params);
      this.set('title', '');
      this.set('author', '');
      this.set('body', '');
    }
  }
});
