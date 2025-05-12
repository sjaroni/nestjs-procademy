import { Injectable, Inject } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
import { PaginationQueryDto } from './dto/pagination-query.dto';
import {
  FindManyOptions,
  FindOptionsWhere,
  ObjectLiteral,
  Repository,
} from 'typeorm';
import { Paginated } from './pagination.interface';

@Injectable()
export class PaginationProvider<T extends ObjectLiteral> {
  constructor(@Inject(REQUEST) private readonly request: Request) {}

  public async paginateQuery(
    paginationQueryDto: PaginationQueryDto,
    repository: Repository<T>,
    where?: FindOptionsWhere<T>,
    relations?: string[],
  ): Promise<Paginated<T>> {
    const findOptions: FindManyOptions<T> = {
      skip: (paginationQueryDto.page! - 1) * paginationQueryDto.limit!,
      take: paginationQueryDto.limit,
    };

    if (where) {
      findOptions.where = where;
    }
    if (relations) {
      findOptions.relations = relations;
    }

    const result = await repository.find(findOptions);
    const totalItems = await repository.count();
    const totalPages = Math.ceil(totalItems / (paginationQueryDto.limit ?? 1));
    const currentPage = paginationQueryDto.page ?? 1;
    const nextPage = currentPage === totalPages ? currentPage : currentPage + 1;
    const prevPage = currentPage === 1 ? currentPage : currentPage - 1;
    const baseURL = this.request.protocol + '://' + this.request.headers.host + '/';
    const newURL = new URL(this.request.url, baseURL);
    //  + this.request.originalUrl;
    // console.log(newURL);
    

    const response: Paginated<T> = {
      data: result,
      meta: {
        itemsPerPage: paginationQueryDto.limit ?? 10, // Default to 10 if undefined
        totalItems: totalItems,
        currentPage: currentPage,
        totalPages: totalPages,
      },
      links: {
        first: `${newURL.origin}${newURL.pathname}?limit=${paginationQueryDto.limit}&page=1`,
        last: `${newURL.origin}${newURL.pathname}?limit=${paginationQueryDto.limit}&page=${totalPages}`,
        current: `${newURL.origin}${newURL.pathname}?limit=${paginationQueryDto.limit}&page=${currentPage}`,
        next: `${newURL.origin}${newURL.pathname}?limit=${paginationQueryDto.limit}&page=${nextPage}`,
        previous: `${newURL.origin}${newURL.pathname}?limit=${paginationQueryDto.limit}&page=${prevPage}`,
      },
    };

    return response;
  }
}
