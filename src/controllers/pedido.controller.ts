import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where
} from '@loopback/repository';
import {
  del, get,
  getModelSchemaRef, param, patch, post, put, requestBody,
  response
} from '@loopback/rest';
import {Solicitud} from '../models';
import {SolicitudRepository} from '../repositories';

export class SolicitudController {
  constructor(
    @repository(SolicitudRepository)
    public pedidoRepository: SolicitudRepository,
  ) { }

  @post('/solicitudes')
  @response(200, {
    description: 'Solicitud model instance',
    content: {'application/json': {schema: getModelSchemaRef(Solicitud)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Solicitud, {
            title: 'NewSolicitud',
            exclude: ['id'],
          }),
        },
      },
    })
    pedido: Omit<Solicitud, 'id'>,
  ): Promise<Solicitud> {
    return this.pedidoRepository.create(pedido);
  }

  @get('/solicitudes/count')
  @response(200, {
    description: 'Solicitud model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Solicitud) where?: Where<Solicitud>,
  ): Promise<Count> {
    return this.pedidoRepository.count(where);
  }

  @get('/solicitudes')
  @response(200, {
    description: 'Array of Solicitud model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Solicitud, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Solicitud) filter?: Filter<Solicitud>,
  ): Promise<Solicitud[]> {
    return this.pedidoRepository.find(filter);
  }

  @patch('/solicitudes')
  @response(200, {
    description: 'Solicitud PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Solicitud, {partial: true}),
        },
      },
    })
    pedido: Solicitud,
    @param.where(Solicitud) where?: Where<Solicitud>,
  ): Promise<Count> {
    return this.pedidoRepository.updateAll(pedido, where);
  }

  @get('/solicitudes/{id}')
  @response(200, {
    description: 'Solicitud model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Solicitud, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Solicitud, {exclude: 'where'}) filter?: FilterExcludingWhere<Solicitud>
  ): Promise<Solicitud> {
    return this.pedidoRepository.findById(id, filter);
  }

  @patch('/solicitudes/{id}')
  @response(204, {
    description: 'Solicitud PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Solicitud, {partial: true}),
        },
      },
    })
    pedido: Solicitud,
  ): Promise<void> {
    await this.pedidoRepository.updateById(id, pedido);
  }

  @put('/solicitudes/{id}')
  @response(204, {
    description: 'Solicitud PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() pedido: Solicitud,
  ): Promise<void> {
    await this.pedidoRepository.replaceById(id, pedido);
  }

  @del('/solicitudes/{id}')
  @response(204, {
    description: 'Solicitud DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.pedidoRepository.deleteById(id);
  }
}
