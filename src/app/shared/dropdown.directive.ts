import { Directive, HostBinding, HostListener } from "@angular/core";

@Directive({
    selector: '[app-Dropdown]'
})
export class DropdownDirective{

    @HostBinding('class.open') isOpen=false;
    @HostListener('click') toggleOpen(){
        this.isOpen=!this.isOpen;
    }
}