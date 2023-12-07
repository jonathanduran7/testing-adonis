import { test } from '@japa/runner'

test.group('Categories', () => {
  test('display all categories', async ({ client }) => {
    const response = await client.get('/api/v1/categories')
    response.assertStatus(200)
  })

  test('create a new category', async ({ client }) => {
    const newCategory = {
      name: 'New category',
    }

    const response = await client.post('/api/v1/categories')
      .accept('application/json')
      .form(newCategory)

    response.assertStatus(200)
    response.assertBodyContains({
      name: newCategory.name,
    })
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
})
