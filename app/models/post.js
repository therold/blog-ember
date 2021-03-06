import DS from 'ember-data';

export default DS.Model.extend({
  title: DS.attr('string'),
  body: DS.attr('string'),
  author: DS.attr('string'),
  date: DS.attr('Date'),
  timestamp: DS.attr('number'),
  categories: DS.hasMany('category', { async: true }),
  tags: DS.hasMany('tag', { async: true }),
  comments: DS.hasMany('comment')
});
