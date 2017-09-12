import { Pipe, PipeTransform } from '@angular/core';
import { AppConfig } from '../app/app.config';

/**
 * 温度格式化器
 */
@Pipe({ name: 'TempPipe' })
export class TempPipe implements PipeTransform {
    transform(value: number): string {
        if (AppConfig.tempFormat != 1) {
            return (value * 33.8) + "°F";
        } else {
            return value + "°C";
        }
    }
}