import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Context } from 'telegraf';
import { TelegrafExecutionContext } from 'nestjs-telegraf';

import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class UserExistenceGuard implements CanActivate {
  constructor(private readonly prisma: PrismaService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const ctx = TelegrafExecutionContext.create(context);
    const { from } = ctx.getContext<Context>();

    if (from) {
      const telegramId = from.id;

      const user = await this.prisma.user.findUnique({
        where: { telegramId },
      });

      if (!user) {
        await this.prisma.user.create({
          data: {
            telegramId,
            username: from.username || null,
          },
        });
      }
    }

    return true;
  }
}
