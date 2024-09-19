import { InjectBot, Start, Update } from 'nestjs-telegraf';
import { Telegraf } from 'telegraf';

import { PrismaService } from '../prisma/prisma.service';

@Update()
export class BotService {
  constructor(
    @InjectBot() private readonly bot: Telegraf,
    private readonly prisma: PrismaService,
  ) {}

  @Start()
  startCommand(ctx) {
    ctx.reply('Welcome to the bot!');
  }
}
