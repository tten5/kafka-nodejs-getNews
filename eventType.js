const avro = require('avsc')

module.exports.newsType = avro.Type.forSchema({
  type: 'record',
  fields: [
    {
      name: 'title',
      type: 'string',
    },
    {
      name: 'description',
      type: 'string',
    },
    {
      name: 'url',
      type: 'string',
    },
    {
      name: 'publishedAt',
      type: 'string',
    }
  ]
});