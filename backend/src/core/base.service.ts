import { PrismaClient } from "@prisma/client";

abstract class BaseService<T, CreateDTO, UpdateDTO> {
  constructor(
    protected prisma: PrismaClient,
    protected readonly modelName: keyof PrismaClient
  ) {}

  async findAll(): Promise<T[]> {
    return (this.prisma[this.modelName] as any).findMany({
      include: this.defaultIncludes()
    });
  }

  async findOne(id: number): Promise<T | null> {
    return (this.prisma[this.modelName] as any).findUnique({
      where: { id },
      include: this.defaultIncludes()
    });
  }

  async create(data: CreateDTO): Promise<T> {
    return (this.prisma[this.modelName] as any).create({
      data,
      include: this.defaultIncludes()
    });
  }

  async update(id: number, data: UpdateDTO): Promise<T | null> {
    return (this.prisma[this.modelName] as any).update({
      where: { id },
      data,
      include: this.defaultIncludes()
    });
  }

  async delete(id: number): Promise<void> {
    await (this.prisma[this.modelName] as any).delete({
      where: { id }
    });
  }

  protected defaultIncludes(): object {
    return {};
  }
}

export default BaseService;