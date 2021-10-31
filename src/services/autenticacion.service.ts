import { /* inject, */ BindingScope, injectable} from '@loopback/core';
import {repository} from '@loopback/repository';
import {Llaves} from '../config/llaves';
import {Persona} from '../models';
import {PersonaRepository} from '../repositories';

//Creador de tokens
const jwt = require("jsonwebtoken");

//Generador de passwords(Instalar Password Generator, npm i password-generator)
const generador = require("password-generator");

//Importar encriptador de claves (instalar Crypto Js, npm i crypto-js)
const cryptoJS = require("crypto-js")

@injectable({scope: BindingScope.TRANSIENT})
export class AutenticacionService {
  constructor(
    @repository(PersonaRepository)
    public personaRepository: PersonaRepository
  ) { }

  /*
   * Add service methods here
   */

  //Para crear una clave  (cantidad de dígitos, fácil o difícil)
  GenerarClave() {
    let clave = generador(8, false);
    return clave;

  }
  //Para cifrar la clave generada
  CifrarClave(clave: string) {
    let claveCifrada = cryptoJS.MD5(clave).toString();
    return claveCifrada;
  }

  IdentificarPersona(usuario: string, clave: string) {
    try {
      let p = this.personaRepository.findOne({where: {email: usuario, clave: clave}});
      if (p) {
        return p;
      }
      return false;
    } catch {
      return false;

    }

  }

  GenerarTokenJWT(persona: Persona) {
    let token = jwt.sign({
      data: {
        id: persona.id,
        email: persona.email,
        nombre: persona.nombres + " " + persona.apellidos
        //generar rol acá
      }

    },
      Llaves.claveJWT);
    return token;
  }

  ValidarTokenJWT(token: string) {
    try {
      let datos = jwt.verify(token, Llaves.claveJWT)
      return datos;
    } catch {
      return false;
    }
  }


}
