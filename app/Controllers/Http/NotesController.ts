import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { NotesRepository } from 'App/Repositories/notes.repository'

export default class NotesController {

    private notesRepository: NotesRepository = new NotesRepository() 

    constructor(){}
    
    public async index() {
        return this.notesRepository.index()
    }

    public async store(ctx: HttpContextContract) {
        const { title, content, categoryId } = ctx.request.body()
        return this.notesRepository.store({ title, content, categoryId })
    }

    public async show(ctx: HttpContextContract) {
        try {
            console.log(ctx.params.id)
            return this.notesRepository.show({ id: ctx.params.id })
        } catch (error) {
            console.log(error)
            ctx.response.status(404).send({ message: 'No se encontró la nota' })
        }
    }

    public async update(ctx: HttpContextContract) {
        const { title, content } = ctx.request.body()
        const { id } = ctx.params
        return this.notesRepository.update({ title, content, id })
    }

    public async destroy(ctx: HttpContextContract) {
        try {
            return this.notesRepository.destroy({ id: ctx.params.id })
        } catch (error) {
            ctx.response.status(404).send({ message: 'Hubo un problema al eliminar la nota' })
        }
    }
}
