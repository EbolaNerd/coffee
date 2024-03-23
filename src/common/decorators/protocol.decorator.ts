import { ExecutionContext, createParamDecorator } from "@nestjs/common";
import { Request } from "express";

export const Protocol = createParamDecorator(
  (defaultValue: string, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest<Request>()
    console.log({defaultValue})
    return request.protocol
  }
)