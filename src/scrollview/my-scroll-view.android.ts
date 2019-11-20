import { MyScrollViewBase } from "./my-scroll-view-common";
import { layout } from "tns-core-modules/ui/content-view";
import { ScrollEventData } from "tns-core-modules/ui/scroll-view";

export * from "./my-scroll-view-common";

export class MyScrollView extends MyScrollViewBase {
    private handler: android.view.ViewTreeObserver.OnScrollChangedListener;
    //private touchHandler: android.view.ViewTreeObserver.OnTouchModeChangeListener;
    //private handler2: android.view.ViewTreeObserver.;

    protected attachNative() {
        const that = new WeakRef(this);
        
        this.handler = new android.view.ViewTreeObserver.OnScrollChangedListener({
            onScrollChanged: function () {
                const owner: MyScrollView = that.get();
                if (owner) {
                    owner._onScrollChanged();
                }
            }
        });

        this.nativeViewProtected.getViewTreeObserver().addOnScrollChangedListener(this.handler);
    }

    public onTouchEvent(param0: android.view.MotionEvent): boolean {
        console.log(" === onTouchEvent === ", param0);
        return false; 
    }

    private _lastScrollX: number = -1;
    private _lastScrollY: number = -1;
    private _onScrollChanged() {
        const nativeView = this.nativeViewProtected;
        if (nativeView) {
            // Event is only raised if the scroll values differ from the last time in order to wokraround a native Android bug.
            // https://github.com/NativeScript/NativeScript/issues/2362
            let newScrollX = nativeView.getScrollX();
            let newScrollY = nativeView.getScrollY();
            if (newScrollX !== this._lastScrollX || newScrollY !== this._lastScrollY) {
                this.notify(<ScrollEventData>{
                    object: this,
                    eventName: MyScrollView.scrollEvent,
                    scrollX: newScrollX / layout.getDisplayDensity(),
                    scrollY: newScrollY / layout.getDisplayDensity()
                });
                this._lastScrollX = newScrollX;
                this._lastScrollY = newScrollY;
            }
        }
    }

    protected dettachNative() {
        this.nativeViewProtected.getViewTreeObserver().removeOnScrollChangedListener(this.handler);
        this.handler = null;
    }
}

MyScrollView.prototype.recycleNativeView = "never";