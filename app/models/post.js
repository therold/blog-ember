import DS from 'ember-data';

export default DS.Model.extend({
  title: DS.attr('string'),
  body: DS.attr('string'),
  author: DS.attr('string'),
  date: DS.attr('Date'),
  categories: DS.hasMany('category', { async: true }),
  tags: DS.hasMany('tag', { async: true })
});
