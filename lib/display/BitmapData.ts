import { Debug, IAssetAdapter, Point as APoint } from '@awayjs/core';
import { StageManager, BitmapImage2D } from '@awayjs/stage';
import { Rectangle } from '../geom/Rectangle';
import { Point } from '../geom/Point';
import { Matrix } from '../geom/Matrix';
import { ColorTransform } from '../geom/ColorTransform';
import { BitmapFilter } from '../filters/BitmapFilter';
import { IBitmapDrawable } from './IBitmapDrawable';
import { SceneImage2D } from '@awayjs/scene';

import { IBitmapDataOwner } from './IBitmapDataOwner';
import { ASObject, ByteArray, Uint32Vector, GenericVector } from '@awayfl/avm2';
import { SecurityDomain } from '../SecurityDomain';

const ALER_TABLE: StringMap<boolean> = {};
const ALERT_ONCE = (id: string, message: string) => {
	if (ALER_TABLE[id]) return;
	console.warn(`${id}:`, message);
	ALER_TABLE[id] = true;
};

export class BitmapData extends ASObject implements IBitmapDrawable, IAssetAdapter {
	private _adaptee: SceneImage2D;
	private _owners: Array<IBitmapDataOwner> = new Array<IBitmapDataOwner>();

	// for AVM1:
	public compare(other: BitmapData): boolean {
		return true;
	}

	public get adaptee(): SceneImage2D {
		return this._adaptee;
	}

	public set adaptee(value: SceneImage2D) {
		this._adaptee = value;
	}

	static loadBitmap(id: string): BitmapData {
		// @todo
		Debug.throwPIR('playerglobals/display/BitmapData', 'loadBitmap', '');
		return null;
	}

	public setPixels(rect: Rectangle, inputByteArray: ByteArray): void {
		// @todo
		Debug.throwPIR('playerglobals/display/BitmapData', 'setPixels', '');
	}

	public getPixels(rect: Rectangle): ByteArray {
		const buffer = this.adaptee.getPixels(rect.adaptee);
		const arr = new (<SecurityDomain> this.sec).flash.utils.ByteArray();

		// @ts-ignore
		arr.setArrayBuffer(buffer.buffer);
		//console.log('getPixels not implemented yet in flash/BitmapData');
		return arr;
	}

	public copyPixelsToByteArray(rect: Rectangle, data: ByteArray): void {
		// @todo
		Debug.throwPIR('playerglobals/display/BitmapData', 'copyPixelsToByteArray', '');
	}

	public getVector(rect: Rectangle): Uint32Vector {
		const buffer = this.adaptee.getPixels(rect.adaptee);
		// construct small buffer
		const vector = new this.sec.Uint32Vector(0, true);

		// replace a buffer for avoid copeing
		//@ts-ignore
		vector._buffer = new Uint32Array(buffer.buffer);
		// remap size
		//@ts-ignore
		vector._length = buffer.length / 4;

		return vector;
	}

	public setVector(rect: Rectangle, inputVector: Uint32Vector): void {
		// @todo
		Debug.throwPIR('playerglobals/display/BitmapData', 'setVector', '');
	}

	public histogram(hRect: Rectangle = null): GenericVector {
		// @todo
		Debug.throwPIR('playerglobals/display/BitmapData', 'histogram', '');
		return;
	}

	public encode(rect: Rectangle, compressor: ASObject, byteArray: ByteArray = null): ByteArray {
		// @todo
		Debug.throwPIR('playerglobals/display/BitmapData', 'encode', '');
		return;
	}

	public drawWithQuality(
		source: IBitmapDrawable,
		matrix: Matrix = null,
		colorTransform: ColorTransform = null,
		blendMode: string = null,
		clipRect: Rectangle = null,
		smoothing: boolean = false,
		quality: string = null
	): void {
		// @todo
		Debug.throwPIR('playerglobals/display/BitmapData', 'drawWithQuality', '');
	}

