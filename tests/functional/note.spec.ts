import { test } from '@japa/runner'

test.group('Notes', () => {
  test('display all notes', async ({ client }) => {
    const response = await client.get('/api/v1/notes')

    response.assertStatus(200)
  })

  test('create a new note', async ({ client }) => {

    const newNote = {
      title: 'New note',
      content: 'This is a new note',
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
    const response = await client.get('/api/v1/notes/1')

    response.assertStatus(404)
    response.assertBodyContains(
      { message: 'No se encontró la nota' }
    )
  })

  test('show a note', async ({ client }) => {
    const response = await client.post('/api/v1/notes')
      .accept('application/json')
      .form({
        title: 'New note',
        content: 'This is a new note',
        categoryId: '1'
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
