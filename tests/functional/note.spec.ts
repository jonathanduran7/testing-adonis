import { test } from '@japa/runner'

test.group('Notes', () => {
  test('display all notes', async ({ client }) => {
    const response = await client.get('/api/v1/notes')

    response.assertStatus(200)
  })

  test('create a new note', async ({ client }) => {

    const newNote = {
      title: 'Compras navidad',
      content: 'Comprar regalos de navidad para rocco',
      categoryId: '1'
    }


    const response = await client.post('/api/v1/notes')
      .accept('application/json')
      .form(newNote)

    response.assertStatus(200)
    response.assertBodyContains({
      title: newNote.title,
      content: newNote.content,
      categoryId: newNote.categoryId
    })
  })

  test("don't show note if it's not exist", async ({ client }) => {
    const response = await client.get('/api/v1/notes/10')

    response.assertStatus(404)
    response.assertBodyContains(
      { message: 'No se encontró la nota' }
    )
  })

  test('show a note', async ({ client }) => {
    const response = await client.post('/api/v1/notes')
      .accept('application/json')
      .form({
        title: 'Buscar alquiler',
        content: 'Buscar alquiler para la casa de la playa',
        categoryId: 2
      })

    const note = response.body()

    const showResponse = await client.get(`/api/v1/notes/${note.id}`)

    showResponse.assertStatus(200)
    showResponse.assertBodyContains({
      title: note.title,
      content: note.content,
      categoryId: Number(note.categoryId)
    })
   
  })
})
