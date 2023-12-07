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
})
