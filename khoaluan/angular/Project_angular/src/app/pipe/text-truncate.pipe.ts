import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'textTruncate'
})
export class TextTruncatePipe implements PipeTransform {

    transform(value: any, begin?: number, end?: number, status?: boolean): any {
        if (status === false) {
            return value;
        }
        if (value) {
            return value.substr(begin, end) + '...';
        }
        return value;
    }

}
