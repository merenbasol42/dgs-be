import { Request, Response } from 'express';
import { UserModel, User } from '../models/User';

export class UserController {
  // Tüm kullanıcıları getir
  static getAllUsers(req: Request, res: Response): void {
    try {
      const users = UserModel.findAll();
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json({ 
        message: 'Kullanıcılar getirilirken bir hata oluştu',
        error: error instanceof Error ? error.message : 'Bilinmeyen bir hata'
      });
    }
  }

  // Yeni kullanıcı oluştur
  static createUser(req: Request, res: Response): void {
    try {
      const { username, email, password } = req.body;

      // Basit doğrulama
      if (!username || !email || !password) {
        res.status(400).json({ message: 'Tüm alanlar zorunludur' });
        return;
      }

      const newUser = UserModel.create({ username, email, password });
      res.status(201).json(newUser);
    } catch (error) {
      res.status(500).json({ 
        message: 'Kullanıcı oluşturulurken bir hata oluştu',
        error: error instanceof Error ? error.message : 'Bilinmeyen bir hata'
      });
    }
  }

  // Kullanıcı detaylarını getir
  static getUserById(req: Request, res: Response): void {
    try {
      const { id } = req.params;
      const user = UserModel.findById(id);

      if (!user) {
        res.status(404).json({ message: 'Kullanıcı bulunamadı' });
        return;
      }

      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ 
        message: 'Kullanıcı getirilirken bir hata oluştu',
        error: error instanceof Error ? error.message : 'Bilinmeyen bir hata'
      });
    }
  }

  // Kullanıcı güncelle
  static updateUser(req: Request, res: Response): void {
    try {
      const { id } = req.params;
      const userData: Partial<User> = req.body;

      const updatedUser = UserModel.update(id, userData);

      if (!updatedUser) {
        res.status(404).json({ message: 'Kullanıcı bulunamadı' });
        return;
      }

      res.status(200).json(updatedUser);
    } catch (error) {
      res.status(500).json({ 
        message: 'Kullanıcı güncellenirken bir hata oluştu',
        error: error instanceof Error ? error.message : 'Bilinmeyen bir hata'
      });
    }
  }

  // Kullanıcı sil
  static deleteUser(req: Request, res: Response): void {
    try {
      const { id } = req.params;
      const isDeleted = UserModel.delete(id);

      if (!isDeleted) {
        res.status(404).json({ message: 'Kullanıcı bulunamadı' });
        return;
      }

      res.status(200).json({ message: 'Kullanıcı başarıyla silindi' });
    } catch (error) {
      res.status(500).json({ 
        message: 'Kullanıcı silinirken bir hata oluştu',
        error: error instanceof Error ? error.message : 'Bilinmeyen bir hata'
      });
    }
  }
}
