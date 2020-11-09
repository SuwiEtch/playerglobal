import { ASObject } from '@awayfl/avm2';
import { EventDispatcher } from '../../events/EventDispatcher';
import { Rectangle } from '../../geom/Rectangle';
import { ContentElement } from './ContentElement';
import { TextLine } from './TextLine';

export class TextLineMirrorRegion extends ASObject {

	static forceNative: boolean = true;
	// Called whenever the class is initialized.
	static classInitializer: any = null;

	// Called whenever an instance of the class is initialized.
	static initializer: any = null;

	// List of static symbols to link.
	static classSymbols: string[] = null; // [];

	// List of instance symbols to link.
	static instanceSymbols: string[] = null; // [];

	constructor() {
		super();
		console.warn('[TextLineMirrorRegion] not implemented');
	}

	// JS -> AS Bindings

	// AS -> JS Bindings

	// _textLine: flash.text.engine.TextLine;
	// _nextRegion: flash.text.engine.TextLineMirrorRegion;
	// _previousRegion: flash.text.engine.TextLineMirrorRegion;
	// _mirror: flash.events.EventDispatcher;
	// _element: flash.text.engine.ContentElement;
	// _bounds: flash.geom.Rectangle;
	get textLine(): TextLine {
		console.warn('[TextLineMirrorRegion] - get textLine not implemented');
		return null;
	}

	get nextRegion(): TextLineMirrorRegion {
		console.warn('[TextLineMirrorRegion] - get nextRegion not implemented');
		return null;
	}

	get previousRegion(): TextLineMirrorRegion {
		console.warn('[TextLineMirrorRegion] - get previousRegion not implemented');
		return null;
	}

	get mirror(): EventDispatcher {
		console.warn('[TextLineMirrorRegion] - get mirror not implemented');
		return null;
	}

	get element(): ContentElement {
		console.warn('[TextLineMirrorRegion] - get element not implemented');
		return null;
	}

	get bounds(): Rectangle {
		console.warn('[TextLineMirrorRegion] - get bounds not implemented');
		return null;
	}
}
