import {Directive, ElementRef, HostBinding, HostListener, OnInit, Renderer2} from '@angular/core';


@Directive({
    selector: '[appDropdown]'
})
export class DropdownDirective implements OnInit {

    @HostBinding('class.open') open: boolean = false;


    constructor(private elementRef: ElementRef, private rendere: Renderer2) {}
    ngOnInit(): void {}



    @HostListener('click')
    toggleDropdown(event: Event) {
        this.open = !this.open;
    }




}
