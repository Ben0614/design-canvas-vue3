/// <reference types="vite/client" />
declare module "vue-draggable-resizable" {
  import { DefineComponent } from "vue";

  const VueDraggableResizable: DefineComponent<
    {
      w: number;
      h: number;
      x: number;
      y: number;
      z: number | string;
      dragHandle: string;
      dragCancel: string;
      axis: string;
      grid: [number, number];
      parent: boolean;
      scale: number;
      minWidth: number;
      minHeight: number;
      maxWidth: number;
      maxHeight: number;
      active: boolean;
      preventDeactivation: boolean;
      draggable: boolean;
      resizable: boolean;
      lockAspectRatio: boolean;
      disableUserSelect: boolean;
    },
    {},
    {
      activated: (val: boolean) => void;
      dragStart: (x: number, y: number) => void;
      resize: (x: number, y: number, width: number, height: number) => void;
      dragging: (x: number, y: number) => void;
      dragStop: (x: number, y: number) => void;
      resizeStart: (
        handle: string,
        x: number,
        y: number,
        width: number,
        height: number
      ) => void;
      resizing: (x: number, y: number, width: number, height: number) => void;
      resizeStop: (
        handle: string,
        x: number,
        y: number,
        width: number,
        height: number
      ) => void;
    }
  >;

  export default VueDraggableResizable;
}
declare module "ckeditor5-line-height-plugin/src/lineheight";
