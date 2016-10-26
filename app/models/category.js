import DS from 'ember-data';

export default DS.Model.extend({
    name: DS.attr('string'),
    post: DS.belongsTo('post', { async: true })
});
