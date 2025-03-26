import { Request, Response } from 'express';
import { HttpRequest } from '@/shared/presentation/types/http';
import { Controller } from '@/shared/presentation/protocols/controller';

interface CustomRequest extends Request {
  file?: any;
}

export const expressAdapter = (controller: Controller) => {
  return async (req: CustomRequest, res: Response) => {
    const httpRequest: HttpRequest<any> = {
      body: req.body,
      headers: req.headers,
      params: req.params,
      query: req.query,
      file: req.file,
    };

    const httpResponse = await controller.handle(httpRequest);
    if (httpResponse.statusCode >= 200 && httpResponse.statusCode <= 299) {
      res.status(httpResponse.statusCode).json(httpResponse.body);
    } else {
      res.status(httpResponse.statusCode).json({
        error: httpResponse.body.message,
      });
    }
  };
};