	constructor(width: number | SceneImage2D | BitmapImage2D,
		height: number, transparent: boolean = true, fillColor: number = 0xffffffff) {
		super();

		if (typeof width === 'number') {

			if (!this._adaptee) {
				this._adaptee =	SceneImage2D.getImage(width, height, transparent, fillColor, false,
					StageManager.getInstance().getStageAt(0));

				// we construct a SceneImage2D direct, use weak, that call dispose after garbaging
				this._adaptee.useWeakRef();
			}

		} else {
			this._adaptee = <any>width;
		}

		this._adaptee.adapter = this;
	}

	public get transparent(): boolean {
		return this._adaptee.transparent;
	}

	public set transparent(value: boolean) {
		this._adaptee.transparent = value;
	}

	public get width(): number {
		return this._adaptee.width;
	}

	public set width(value: number) {
		this._adaptee.width = value;
	}

	public get height(): number {
		return this._adaptee.height;
	}

	public set height(value: number) {
		this._adaptee.height = value;
	}

	public clone(): BitmapData {
		const clone: BitmapData = new (<SecurityDomain> this.sec).flash.display.BitmapData(
			this._adaptee.width,
			this._adaptee.height,
			this._adaptee.transparent,
			null
		);

		// refclone
		if (this._adaptee.copyTo) {
			this._adaptee.copyTo(clone._adaptee);
		} else {
			clone.copyPixels(this, this.rect, new (<SecurityDomain> this.sec).flash.geom.Point());
		}

		return clone;
	}

	public get rect(): Rectangle {
		return new (<SecurityDomain> this.sec).flash.geom.Rectangle(this._adaptee.rect.clone());
	}

	public getPixel(x: number, y: number): number {
		return this._adaptee.getPixel(x, y);
	}

	public getPixel32(x: number, y: number): number {
		return this._adaptee.getPixel32(x, y);
	}

	public setPixel(x: number, y: number, color: number) {
		this._adaptee.setPixel(x, y, color);
	}

	public setPixel32(x: number, y: number, color: number) {
		this._adaptee.setPixel32(x, y, color);
	}

	public applyFilter(
		sourceBitmap: BitmapData,
		sourceRect: Rectangle,
		destPoint: Point,
		filter: BitmapFilter
	): number {
		Debug.throwPIR('playerglobals/display/BitmapData', 'applyFilter', '');
		return 0;
	}

	public colorTransform(rect: Rectangle, colorTransform: ColorTransform) {
		this._adaptee.colorTransform(rect.adaptee, colorTransform.adaptee);
	}

	public copyChannel(
		sourceBitmap: BitmapData,
		sourceRect: Rectangle,
		destPoint: Point,
		sourceChannel: number,
		destChannel: number
	) {
		this._adaptee.copyChannel(
			sourceBitmap.adaptee,
			sourceRect.adaptee,
			destPoint.adaptee,
			sourceChannel,
			destChannel
		);
	}

	public copyPixels(
		sourceBitmap: any,
		sourceRect: Rectangle,
		destPoint: Point,
		alphaBitmapData: BitmapData = null,
		alphaPoint: Point = null,
		mergeAlpha: boolean = false
	) {
		this._adaptee.copyPixels(
			sourceBitmap.adaptee,
			sourceRect.adaptee,
			destPoint.adaptee,
			alphaBitmapData ? alphaBitmapData.adaptee : null,
			alphaPoint ? alphaPoint.adaptee : null,
			mergeAlpha
		);
	}

	public dispose() {
		// already disposed or not setted
		if (!this._adaptee) {
			return;
		}

		this._adaptee.dispose();
		this._adaptee = null;
	}

	public draw(
		source: any,
		matrix: Matrix,
		colorTransform: ColorTransform = null,
		blendMode: any = '',
		clipRect: Rectangle = null,
		smooth: boolean = false
	) {
		this._adaptee.draw(
			source.adaptee,
			matrix ? matrix.adaptee : null,
			colorTransform ? colorTransform.adaptee : null,
			blendMode,
			clipRect ? (<any>clipRect).adaptee : null,
			smooth
		);
	}

	public fillRect(rect: Rectangle, color: number) {
		// var colorArr = ColorUtils.float32ColorToARGB(color);
		// color = ColorUtils.ARGBtoFloat32(colorArr[0], colorArr[3], colorArr[2], colorArr[1]);
		this._adaptee.fillRect(rect.adaptee, color);
	}

