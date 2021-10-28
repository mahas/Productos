import { /* inject, */ BindingScope, injectable} from '@loopback/core';

//Generador de passwords(Instalar Password Generator, npm i password-generator)
const generador = require("password-generator");

//Importar encriptador de claves (instalar Crypto Js, npm i crypto-js)
const cryptoJS = require("crypto-js")

@injectable({scope: BindingScope.TRANSIENT})
export class AutenticacionService {
  constructor(/* Add @inject to inject parameters */) { }

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
    let claveCifrada = cryptoJS.MD5("clave").toString();
    return claveCifrada;
  }

}
