import { Exception } from "@adonisjs/core/build/standalone";
import Category from "App/Models/category.model";

export class CategoriesRepository {
    async index() {
        return Category.all();
    }

    async store({ name }: { name: string }) {
        const category = new Category();
        category.name = name;

        await category.save();
        return category
    }

    async show({ id }: { id: number }) {
        try {
            const category = await Category.findOrFail(id);
            return category;
        } catch {
            throw new Exception('No se encontró la categoría', 404)
        }
    }

    async update({ name, isActive, id }: { name: string, id: number, isActive: boolean }) {
        try {
            const category = await Category.findOrFail(id);

            category.name = name;
            category.isActive = isActive;

            await category.save();

            return category;
        } catch (error) {
            throw new Exception('Hubo un problema al actualizar', 400)
        }
    }

    async destroy({ id }: { id: number }) {
        try {
            const category = await Category.findOrFail(id);
            await category.delete();
            return { message: 'Categoría eliminada' }
        } catch (error) {
            throw new Exception('Hubo un problema', 400)
        }
    }
}