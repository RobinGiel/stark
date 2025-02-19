/* tslint:disable:completed-docs no-lifecycle-call */
import { NO_ERRORS_SCHEMA } from "@angular/core";
import { ComponentFixture, TestBed, waitForAsync } from "@angular/core/testing";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { STARK_LOGGING_SERVICE, StarkLoggingService } from "@nationalbankbelgium/stark-core";
import { MockStarkLoggingService } from "@nationalbankbelgium/stark-core/testing";
import { NewsItemComponent } from "./news-item.component";
import SpyObj = jasmine.SpyObj;
import { provideMockStore } from "@ngrx/store/testing";

describe(`News`, () => {
	let comp: NewsItemComponent;
	let fixture: ComponentFixture<NewsItemComponent>;
	let logger: SpyObj<StarkLoggingService>;

	/**
	 * async beforeEach.
	 */
	beforeEach(
		waitForAsync(() => {
			return (
				TestBed.configureTestingModule({
					declarations: [NewsItemComponent],
					schemas: [NO_ERRORS_SCHEMA], // to avoid errors due to "mat-icon" directive not known (which we don't want to add in these tests)
					imports: [HttpClientTestingModule],
					providers: [{ provide: STARK_LOGGING_SERVICE, useValue: new MockStarkLoggingService() }, provideMockStore()]
				})

					/**
					 * Compile template and css.
					 */
					.compileComponents()
			);
		})
	);

	/**
	 * Synchronous beforeEach.
	 */
	beforeEach(() => {
		logger = TestBed.get(STARK_LOGGING_SERVICE);

		fixture = TestBed.createComponent(NewsItemComponent);
		comp = fixture.componentInstance;
		comp.release = "release";
		comp.newsDate = "date";
		/**
		 * Trigger initial data binding.
		 */
		fixture.detectChanges();
		logger.debug.calls.reset();
	});

	it("should log ngOnInit", () => {
		expect(logger.debug).not.toHaveBeenCalled();

		comp.ngOnInit();
		expect(logger.debug).toHaveBeenCalled();
	});
	it("expect error if release empty", () => {
		comp.release = "";
		expect(() => comp.ngOnInit()).toThrowError(/stark release/);
	});

	it("expect error if newsDate empty", () => {
		comp.newsDate = "";
		expect(() => comp.ngOnInit()).toThrowError(/date for the news/);
	});
});
