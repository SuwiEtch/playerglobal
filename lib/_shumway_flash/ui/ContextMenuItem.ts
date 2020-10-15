import { NativeMenuItem } from '../display/NativeMenuItem';
import { axCoerceString } from '../../avm2/run/axCoerceString';

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
// Class: ContextMenuItem
export class ContextMenuItem extends NativeMenuItem {

	// Called whenever the class is initialized.
	static classInitializer: any = null;

	// List of static symbols to link.
	static classSymbols: string [] = null; // [];

	// List of instance symbols to link.
	static instanceSymbols: string [] = null; // ["clone"];

	constructor (caption: string, separatorBefore: boolean = false,
		enabled: boolean = true, visible: boolean = true) {
		super();
		caption = axCoerceString(caption); separatorBefore = !!separatorBefore; enabled = !!enabled; visible = !!visible;
		this._caption = caption ? caption : '';
		this._separatorBefore = separatorBefore;
		this._enabled = enabled;
		this._visible = visible;
	}

	clone: () => ContextMenuItem;

	_caption: string;
	_separatorBefore: boolean;
	_visible: boolean;
	_enabled: boolean;

	get caption(): string {
		return this._caption;
	}

	set caption(value: string) {
		value = axCoerceString(value);
		this._caption = value;
	}

	get separatorBefore(): boolean {
		return this._separatorBefore;
	}

	set separatorBefore(value: boolean) {
		value = !!value;
		this._separatorBefore = value;
	}

	get visible(): boolean {
		return this._visible;
	}

	set visible(value: boolean) {
		value = !!value;
		this._visible = value;
	}
}
