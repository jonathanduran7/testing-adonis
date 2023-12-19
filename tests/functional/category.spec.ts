import { test } from '@japa/runner'
import Note from 'App/Models/note.model'
import { CategoryFactory } from 'Database/factories'
import Category from 'App/Models/category.model'

test.group('Categories', () => {
  test('display empty categories', async ({ client }) => {
    const response = await client.get('/api/v1/categories')
    response.assertStatus(200)
    response.assertBodyContains({ message: 'No hay categorías' })
  })

  test('display all categories', async ({ client, assert }) => {
    await CategoryFactory.query().createMany(5)
    const response = await client.get('/api/v1/categories')
    
    const categories = await Category.query().limit(5).orderBy('id', 'asc')

    response.assertStatus(200)
    assert.containsSubset(response.body(),categories.map(category => category.toJSON()))
  })

  test('field name is required', async ({ client}) => {
    const newCategory = {
      name: '',
    }

    const response = await client.post('/api/v1/categories')
      .accept('application/json')
      .form(newCategory)

    response.assertStatus(422)
    response.assertTextIncludes('El campo es requerido')
  })

  test('create a category', async ({ client }) => {
    const newCategory = {
      name: 'New category',
    }

    const response = await client.post('/api/v1/categories')
      .accept('application/json')
      .form(newCategory)

    response.assertStatus(200)
    response.assertBodyContains(newCategory)
  })

  test("don't show category if it's not exist", async ({ client }) => {
    const response = await client.get('/api/v1/categories/10')

    response.assertStatus(404)
    response.assertBodyContains(
      { message: 'No se encontró la categoría' }
    )
  })

  test('show a category', async ({ client }) => {
    const response = await client.post('/api/v1/categories')
      .accept('application/json')
      .form({
        name: 'New category',
      })

    const category = response.body()

    const showResponse = await client.get(`/api/v1/categories/${category.id}`)

    showResponse.assertStatus(200)
    showResponse.assertBodyContains({
      name: category.name,
    })
  })

  test('update a category', async ({ client }) => {
    const response = await client.post('/api/v1/categories')
      .accept('application/json')
      .form({
        name: 'New category',
      })

    const category = response.body()

    const updateResponse = await client.put(`/api/v1/categories/${category.id}`)
      .accept('application/json')
      .form({
        name: 'Updated category',
      })

    updateResponse.assertStatus(200)
    updateResponse.assertBodyContains({
      name: 'Updated category',
    })
  })

  test('delete a category', async ({ client }) => {
    const response = await client.post('/api/v1/categories')
      .accept('application/json')
      .form({
        name: 'New category',
      })

    const category = response.body()

    const deleteResponse = await client.delete(`/api/v1/categories/${category.id}`)

    deleteResponse.assertStatus(200)
    deleteResponse.assertBodyContains({
      message: 'Categoría eliminada',
    })
  })

  test('show error if category no exist when delete', async ({ client }) => {
    const deleteResponse = await client.delete(`/api/v1/categories/10`)

    deleteResponse.assertStatus(400)
    deleteResponse.assertBodyContains({
      message: 'Hubo un problema al eliminar la categoria',
    })
  })

  test('get notes from category', async ({ client }) => {

    await client.post('/api/v1/notes')
      .accept('application/json')
      .form({
        title: 'Navidad',
        content: 'Comprar pan dulce y sidra',
        categoryId: 1
      })

    await client.post('/api/v1/notes')
      .accept('application/json')
      .form({
        title: 'Cumpleaños',
        content: 'Comprar torta',
        categoryId: 1
      })

    await client.post('/api/v1/notes')
      .accept('application/json')
      .form({
        title: 'Tours',
        content: 'Alquilar auto para el tour',
        categoryId: 2
      })

    const getNotesResponse = await client.get(`/api/v1/categories/${2}/notes`)

    getNotesResponse.assertStatus(200)

    const notes = getNotesResponse.body() as Note[]

    if (notes.every(note => { note.categoryId === 2 })) {
      throw new Error('Notes not belong to category')
    }
  })
})
