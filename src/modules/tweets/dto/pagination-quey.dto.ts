import { IsNumber, IsOptional, IsPositive } from "class-validator";

export class PaginationQueryDTO {
    @IsNumber()
    @IsPositive()
    @IsOptional()
    limit: number;

    @IsNumber()
    @IsPositive()
    @IsOptional()
    offset: number;

}