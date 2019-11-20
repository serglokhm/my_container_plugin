import { ContentView, EventData, Property } from "tns-core-modules/ui/content-view";
import { ScrollView } from "tns-core-modules/ui/scroll-view";

export * from "tns-core-modules/ui/scroll-view";

export class MyScrollView extends ScrollView {
    public static stopScrollEvent: string;
    public static beginDragEvent: string;
    public static stopDragEvent: string;    
    on(event: "beginDrag", callback: (args: ScrollEventData) => void, thisArg?: any);
    on(event: "stopDrag", callback: (args: ScrollEventData) => void, thisArg?: any);
    on(event: "stopScroll", callback: (args: ScrollEventData) => void, thisArg?: any);

}
