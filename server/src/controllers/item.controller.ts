import { Request, Response, NextFunction } from 'express';
import { Item, ItemPriority } from '../models/item.model.js';
import { AppError } from '../middleware/errorHandler.js';

export const getItems = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { completed, priority } = req.query;
    const filter: Record<string, unknown> = {};

    if (completed !== undefined) {
      filter.completed = completed === 'true';
    }
    if (priority && ['low', 'medium', 'high'].includes(priority as string)) {
      filter.priority = priority as ItemPriority;
    }

    const items = await Item.find(filter).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      data: items,
      count: items.length,
    });
  } catch (error) {
    next(error);
  }
};

export const getItemById = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;
    const item = await Item.findById(id);

    if (!item) {
      throw new AppError(`Item with ID ${id} not found`, 404);
    }

    res.status(200).json({
      success: true,
      data: item,
    });
  } catch (error) {
    next(error);
  }
};

export const createItem = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { title, description, priority, completed } = req.body;

    if (!title || typeof title !== 'string' || !title.trim()) {
      throw new AppError('Title is required and must be a non-empty string', 400);
    }

    const newItem = await Item.create({
      title: title.trim(),
      description: description ? description.trim() : '',
      priority: priority || 'medium',
      completed: completed === true,
    });

    res.status(201).json({
      success: true,
      data: newItem,
      message: 'Item created successfully',
    });
  } catch (error) {
    next(error);
  }
};

export const updateItem = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const item = await Item.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });

    if (!item) {
      throw new AppError(`Item with ID ${id} not found`, 404);
    }

    res.status(200).json({
      success: true,
      data: item,
      message: 'Item updated successfully',
    });
  } catch (error) {
    next(error);
  }
};

export const deleteItem = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;
    const item = await Item.findByIdAndDelete(id);

    if (!item) {
      throw new AppError(`Item with ID ${id} not found`, 404);
    }

    res.status(200).json({
      success: true,
      message: 'Item deleted successfully',
      data: { id },
    });
  } catch (error) {
    next(error);
  }
};
