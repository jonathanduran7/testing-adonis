import Category from "App/Models/category.model";

export class CategoriesRepository {
    async index() {
        return Category.all();
    }
    async store({name}: {name: string}) {
        const category = new Category();
        category.name = name;

        await category.save();
        return category
    }
    async show({id}: {id: number}) {
        return Category.findOrFail(id);
    }
    async update({name, isActive ,id}: {name: string, id: number, isActive: boolean}) {
        const category = await Category.findOrFail(id);

        category.name = name;
        category.isActive = isActive;

        await category.save();

        return category;
    }
    async destroy({id}: {id: number}) {
        return Category.query().where('id', id).delete();
    }
}