import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { CategoriesRepository } from 'App/Repositories/category.repository'
import { schema, rules } from '@ioc:Adonis/Core/Validator'

export default class CategoriesController {

    private categoriesRepository: CategoriesRepository = new CategoriesRepository()

    constructor() { }

    public async index() {
        return this.categoriesRepository.index()
    }

    public async store(ctx: HttpContextContract) {

        const { name } = await ctx.request.validate({
            schema: schema.create({
                name: schema.string({ trim: true }, [rules.required()]),
            }),
            messages: {
                'name.required': 'El campo es requerido',
            }
        })

        return this.categoriesRepository.store({ name })
    }

    public async show(ctx: HttpContextContract) {
        return this.categoriesRepository.show({ id: ctx.params.id })
    }

    public async update(ctx: HttpContextContract) {
        const { name, isActive } = ctx.request.body()
        return this.categoriesRepository.update({ name, isActive, id: ctx.params.id })
    }

    public async destroy(ctx: HttpContextContract) {
        return this.categoriesRepository.destroy({ id: ctx.params.id })
    }

    public async getNotes(ctx: HttpContextContract) {
        return this.categoriesRepository.getNotes({ id: ctx.params.id })
    }
}
