import { column, BelongsTo, belongsTo, hasMany, HasMany } from '@ioc:Adonis/Lucid/Orm'
import AppBaseModel from './app-base.model'
import { DateTime } from 'luxon'
import Category from './category.model'

export default class Note extends AppBaseModel {
    public static table = 'notes'

    @column({ isPrimary: true })
    public id: number

    @column()
    public title: string

    @column()
    public content: string

    @column()
    public categoryId: number

    @column.dateTime({ autoCreate: true })
    public createdAt: DateTime

    @column.dateTime({ autoCreate: true, autoUpdate: true })
    public updatedAt: DateTime

    @belongsTo(() => Category)
    public category: BelongsTo<typeof Category>

}