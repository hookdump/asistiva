import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appResizer]'
})
export class DynamicResizerDirective {
  navbar = {
    height: 0
  };

  constructor(private el: ElementRef) {
    console.log('resizer init');
  }

  ngAfterViewChecked() {
    window.dispatchEvent(new Event('resize'));
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.refreshSize(this.el.nativeElement, event);
  }

  refreshSize(parent: HTMLElement, event: any) {
    let current = {
      height: event.target.innerHeight,
      width: event.target.innerWidth,
      ratio: event.target.innerWidth / event.target.innerHeight
    };
    let newDim = {
      height: null,
      width: null
    };
    // Start maximizing Height, then adjust Width.
    newDim.height = current.height - this.navbar.height;
    newDim.width = Math.floor(newDim.height * 1.415); // 1020x800

    // Tall window? Start maximizing Width, then adjust Height.
    if (current.ratio < 1.275 || (newDim.width > current.width)) {
      newDim.width = current.width - 0;
      newDim.height = Math.floor(newDim.width / 1.415);
    }

    this.el.nativeElement.style.width = `${newDim.width}px`;
    this.el.nativeElement.style.height = `${newDim.height}px`;
  }
}
