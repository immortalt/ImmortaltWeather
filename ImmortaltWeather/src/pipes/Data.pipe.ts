import { Pipe, PipeTransform } from '@angular/core';

/**
 * 数据格式化器
 */
@Pipe({ name: 'DataPipe' })
export class DataPipe implements PipeTransform {
    transform(value: any): string {
        if (value == null) { return "暂无数据"; } else {
            return value;
        }
    }
}