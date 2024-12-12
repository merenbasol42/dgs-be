import { Request, Response, NextFunction } from 'express';

// Merkezi hata yakalama middleware'i
export const errorHandler = (
  err: Error, 
  req: Request, 
  res: Response, 
  next: NextFunction
) => {
  console.error(`[Error] ${new Date().toISOString()} - ${err.message}`);

  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode).json({
    status: 'error',
    message: err.message || 'Beklenmedik bir hata oluştu',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
};

// Bulunamayan route için middleware
export const notFoundHandler = (req: Request, res: Response, next: NextFunction) => {
  res.status(404).json({
    status: 'error',
    message: `${req.originalUrl} - Bu endpoint bulunamadı`
  });
};
