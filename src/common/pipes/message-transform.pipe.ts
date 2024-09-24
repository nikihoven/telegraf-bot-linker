import { Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class TwoOptionsMessageTransformPipe implements PipeTransform {
  transform(value: any) {
    if (typeof value !== 'string') {
      return { error: 'Message must be a string' };
    }

    const text = value.split(' ').slice(1);

    if (text.length < 2) {
      return { error: 'No required params found' };
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

@Injectable()
export class OneOptionMessageTransformPipe implements PipeTransform {
  transform(value: any) {
    if (typeof value !== 'string') {
      return { error: 'Message must be a string' };
    }

    const text = value.split(' ').slice(1);

    if (text.length < 1) {
      return { error: 'No required params found' };
    }

    const [code] = text;

    return { code };
  }
}
