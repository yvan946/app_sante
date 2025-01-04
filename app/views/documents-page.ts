import { NavigatedData, Page, Observable, Frame } from '@nativescript/core';

export class DocumentsPageModel extends Observable {
    constructor() {
        super();
    }

    onCategoryTap(args: any) {
        const gridLayout = args.object;
        const type = gridLayout.get('documentType');
        const title = gridLayout.get('documentTitle');

        Frame.topmost().navigate({
            moduleName: 'views/documents/document-list',
            context: {
                type,
                title
            }
        });
    }
}

export function onNavigatingTo(args: NavigatedData) {
    const page = args.object as Page;
    if (!page.bindingContext) {
        page.bindingContext = new DocumentsPageModel();
    }
}