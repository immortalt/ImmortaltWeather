import { Pipe, PipeTransform } from '@angular/core';
import { AppConfig } from '../app/app.config';

/**
 * 温度格式化器
 */
@Pipe({ name: 'TempPipe' })
export class TempPipe implements PipeTransform {
    transform(value: number): string {
        if (AppConfig.tempFormat != 1) {
            return (32 + value * 1.8).toFixed(2) + "°F";
        } else {
            return value.toFixed(2) + "°C";
        }
    }
}