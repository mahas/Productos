import {
  repository
} from '@loopback/repository';
import {
  get,
  getModelSchemaRef, param
} from '@loopback/rest';
import {
  Persona, Solicitud
} from '../models';
import {SolicitudRepository} from '../repositories';

export class SolicitudPersonaController {
  constructor(
    @repository(SolicitudRepository)
    public pedidoRepository: SolicitudRepository,
  ) { }

  @get('/solicitudes/{id}/persona', {
    responses: {
      '200': {
        description: 'Persona belonging to Solicitud',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Persona)},
          },
        },
      },
    },
  })
  async getPersona(
    @param.path.string('id') id: typeof Solicitud.prototype.id,
  ): Promise<Persona> {
    return this.pedidoRepository.persona(id);
  }
}
