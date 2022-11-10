import { Injectable } from '@nestjs/common';
import { Repository, DataSource, Entity } from 'typeorm';

@Injectable()
export class BaseRepository<Entity> extends Repository<Entity> {
  constructor(private dataSource: DataSource) {
    super(Entity, dataSource.manager);
  }
  gatA() {
    return 1;
  }
}
