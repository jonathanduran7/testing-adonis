import { Exception } from "@adonisjs/core/build/standalone";
import Note from "App/Models/note.model";

export class NotesRepository {
    async index() {
        return Note.all();
    }
    async store({ title, content, categoryId }: { title: string, content: string, categoryId: number }) {
        const note = new Note();
        note.title = title;
        note.content = content;
        note.categoryId = categoryId;

        await note.save();
        return note
    }

    async show({ id }: { id: number }) {
        try {
            const note = await Note.findOrFail(id);
            return note;
        } catch (error) {
            throw new Exception('No se encontró la nota', 404)
        }
    }

    async update({ title, content, id }: { title: string, content: string, id: number }) {
        try {
            const note = await Note.findOrFail(id);
            note.title = title;
            note.content = content;

            await note.save();

            return note;
        } catch (error) {
            throw new Exception('Hubo un problema al actualizar', 400)
        }
    }

    async destroy({ id }: { id: number }) {
        try {
            const note = await Note.findOrFail(id);
            await note.delete();
            return { message: 'Nota eliminada' }
        } catch (error) {
            throw new Exception('Hubo un problema', 400)
        }
    }
}