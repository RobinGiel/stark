"use strict";

import "core-js/es";
import "core-js/proposals/reflect-metadata";

/* tslint:disable:no-import-side-effect */
import "zone.js";
import "zone.js/testing";
import "zone.js/plugins/long-stack-trace-zone";
/* tslint:enable:no-import-side-effect */

// define global environment variable (used in some places in stark-core and stark-ui)
global["ENV"] = "development";

import { getTestBed } from "@angular/core/testing";
import { BrowserDynamicTestingModule, platformBrowserDynamicTesting } from "@angular/platform-browser-dynamic/testing";

// tslint:disable:completed-docs bool-param-default
declare const require: {
	context(
		path: string,
		deep?: boolean,
		filter?: RegExp
	): {
		keys(): string[];
		<T>(id: string): T;
	};
};
getTestBed().initTestEnvironment(BrowserDynamicTestingModule, platformBrowserDynamicTesting());

// Then we find all the tests.
const context = require.context("./src", true, /\.spec\.ts$/);
// And load the modules.
context.keys().forEach(context);
