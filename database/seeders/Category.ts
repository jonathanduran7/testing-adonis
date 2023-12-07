import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Category from 'App/Models/category.model'

export default class extends BaseSeeder {
  public async run () {
    await Category.createMany([
      {name: 'Compras'},
      {name: 'Vacaciones'}
    ])
  }
}
