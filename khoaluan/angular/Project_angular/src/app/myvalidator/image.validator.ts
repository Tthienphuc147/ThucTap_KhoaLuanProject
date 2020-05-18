import { FormControl, ValidatorFn, AbstractControl } from '@angular/forms';

export class ImageValidator {
    static imageSizeValidator(maxSize: number): ValidatorFn {
        return (control: AbstractControl): { [key: string]: any } | null => {
            if (control.value) {
                if (typeof control.value === 'string') {
                    return null;
                }
                return control.value.size > maxSize &&
                    typeof control.value === 'string'
                    ? { maxSize: true }
                    : null;
            }
            return null;
        };
    }

    static imageExtensionValidator(
        whiteListImageExtension: Array<string>
    ): ValidatorFn {
        return (control: AbstractControl): { [key: string]: any } | null => {
            if (control.value) {
                if (typeof control.value === 'string') {
                    return null;
                }
                return whiteListImageExtension.includes(control.value.type)
                    ? null
                    : { extension: true };
            }
            return null;
        };
    }
}