	public floodFill(x: number, y: number, color: number) {
		ALERT_ONCE('floodFill:' + this._adaptee.id, 'Unsage implementation!');
		this._adaptee.floodFill(x, y, color);
	}

	public generateFilterRect(sourceRect: Rectangle, filter: BitmapFilter): Rectangle {
		Debug.throwPIR('playerglobals/display/BitmapData', 'generateFilterRect', '');
		return null;
	}

	public getColorBoundsRect(mask: number, color: number, findColor: boolean): Rectangle {
		Debug.throwPIR('playerglobals/display/BitmapData', 'getColorBoundsRect', '');
		return  new (<SecurityDomain> this.sec).flash.geom.Rectangle(
			this._adaptee.getColorBoundsRect(mask, color, findColor));
	}

	public hitTest(
		firstPoint: Point,
		firstAlphaThreshold: number,
		secondObject: any,
		secondBitmapPoint: Point = new (<SecurityDomain> this.sec).flash.geom.Point(0, 0),
		secondAlphaThreshold: number = 0
	): boolean {
		Debug.throwPIR('playerglobals/display/BitmapData', 'hitTest', '');
		return false;
	}

	public lock(): void {
		this._adaptee.lock();
	}

	public merge(
		sourceBitmap: BitmapData,
		sourceRect: Rectangle,
		destPoint: Point,
		redMult: number,
		greenMult: number,
		blueMult: number,
		alphaMult: number
	) {
		this._adaptee.merge(
			sourceBitmap.adaptee,
			sourceBitmap.rect.adaptee,
			destPoint.adaptee,
			redMult,
			greenMult,
			blueMult,
			alphaMult
		);
	}

	public noise(randomSeed: number, low: number, high: number, channelOptions: number, grayScale: boolean) {
		Debug.throwPIR('playerglobals/display/BitmapData', 'noise', '');
	}

	public paletteMap(
		sourceBitmap: BitmapData,
		sourceRect: Rectangle,
		destPoint: Point,
		redArray: any[],
		greenArray: any[],
		blueArray: any[],
		alphaArray: any[]
	) {
		Debug.throwPIR('playerglobals/display/BitmapData', 'paletteMap', '');
	}

	public perlinNoise(
		baseX: number,
		baseY: number,
		numOctaves: number,
		randomSeed: number,
		stitch: boolean,
		fractalNoise: boolean,
		channelOptions: number,
		grayScale: boolean,
		offsets: any
	) {
		Debug.throwPIR('playerglobals/display/BitmapData', 'perlinNoise', '');
	}

	public pixelDissolve(
		sourceBitmap: BitmapData,
		sourceRect: Rectangle,
		destPoint: Point,
		randomSeed: number,
		numberOfPixels: number,
		fillColor: number
	): number {
		Debug.throwPIR('playerglobals/display/BitmapData', 'pixelDissolve', '');
		return 0;
	}

	public scroll(x: number, y: number) {
		x = x | 0;
		y = y | 0;

		// 0, 0 scroll - is not scroll
		if (!x && !y) return;

		this._adaptee.copyPixels(
			this._adaptee, this._adaptee.rect, new APoint(x,y) , null, null, false);
		//console.log('scroll not implemented yet in flash/BitmapData');
	}

	public threshold(
		sourceBitmap: BitmapData,
		sourceRect: Rectangle,
		destPoint: Point,
		operation: string,
		threshold: number,
		color: number,
		mask: number,
		copySource: boolean
	): number {
		this._adaptee.threshold(
			sourceBitmap.adaptee,
			sourceRect.adaptee,
			destPoint.adaptee,
			operation,
			threshold,
			color,
			mask,
			copySource
		);

		return 0; //number of pixels is not implemented
	}

	public unlock(): void {
		this._adaptee.unlock();
	}

	public _addOwner(owner: IBitmapDataOwner) {
		if (this._owners.indexOf(owner) == -1) this._owners.push(owner);
	}

	public _removeOwner(owner: IBitmapDataOwner) {
		const index: number = this._owners.indexOf(owner);

		if (index != -1) this._owners.splice(index, 1);

		if (!this._owners.length && this._adaptee) this._adaptee.clear();
	}
}
