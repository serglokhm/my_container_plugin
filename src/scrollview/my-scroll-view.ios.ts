import { ScrollEventData } from "tns-core-modules/ui/scroll-view";
import {
    MyScrollViewBase
} from "./my-scroll-view-common";
import { ios as iosUtils } from "tns-core-modules/utils/utils";

export * from "./my-scroll-view-common";

const majorVersion = iosUtils.MajorVersion;

class MyUIScrollViewDelegateImpl extends NSObject implements UIScrollViewDelegate {
    private _owner: WeakRef<MyScrollView>;

    public static initWithOwner(owner: WeakRef<MyScrollView>): MyUIScrollViewDelegateImpl {
        let impl = <MyUIScrollViewDelegateImpl>MyUIScrollViewDelegateImpl.new();
        impl._owner = owner;

        return impl;
    }

    private callScrollEvent(eventName: string) {
        let owner = this._owner.get();
        if (owner) {
            owner.notify(<ScrollEventData>{
                eventName,
                object: owner,
                scrollX: owner.horizontalOffset,
                scrollY: owner.verticalOffset
            });
        }
    }

    public scrollViewDidScroll(sv: UIScrollView): void {
        this.callScrollEvent("scroll");
    }

    public scrollViewWillBeginDragging(scrollView: UIScrollView) {
        this.callScrollEvent("beginDrag");
    }

    public scrollViewDidEndDraggingWillDecelerate(
        scrollView: UIScrollView,
        decelerate: boolean
    ) {
        this.callScrollEvent("stopDrag");
        if(! decelerate) {
            this.scrollViewDidEndDecelerating(scrollView);
        }
    }

    public scrollViewDidEndDecelerating(scrollView: UIScrollView) {
        this.callScrollEvent("stopScroll");
    }

    public static ObjCProtocols = [UIScrollViewDelegate];
}

export class MyScrollView extends MyScrollViewBase {
    private _delegate: MyUIScrollViewDelegateImpl;

    protected attachNative() {
        this._delegate = MyUIScrollViewDelegateImpl.initWithOwner(new WeakRef(this));
        this.nativeViewProtected.delegate = this._delegate;
    }
}

MyScrollView.prototype.recycleNativeView = "auto";