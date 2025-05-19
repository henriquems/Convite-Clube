import { Usuario } from '@conviteclube/core';
import { HttpException, Injectable, NestMiddleware } from '@nestjs/common';
import { AuthPrisma } from './auth.prisma';
import * as jwt from 'jsonwebtoken'

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private readonly repositorioAuth: AuthPrisma){}
  
  async use(req: any, res: any, next: () => void) {
    try {
      const token = req.headers.authorization?.replace('Bearer ', '')
    
      if(!token) {
        throw new HttpException('Token não informado', 401)
      }

      const playload = jwt.verify(token, process.env.JWT_SECRET!) as Usuario
      if(!playload) {
        throw new HttpException('Token inválido', 401)
      }
      
      const usuario = await this.repositorioAuth.logar(playload.login)
      delete usuario.senha
      if(!usuario) {
        throw new HttpException('Usuário não encontrado', 401)
      }
      
      req.usuario = usuario;

      next();
    } catch (error) {
      throw new HttpException('Token inválido', 401)
    }
  }
}