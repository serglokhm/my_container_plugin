import { ScrollEventData } from 'nativescript-my-container-component/scrollview';

import { NavigatedData, Page } from "tns-core-modules/ui/page";

import { HomeViewModel } from "./home-view-model";

export function onNavigatingTo(args: NavigatedData) {
    const page = <Page>args.object;

    page.bindingContext = new HomeViewModel();
}

export function onStopDrag(param: ScrollEventData) {
    console.log("ON onStopDrag EVENT", param.scrollX, param.scrollY);
}

export function onBeginDrag(param: ScrollEventData) {
    console.log("ON onBeginDrag EVENT", param.scrollX, param.scrollY);
}

export function onStopScroll(param: ScrollEventData) {
    console.log("ON onStopScroll EVENT", param.scrollX, param.scrollY);
}





