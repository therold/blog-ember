import DS from 'ember-data';

export default DS.Model.extend({
  title: DS.attr('string'),
  body: DS.attr('string'),
  author: DS.attr('string'),
  date: DS.attr('Date'),
  timestamp: DS.attr('number'),
  categories: DS.belongsTo('post', { async: true })
});
