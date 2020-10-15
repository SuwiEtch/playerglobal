import { Event } from './Event';
import { BitmapData } from '../display/BitmapData';
import { ByteArray } from '../../avm2/natives/byteArray';

/**
 * Copyright 2014 Mozilla Foundation
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
// Class: ShaderEvent
export class ShaderEvent extends Event {

	static classInitializer: any = null;

	static classSymbols: string [] = null;
	static instanceSymbols: string [] = null;

	constructor(type: string, bubbles: boolean = false, cancelable: boolean = false,
		bitmap: BitmapData = null, array: ByteArray = null,
		vector: ASVector<any> = null) {
		super(type, bubbles, cancelable);
	}

	// JS -> AS Bindings
	static COMPLETE: string = 'complete';
}