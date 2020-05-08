import { AbstractControl, ValidatorFn } from '@angular/forms';

export class ConfirmPassword {
    static confirmPassword(): ValidatorFn {
        return (control: AbstractControl): { [key: string]: any } | null => {
            return control.parent
                ? control.parent.controls['password'].value !== control.value
                    ? { passwordnotmatch: true }
                    : null
                : null;
        };
    }
}
