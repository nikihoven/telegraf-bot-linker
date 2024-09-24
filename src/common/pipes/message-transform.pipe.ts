import { Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class MessageTransformPipe implements PipeTransform {
  transform(value: any) {
    if (typeof value !== 'string') {
      return { error: 'Message must be a string' };
    }

    const text = value.split(' ').slice(1);

    if (text.length < 2) {
      return { error: 'Usage: /savelink <name> <url>' };
    }

    const [name, url] = text;

    try {
      const validatedUrl = new URL(url).href;

      return { name, url: validatedUrl };
    } catch (error) {
      console.error(error);

      return { error: 'Invalid URL format' };
    }
  }
}
