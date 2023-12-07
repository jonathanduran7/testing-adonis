import { BaseModel } from '@ioc:Adonis/Lucid/Orm'
import CamelCaseNamingStrategy from '../Strategies/camel-case-naming.strategy'

export default class AppBaseModel extends BaseModel {
  public static namingStrategy = new CamelCaseNamingStrategy()
}
