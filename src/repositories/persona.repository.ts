import {Getter, inject} from '@loopback/core';
import {DefaultCrudRepository, HasManyRepositoryFactory, repository} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Persona, PersonaRelations, Solicitud} from '../models';
import {SolicitudRepository} from './solicitud.repository';

export class PersonaRepository extends DefaultCrudRepository<
  Persona,
  typeof Persona.prototype.id,
  PersonaRelations
> {

  public readonly solicitudes: HasManyRepositoryFactory<Solicitud, typeof Persona.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('SolicitudRepository') protected pedidoRepositoryGetter: Getter<SolicitudRepository>,
  ) {
    super(Persona, dataSource);
    this.solicitudes = this.createHasManyRepositoryFactoryFor('solicitudes', pedidoRepositoryGetter,);
    this.registerInclusionResolver('solicitudes', this.solicitudes.inclusionResolver);
  }
}
