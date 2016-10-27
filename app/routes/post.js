import Ember from 'ember';

export default Ember.Route.extend({
  model(params) {
    return this.store.findRecord('post', params.post_id);
  },
  actions: {
    saveComment(params) {
      var newComment = this.store.createRecord('comment', params);
      var post = params.post;
      post.get('comments').addObject(newComment);
      newComment.save().then(() => { return post.save(); });
      this.transitionTo('post', post);
    },
    updateComment(comment, params) {
      Object.keys(params).forEach(function(key) {
        comment.set(key, params[key]);
      });
      comment.save();
    },
    deleteComment(comment) {
      comment.destroyRecord();
    }
  }
});
