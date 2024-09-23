import { InjectBot, Start, Update } from 'nestjs-telegraf';
import { Telegraf } from 'telegraf';

import { PrismaService } from '../prisma/prisma.service';

import { Context } from '../interfaces/context.interface';

@Update()
export class BotService {
  constructor(
    @InjectBot() private readonly bot: Telegraf<Context>,
    private readonly prisma: PrismaService,
  ) {}

  @Start()
  startCommand(ctx) {
    ctx.reply('Welcome to the bot!');
  }
}
