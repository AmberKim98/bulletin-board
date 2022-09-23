import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export class CustomValidators {
    static MatchPasswordValidator(source: string, target: string): ValidatorFn {
        return (control: AbstractControl): ValidationErrors | null => {
            const sourceCtrl = control.get(source);
            const targetCtrl = control.get(target);
            if(sourceCtrl?.value !== targetCtrl?.value) {
                return { unmatch: true }
            }
            else return null;
        }  
    }
}