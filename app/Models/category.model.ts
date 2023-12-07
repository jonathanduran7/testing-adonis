import { column, hasMany, HasMany } from '@ioc:Adonis/Lucid/Orm'
import AppBaseModel from './app-base.model'
import { DateTime } from 'luxon'
import Note from './note.model'

export default class Category extends AppBaseModel {
    public static table = 'categories'

    @column({ isPrimary: true })
    public id: number

    @column()
    public name: string

    @column()
    public isActive: boolean
    
    @column.dateTime({ autoCreate: true })
    public createdAt: DateTime

    @column.dateTime({ autoCreate: true, autoUpdate: true })
    public updatedAt: DateTime

    @hasMany(() => Note)
    public notes: HasMany<typeof Note>
}