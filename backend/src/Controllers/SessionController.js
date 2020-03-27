const connection = require('../database/connection');

module.exports = {
 async create(request, response) {
  const { id } = request.body;

  const ong = await connection('ongs')
   .where('id', id)
   .select('name')
   .first()//para indicar q única ong já que é pelo ID

  if (!ong) {
   return response.status(400).json({ error: 'DONT HAVE ONGs HERE ASSHOLE!' })
  }

  return response.json(ong);
 }
}