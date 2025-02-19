/*tslint:disable:completed-docs*/
import { TestBed } from "@angular/core/testing";

import { Observable, Observer, ReplaySubject } from "rxjs";
import { provideMockActions } from "@ngrx/effects/testing";

import { StarkMessagePaneEffects } from "./message-pane.effects";
import { STARK_MESSAGE_PANE_SERVICE } from "../services";
import { StarkRoutingActions } from "@nationalbankbelgium/stark-core";
import { MockStarkMessagePaneService } from "@nationalbankbelgium/stark-ui/testing";
import SpyObj = jasmine.SpyObj;
import createSpyObj = jasmine.createSpyObj;

describe("Effect: StarkMessagePaneEffects", () => {
	let messagePaneEffects: StarkMessagePaneEffects;

	let mockMessagePaneService: MockStarkMessagePaneService;
	let actions: Observable<any>;

	// Inject module dependencies
	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [
				StarkMessagePaneEffects,
				provideMockActions(() => actions),
				{
					provide: STARK_MESSAGE_PANE_SERVICE,
					useFactory: (): MockStarkMessagePaneService => new MockStarkMessagePaneService()
				}
			],
			imports: []
		});

		messagePaneEffects = TestBed.inject(StarkMessagePaneEffects);
		mockMessagePaneService = TestBed.inject<MockStarkMessagePaneService>(STARK_MESSAGE_PANE_SERVICE);
	});

	describe("on clearOnNavigationSuccess$", () => {
		it("should clear and hide the message pane", () => {
			mockMessagePaneService.clearOnNavigation = true;
			const mockObserver: SpyObj<Observer<any>> = createSpyObj<Observer<any>>("observerSpy", ["next", "error", "complete"]);

			const subject: ReplaySubject<any> = new ReplaySubject(1);
			actions = subject.asObservable();

			messagePaneEffects.clearOnNavigationSuccess$.subscribe(mockObserver);

			subject.next(StarkRoutingActions.navigateSuccess({ previousState: "previousState", currentState: "currentState" }));

			expect(mockMessagePaneService.clearAll).toHaveBeenCalledTimes(1);
			expect(mockObserver.next).toHaveBeenCalledTimes(1);
			expect(mockObserver.error).not.toHaveBeenCalled();
			expect(mockObserver.complete).not.toHaveBeenCalled(); // effects should never complete!
		});

		it("should not clear and hide the message pane when the 'clearOnNavigation' option is not set", () => {
			mockMessagePaneService.clearOnNavigation = false;
			const mockObserver: SpyObj<Observer<any>> = createSpyObj<Observer<any>>("observerSpy", ["next", "error", "complete"]);

			const subject: ReplaySubject<any> = new ReplaySubject(1);
			actions = subject.asObservable();

			messagePaneEffects.clearOnNavigationSuccess$.subscribe(mockObserver);

			subject.next(StarkRoutingActions.navigateSuccess({ previousState: "previousState", currentState: "currentState" }));

			expect(mockMessagePaneService.clearAll).not.toHaveBeenCalled();
			expect(mockObserver.next).toHaveBeenCalledTimes(1);
			expect(mockObserver.error).not.toHaveBeenCalled();
			expect(mockObserver.complete).not.toHaveBeenCalled(); // effects should never complete!
		});
	});
});
