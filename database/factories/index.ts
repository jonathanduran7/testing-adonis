import Factory from '@ioc:Adonis/Lucid/Factory'
import Category from 'App/Models/category.model'


export const CategoryFactory = Factory.define(Category, ({faker}) => {
    return {
        name: faker.lorem.word(),
        isActive: true
    }
}).build();

