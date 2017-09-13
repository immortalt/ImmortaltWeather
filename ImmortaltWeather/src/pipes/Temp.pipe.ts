import { Pipe, PipeTransform } from '@angular/core';
import { AppConfig } from '../app/app.config';

/**
 * 温度格式化器
 */
@Pipe({ name: 'TempPipe' })
export class TempPipe implements PipeTransform {
    transform(value: any): string {
        value = +value;
        if (AppConfig.tempFormat != 1) {
            if (value != null) {
                return (32 + value * 1.8).toFixed(2) + "°F";
            } else {
                return "";
            }
        } else {
            if (value != null) {
                value = +value.toFixed(2);
                return `${value}°C`;
            } else {
                return "";
            }
        }
    }
}