import { UseGuards } from '@nestjs/common';
import { v4 } from 'uuid';
import {
  Command,
  Ctx,
  InjectBot,
  Message,
  Start,
  Update,
} from 'nestjs-telegraf';
import { Telegraf } from 'telegraf';

import { PrismaService } from '../prisma/prisma.service';

import { UserExistenceGuard } from '@guards/user-existence.guard';

import { MessageTransformPipe } from '@pipes/message-transform.pipe';

import { ChatBotException } from '@exceptions/chat-bot.exception';

import { Context } from '@interfaces/context.interface';

@Update()
export class BotService {
  constructor(
    @InjectBot() private readonly bot: Telegraf<Context>,
    private readonly prisma: PrismaService,
  ) {}

  @Start()
  @UseGuards(UserExistenceGuard)
  startCommand(ctx) {
    ctx.reply('Welcome to the bot!');
  }

  @Command('savelink')
  @UseGuards(UserExistenceGuard)
  async saveLink(
    @Ctx() ctx: Context,
    @Message('text', new MessageTransformPipe())
    transformedMessage: { name?: string; url?: string; error?: string },
  ) {
    try {
      if (transformedMessage.error) {
        throw new ChatBotException(transformedMessage.error);
      }

      const { name, url } = transformedMessage;

      const link = await this.prisma.link
        .create({
          data: {
            userId: ctx.from.id,
            name,
            url,
            code: v4(),
          },
        })
        .then((data) => data);

      void ctx.reply(`Link saved! Your code: ${link.code}`);
    } catch (error) {
      console.error(error);

      void ctx.reply('Failed to save link. ' + error.message);
      void ctx.reply('Usage: /savelink <name> <url>');
    }
  }
}
