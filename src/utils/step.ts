import { test } from "@playwright/test";

/**
 * Decorator that automatically wraps a method inside a Playwright test step.
 * @param stepName Optional custom name for the step report.
 */
export function step(stepName?: string) {
  return function (
    target: any,
    context: ClassMethodDecoratorContext | string,
    descriptor?: TypedPropertyDescriptor<any>,
  ): any {
    if (typeof context === "string") {
      // Legacy Experimental Decorator (Stage 2)
      const originalMethod = descriptor!.value;
      descriptor!.value = function (this: any, ...args: any[]) {
        const name = stepName || `${this.constructor.name}.${context}`;
        return test.step(name, async () => {
          // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-return
          return await originalMethod.apply(this, args);
        });
      };
      return descriptor;
    } else {
      // Standard Decorator (Stage 3)
      return function (this: any, ...args: any[]) {
        const name = stepName || `${this.constructor.name}.${String(context.name)}`;
        return test.step(name, async () => {
          // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-return
          return await target.call(this, ...args);
        });
      };
    }
  };
}
