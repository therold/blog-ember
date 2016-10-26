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
      var categories = this.get('categories')
      this.sendAction('save', params, categories);
      this.set('title', '');
      this.set('author', '');
      this.set('body', '');
    }
  }
});
