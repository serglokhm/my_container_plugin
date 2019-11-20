import { MyScrollView as MyScrollViewDefinition } from ".";
import { ScrollView, ScrollEventData } from "tns-core-modules/ui/scroll-view";
import { CSSType, EventData } from "tns-core-modules/ui/content-view";
import { profile } from "tns-core-modules/profiling";

export * from "tns-core-modules/ui/scroll-view";

@CSSType("MyScrollView")
export abstract class MyScrollViewBase extends ScrollView implements MyScrollViewDefinition {
    private _scrollChangeCount: number = 0;
    public static scrollEvent = "scroll";
    public static beginDragEvent = "beginDrag";
    public static stopDragEvent = "stopDrag";
    public static stopScrollEvent = "stopScroll";


    public addEventListener(arg: string, callback: any, thisArg?: any) {
        super.addEventListener(arg, callback, thisArg);
        console.log(">".repeat(50));
        console.log("addEventListener", arg);
        console.log(">".repeat(50));
        if (
            arg === MyScrollViewBase.scrollEvent ||
            arg === MyScrollViewBase.beginDragEvent ||
            arg === MyScrollViewBase.stopDragEvent ||
            arg === MyScrollViewBase.stopScrollEvent
        ) {
            this._scrollChangeCount++;
            this.attach();
        }
    }

    public removeEventListener(arg: string, callback: any, thisArg?: any) {
        super.removeEventListener(arg, callback, thisArg);

        if (
            arg === MyScrollViewBase.scrollEvent ||
            arg === MyScrollViewBase.beginDragEvent ||
            arg === MyScrollViewBase.stopDragEvent ||
            arg === MyScrollViewBase.stopScrollEvent
        ) {
            this._scrollChangeCount--;
            this.dettach();
        }
    }

    @profile
    public onLoaded() {
        super.onLoaded();

        this.attach();
    }

    public onUnloaded() {
        super.onUnloaded();

        this.dettach();
    }

    private attach() {
        if (this._scrollChangeCount > 0 && this.isLoaded) {
            this.attachNative();
        }
    }

    private dettach() {
        if (this._scrollChangeCount === 0 && this.isLoaded) {
            this.dettachNative();
        }
    }

    protected attachNative() {
        //
    }

    protected dettachNative() {
        //
    }
}

export interface MyScrollViewBase {
    on(eventNames: string, callback: (data: EventData) => void, thisArg?: any);
    on(event: "beginDrag", callback: (args: ScrollEventData) => void, thisArg?: any);
    on(event: "stopDrag", callback: (args: ScrollEventData) => void, thisArg?: any);
    on(event: "stopScroll", callback: (args: ScrollEventData) => void, thisArg?: any);
    on(event: "scroll", callback: (args: ScrollEventData) => void, thisArg?: any);
}

