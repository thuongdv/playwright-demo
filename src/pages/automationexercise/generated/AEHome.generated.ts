import { Locator, Page } from "fixtures/base-fixture";

export class AEHomeGeneratedPage {
  constructor(protected readonly page: Page) {}

  /**
   * Role: `heading` | Accessible Name: "Added!"
   * Variants: [unauthenticated.default]
   * Locator: `getByRole('heading', { name: 'Added!', exact: true })`
   */
  get addedHeading(): Locator {
    return this.page.getByRole("heading", { name: "Added!", exact: true });
  }

  /** Scoped accessor for `addedHeading` within a parent container (Modal) */
  getScopedAddedHeading(scope: Locator): Locator {
    return scope.getByRole("heading", { name: "Added!", exact: true });
  }

  /**
   * Role: `button` | Accessible Name: "APIs list for practice"
   * Variants: [unauthenticated.default]
   * Locator: `getByRole('button', { name: 'APIs list for practice', exact: true })`
   */
  get apisListForPracticeButton(): Locator {
    return this.page.getByRole("button", { name: "APIs list for practice", exact: true });
  }

  /** Scoped accessor for `apisListForPracticeButton` within a parent container (Container) */
  getScopedApisListForPracticeButton(scope: Locator): Locator {
    return scope.getByRole("button", { name: "APIs list for practice", exact: true });
  }

  /**
   * Role: `button` | Accessible Name: "APIs list for practice"
   * Variants: [unauthenticated.default]
   * Locator: `getByRole('button', { name: 'APIs list for practice', exact: true })`
   */
  get apisListForPracticeButton2(): Locator {
    return this.page.getByRole("button", { name: "APIs list for practice", exact: true });
  }

  /** Scoped accessor for `apisListForPracticeButton2` within a parent container (Container) */
  getScopedApisListForPracticeButton2(scope: Locator): Locator {
    return scope.getByRole("button", { name: "APIs list for practice", exact: true });
  }

  /**
   * Role: `button` | Accessible Name: "APIs list for practice"
   * Variants: [unauthenticated.default]
   * Locator: `getByRole('button', { name: 'APIs list for practice', exact: true })`
   */
  get apisListForPracticeButton3(): Locator {
    return this.page.getByRole("button", { name: "APIs list for practice", exact: true });
  }

  /** Scoped accessor for `apisListForPracticeButton3` within a parent container (Container) */
  getScopedApisListForPracticeButton3(scope: Locator): Locator {
    return scope.getByRole("button", { name: "APIs list for practice", exact: true });
  }

  /**
   * Role: `link` | Accessible Name: "APIs list for practice"
   * Variants: [unauthenticated.default]
   * Locator: `getByRole('link', { name: 'APIs list for practice', exact: true })`
   */
  get apisListForPracticeLink(): Locator {
    return this.page.getByRole("link", { name: "APIs list for practice", exact: true });
  }

  /** Scoped accessor for `apisListForPracticeLink` within a parent container (Container) */
  getScopedApisListForPracticeLink(scope: Locator): Locator {
    return scope.getByRole("link", { name: "APIs list for practice", exact: true });
  }

  /**
   * Role: `link` | Accessible Name: "APIs list for practice"
   * Variants: [unauthenticated.default]
   * Locator: `getByRole('link', { name: 'APIs list for practice', exact: true })`
   */
  get apisListForPracticeLink2(): Locator {
    return this.page.getByRole("link", { name: "APIs list for practice", exact: true });
  }

  /** Scoped accessor for `apisListForPracticeLink2` within a parent container (Container) */
  getScopedApisListForPracticeLink2(scope: Locator): Locator {
    return scope.getByRole("link", { name: "APIs list for practice", exact: true });
  }

  /**
   * Role: `link` | Accessible Name: "APIs list for practice"
   * Variants: [unauthenticated.default]
   * Locator: `getByRole('link', { name: 'APIs list for practice', exact: true })`
   */
  get apisListForPracticeLink3(): Locator {
    return this.page.getByRole("link", { name: "APIs list for practice", exact: true });
  }

  /** Scoped accessor for `apisListForPracticeLink3` within a parent container (Container) */
  getScopedApisListForPracticeLink3(scope: Locator): Locator {
    return scope.getByRole("link", { name: "APIs list for practice", exact: true });
  }

  /**
   * Role: `link` | Accessible Name: "API Testing"
   * Variants: [unauthenticated.default]
   * Locator: `getByRole('link', { name: 'API Testing', exact: true })`
   */
  get apiTestingLink(): Locator {
    return this.page.getByRole("link", { name: "API Testing", exact: true });
  }

  /**
   * Role: `heading` | Accessible Name: "AutomationExercise"
   * Variants: [unauthenticated.default]
   * Locator: `getByRole('heading', { name: 'AutomationExercise', exact: true })`
   */
  get automationexerciseHeading(): Locator {
    return this.page.getByRole("heading", { name: "AutomationExercise", exact: true });
  }

  /** Scoped accessor for `automationexerciseHeading` within a parent container (Container) */
  getScopedAutomationexerciseHeading(scope: Locator): Locator {
    return scope.getByRole("heading", { name: "AutomationExercise", exact: true });
  }

  /**
   * Role: `heading` | Accessible Name: "AutomationExercise"
   * Variants: [unauthenticated.default]
   * Locator: `getByRole('heading', { name: 'AutomationExercise', exact: true })`
   */
  get automationexerciseHeading2(): Locator {
    return this.page.getByRole("heading", { name: "AutomationExercise", exact: true });
  }

  /** Scoped accessor for `automationexerciseHeading2` within a parent container (Container) */
  getScopedAutomationexerciseHeading2(scope: Locator): Locator {
    return scope.getByRole("heading", { name: "AutomationExercise", exact: true });
  }

  /**
   * Role: `heading` | Accessible Name: "AutomationExercise"
   * Variants: [unauthenticated.default]
   * Locator: `getByRole('heading', { name: 'AutomationExercise', exact: true })`
   */
  get automationexerciseHeading3(): Locator {
    return this.page.getByRole("heading", { name: "AutomationExercise", exact: true });
  }

  /** Scoped accessor for `automationexerciseHeading3` within a parent container (Container) */
  getScopedAutomationexerciseHeading3(scope: Locator): Locator {
    return scope.getByRole("heading", { name: "AutomationExercise", exact: true });
  }

  /**
   * Role: `heading` | Accessible Name: "Brands"
   * Variants: [unauthenticated.default]
   * Locator: `getByRole('heading', { name: 'Brands', exact: true })`
   */
  get brandsHeading(): Locator {
    return this.page.getByRole("heading", { name: "Brands", exact: true });
  }

  /**
   * Role: `link` | Accessible Name: "Cart"
   * Variants: [unauthenticated.default]
   * Locator: `getByRole('link', { name: 'Cart', exact: true })`
   */
  get cartLink(): Locator {
    return this.page.getByRole("link", { name: "Cart", exact: true });
  }

  /**
   * Role: `heading` | Accessible Name: "Category"
   * Variants: [unauthenticated.default]
   * Locator: `getByRole('heading', { name: 'Category', exact: true })`
   */
  get categoryHeading(): Locator {
    return this.page.getByRole("heading", { name: "Category", exact: true });
  }

  /**
   * Role: `link` | Accessible Name: "Contact us"
   * Variants: [unauthenticated.default]
   * Locator: `getByRole('link', { name: 'Contact us', exact: true })`
   */
  get contactUsLink(): Locator {
    return this.page.getByRole("link", { name: "Contact us", exact: true });
  }

  /**
   * Role: `button` | Accessible Name: "Continue Shopping"
   * Variants: [unauthenticated.default]
   * Locator: `getByRole('button', { name: 'Continue Shopping', exact: true })`
   */
  get continueShoppingButton(): Locator {
    return this.page.getByRole("button", { name: "Continue Shopping", exact: true });
  }

  /** Scoped accessor for `continueShoppingButton` within a parent container (Modal) */
  getScopedContinueShoppingButton(scope: Locator): Locator {
    return scope.getByRole("button", { name: "Continue Shopping", exact: true });
  }

  /**
   * Role: `link` | Accessible Name: "Dress"
   * Variants: [unauthenticated.default]
   * Locator: `getByRole('link', { name: 'Dress', exact: true })`
   */
  get dressLink(): Locator {
    return this.page.getByRole("link", { name: "Dress", exact: true });
  }

  /** Scoped accessor for `dressLink` within a parent container (Container) */
  getScopedDressLink(scope: Locator): Locator {
    return scope.getByRole("link", { name: "Dress", exact: true });
  }

  /**
   * Role: `link` | Accessible Name: "Dress"
   * Variants: [unauthenticated.default]
   * Locator: `getByRole('link', { name: 'Dress', exact: true })`
   */
  get dressLink2(): Locator {
    return this.page.getByRole("link", { name: "Dress", exact: true });
  }

  /** Scoped accessor for `dressLink2` within a parent container (Container) */
  getScopedDressLink2(scope: Locator): Locator {
    return scope.getByRole("link", { name: "Dress", exact: true });
  }

  /**
   * Role: `link` | Accessible Name: "(3)Allen Solly Junior"
   * Variants: [unauthenticated.default]
   * Locator: `getByRole('link', { name: '(3)Allen Solly Junior', exact: true })`
   */
  get el_3allenSollyJuniorLink(): Locator {
    return this.page.getByRole("link", { name: "(3)Allen Solly Junior", exact: true });
  }

  /**
   * Role: `link` | Accessible Name: "(3)Kookie Kids"
   * Variants: [unauthenticated.default]
   * Locator: `getByRole('link', { name: '(3)Kookie Kids', exact: true })`
   */
  get el_3kookieKidsLink(): Locator {
    return this.page.getByRole("link", { name: "(3)Kookie Kids", exact: true });
  }

  /**
   * Role: `link` | Accessible Name: "(3)Mast & Harbour"
   * Variants: [unauthenticated.default]
   * Locator: `getByRole('link', { name: '(3)Mast & Harbour', exact: true })`
   */
  get el_3mastHarbourLink(): Locator {
    return this.page.getByRole("link", { name: "(3)Mast & Harbour", exact: true });
  }

  /**
   * Role: `link` | Accessible Name: "(4)Babyhug"
   * Variants: [unauthenticated.default]
   * Locator: `getByRole('link', { name: '(4)Babyhug', exact: true })`
   */
  get el_4babyhugLink(): Locator {
    return this.page.getByRole("link", { name: "(4)Babyhug", exact: true });
  }

  /**
   * Role: `link` | Accessible Name: "(5)Biba"
   * Variants: [unauthenticated.default]
   * Locator: `getByRole('link', { name: '(5)Biba', exact: true })`
   */
  get el_5bibaLink(): Locator {
    return this.page.getByRole("link", { name: "(5)Biba", exact: true });
  }

  /**
   * Role: `link` | Accessible Name: "(5)H&M"
   * Variants: [unauthenticated.default]
   * Locator: `getByRole('link', { name: '(5)H&M', exact: true })`
   */
  get el_5hmLink(): Locator {
    return this.page.getByRole("link", { name: "(5)H&M", exact: true });
  }

  /**
   * Role: `link` | Accessible Name: "(5)Madame"
   * Variants: [unauthenticated.default]
   * Locator: `getByRole('link', { name: '(5)Madame', exact: true })`
   */
  get el_5madameLink(): Locator {
    return this.page.getByRole("link", { name: "(5)Madame", exact: true });
  }

  /**
   * Role: `link` | Accessible Name: "(6)Polo"
   * Variants: [unauthenticated.default]
   * Locator: `getByRole('link', { name: '(6)Polo', exact: true })`
   */
  get el_6poloLink(): Locator {
    return this.page.getByRole("link", { name: "(6)Polo", exact: true });
  }

  /**
   * Role: `heading` | Accessible Name: "Features Items"
   * Variants: [unauthenticated.default]
   * Locator: `getByRole('heading', { name: 'Features Items', exact: true })`
   */
  get featuresItemsHeading(): Locator {
    return this.page.getByRole("heading", { name: "Features Items", exact: true });
  }

  /**
   * Role: `heading` | Accessible Name: "Full-Fledged practice website for Automation Engineers"
   * Variants: [unauthenticated.default]
   * Locator: `getByRole('heading', { name: 'Full-Fledged practice website for Automation Engineers', exact: true })`
   */
  get heading(): Locator {
    return this.page.getByRole("heading", {
      name: "Full-Fledged practice website for Automation Engineers",
      exact: true,
    });
  }

  /** Scoped accessor for `heading` within a parent container (Container) */
  getScopedHeading(scope: Locator): Locator {
    return scope.getByRole("heading", { name: "Full-Fledged practice website for Automation Engineers", exact: true });
  }

  /**
   * Role: `heading` | Accessible Name: "Full-Fledged practice website for Automation Engineers"
   * Variants: [unauthenticated.default]
   * Locator: `getByRole('heading', { name: 'Full-Fledged practice website for Automation Engineers', exact: true })`
   */
  get heading2(): Locator {
    return this.page.getByRole("heading", {
      name: "Full-Fledged practice website for Automation Engineers",
      exact: true,
    });
  }

  /** Scoped accessor for `heading2` within a parent container (Container) */
  getScopedHeading2(scope: Locator): Locator {
    return scope.getByRole("heading", { name: "Full-Fledged practice website for Automation Engineers", exact: true });
  }

  /**
   * Role: `heading` | Accessible Name: "Full-Fledged practice website for Automation Engineers"
   * Variants: [unauthenticated.default]
   * Locator: `getByRole('heading', { name: 'Full-Fledged practice website for Automation Engineers', exact: true })`
   */
  get heading3(): Locator {
    return this.page.getByRole("heading", {
      name: "Full-Fledged practice website for Automation Engineers",
      exact: true,
    });
  }

  /** Scoped accessor for `heading3` within a parent container (Container) */
  getScopedHeading3(scope: Locator): Locator {
    return scope.getByRole("heading", { name: "Full-Fledged practice website for Automation Engineers", exact: true });
  }

  /**
   * Role: `link` | Accessible Name: "Home"
   * Variants: [unauthenticated.default]
   * Locator: `getByRole('link', { name: 'Home', exact: true })`
   */
  get homeLink(): Locator {
    return this.page.getByRole("link", { name: "Home", exact: true });
  }

  /**
   * Role: `link` | Accessible Name: "Jeans"
   * Variants: [unauthenticated.default]
   * Locator: `getByRole('link', { name: 'Jeans', exact: true })`
   */
  get jeansLink(): Locator {
    return this.page.getByRole("link", { name: "Jeans", exact: true });
  }

  /**
   * Role: `heading` | Accessible Name: "Kids"
   * Variants: [unauthenticated.default]
   * Locator: `getByRole('heading', { name: 'Kids', exact: true })`
   */
  get kidsHeading(): Locator {
    return this.page.getByRole("heading", { name: "Kids", exact: true });
  }

  /**
   * Role: `link` | Accessible Name: "Kids"
   * Variants: [unauthenticated.default]
   * Locator: `getByRole('link', { name: 'Kids', exact: true })`
   */
  get kidsLink(): Locator {
    return this.page.getByRole("link", { name: "Kids", exact: true });
  }

  /**
   * Role: `heading` | Accessible Name: "Men"
   * Variants: [unauthenticated.default]
   * Locator: `getByRole('heading', { name: 'Men', exact: true })`
   */
  get menHeading(): Locator {
    return this.page.getByRole("heading", { name: "Men", exact: true });
  }

  /**
   * Role: `link` | Accessible Name: "Men"
   * Variants: [unauthenticated.default]
   * Locator: `getByRole('link', { name: 'Men', exact: true })`
   */
  get menLink(): Locator {
    return this.page.getByRole("link", { name: "Men", exact: true });
  }

  /**
   * Role: `link` | Accessible Name: " Products"
   * Variants: [unauthenticated.default]
   * Locator: `getByRole('link', { name: ' Products', exact: true })`
   */
  get productsLink(): Locator {
    return this.page.getByRole("link", { name: " Products", exact: true });
  }

  /**
   * Role: `heading` | Accessible Name: "recommended items"
   * Variants: [unauthenticated.default]
   * Locator: `getByRole('heading', { name: 'recommended items', exact: true })`
   */
  get recommendedItemsHeading(): Locator {
    return this.page.getByRole("heading", { name: "recommended items", exact: true });
  }

  /**
   * Role: `heading` | Accessible Name: "Rs. 1000"
   * Variants: [unauthenticated.default]
   * Locator: `getByRole('heading', { name: 'Rs. 1000', exact: true })`
   */
  get rs1000Heading(): Locator {
    return this.page.getByRole("heading", { name: "Rs. 1000", exact: true });
  }

  /** Scoped accessor for `rs1000Heading` within a parent container (Container) */
  getScopedRs1000Heading(scope: Locator): Locator {
    return scope.getByRole("heading", { name: "Rs. 1000", exact: true });
  }

  /**
   * Role: `heading` | Accessible Name: "Rs. 1000"
   * Variants: [unauthenticated.default]
   * Locator: `getByRole('heading', { name: 'Rs. 1000', exact: true })`
   */
  get rs1000Heading2(): Locator {
    return this.page.getByRole("heading", { name: "Rs. 1000", exact: true });
  }

  /** Scoped accessor for `rs1000Heading2` within a parent container (Container) */
  getScopedRs1000Heading2(scope: Locator): Locator {
    return scope.getByRole("heading", { name: "Rs. 1000", exact: true });
  }

  /**
   * Role: `heading` | Accessible Name: "Rs. 1000"
   * Variants: [unauthenticated.default]
   * Locator: `getByRole('heading', { name: 'Rs. 1000', exact: true })`
   */
  get rs1000Heading3(): Locator {
    return this.page.getByRole("heading", { name: "Rs. 1000", exact: true });
  }

  /** Scoped accessor for `rs1000Heading3` within a parent container (Container) */
  getScopedRs1000Heading3(scope: Locator): Locator {
    return scope.getByRole("heading", { name: "Rs. 1000", exact: true });
  }

  /**
   * Role: `heading` | Accessible Name: "Rs. 1000"
   * Variants: [unauthenticated.default]
   * Locator: `getByRole('heading', { name: 'Rs. 1000', exact: true })`
   */
  get rs1000Heading4(): Locator {
    return this.page.getByRole("heading", { name: "Rs. 1000", exact: true });
  }

  /** Scoped accessor for `rs1000Heading4` within a parent container (Container) */
  getScopedRs1000Heading4(scope: Locator): Locator {
    return scope.getByRole("heading", { name: "Rs. 1000", exact: true });
  }

  /**
   * Role: `heading` | Accessible Name: "Rs. 1000"
   * Variants: [unauthenticated.default]
   * Locator: `getByRole('heading', { name: 'Rs. 1000', exact: true })`
   */
  get rs1000Heading5(): Locator {
    return this.page.getByRole("heading", { name: "Rs. 1000", exact: true });
  }

  /** Scoped accessor for `rs1000Heading5` within a parent container (Container) */
  getScopedRs1000Heading5(scope: Locator): Locator {
    return scope.getByRole("heading", { name: "Rs. 1000", exact: true });
  }

  /**
   * Role: `heading` | Accessible Name: "Rs. 1000"
   * Variants: [unauthenticated.default]
   * Locator: `getByRole('heading', { name: 'Rs. 1000', exact: true })`
   */
  get rs1000Heading6(): Locator {
    return this.page.getByRole("heading", { name: "Rs. 1000", exact: true });
  }

  /** Scoped accessor for `rs1000Heading6` within a parent container (Container) */
  getScopedRs1000Heading6(scope: Locator): Locator {
    return scope.getByRole("heading", { name: "Rs. 1000", exact: true });
  }

  /**
   * Role: `heading` | Accessible Name: "Rs. 1000"
   * Variants: [unauthenticated.default]
   * Locator: `getByRole('heading', { name: 'Rs. 1000', exact: true })`
   */
  get rs1000Heading7(): Locator {
    return this.page.getByRole("heading", { name: "Rs. 1000", exact: true });
  }

  /** Scoped accessor for `rs1000Heading7` within a parent container (Container) */
  getScopedRs1000Heading7(scope: Locator): Locator {
    return scope.getByRole("heading", { name: "Rs. 1000", exact: true });
  }

  /**
   * Role: `heading` | Accessible Name: "Rs. 1050"
   * Variants: [unauthenticated.default]
   * Locator: `getByRole('heading', { name: 'Rs. 1050', exact: true })`
   */
  get rs1050Heading(): Locator {
    return this.page.getByRole("heading", { name: "Rs. 1050", exact: true });
  }

  /** Scoped accessor for `rs1050Heading` within a parent container (Container) */
  getScopedRs1050Heading(scope: Locator): Locator {
    return scope.getByRole("heading", { name: "Rs. 1050", exact: true });
  }

  /**
   * Role: `heading` | Accessible Name: "Rs. 1050"
   * Variants: [unauthenticated.default]
   * Locator: `getByRole('heading', { name: 'Rs. 1050', exact: true })`
   */
  get rs1050Heading2(): Locator {
    return this.page.getByRole("heading", { name: "Rs. 1050", exact: true });
  }

  /** Scoped accessor for `rs1050Heading2` within a parent container (Container) */
  getScopedRs1050Heading2(scope: Locator): Locator {
    return scope.getByRole("heading", { name: "Rs. 1050", exact: true });
  }

  /**
   * Role: `heading` | Accessible Name: "Rs. 1100"
   * Variants: [unauthenticated.default]
   * Locator: `getByRole('heading', { name: 'Rs. 1100', exact: true })`
   */
  get rs1100Heading(): Locator {
    return this.page.getByRole("heading", { name: "Rs. 1100", exact: true });
  }

  /** Scoped accessor for `rs1100Heading` within a parent container (Container) */
  getScopedRs1100Heading(scope: Locator): Locator {
    return scope.getByRole("heading", { name: "Rs. 1100", exact: true });
  }

  /**
   * Role: `heading` | Accessible Name: "Rs. 1100"
   * Variants: [unauthenticated.default]
   * Locator: `getByRole('heading', { name: 'Rs. 1100', exact: true })`
   */
  get rs1100Heading2(): Locator {
    return this.page.getByRole("heading", { name: "Rs. 1100", exact: true });
  }

  /** Scoped accessor for `rs1100Heading2` within a parent container (Container) */
  getScopedRs1100Heading2(scope: Locator): Locator {
    return scope.getByRole("heading", { name: "Rs. 1100", exact: true });
  }

  /**
   * Role: `heading` | Accessible Name: "Rs. 1190"
   * Variants: [unauthenticated.default]
   * Locator: `getByRole('heading', { name: 'Rs. 1190', exact: true })`
   */
  get rs1190Heading(): Locator {
    return this.page.getByRole("heading", { name: "Rs. 1190", exact: true });
  }

  /** Scoped accessor for `rs1190Heading` within a parent container (Container) */
  getScopedRs1190Heading(scope: Locator): Locator {
    return scope.getByRole("heading", { name: "Rs. 1190", exact: true });
  }

  /**
   * Role: `heading` | Accessible Name: "Rs. 1190"
   * Variants: [unauthenticated.default]
   * Locator: `getByRole('heading', { name: 'Rs. 1190', exact: true })`
   */
  get rs1190Heading2(): Locator {
    return this.page.getByRole("heading", { name: "Rs. 1190", exact: true });
  }

  /** Scoped accessor for `rs1190Heading2` within a parent container (Container) */
  getScopedRs1190Heading2(scope: Locator): Locator {
    return scope.getByRole("heading", { name: "Rs. 1190", exact: true });
  }

  /**
   * Role: `heading` | Accessible Name: "Rs. 1200"
   * Variants: [unauthenticated.default]
   * Locator: `getByRole('heading', { name: 'Rs. 1200', exact: true })`
   */
  get rs1200Heading(): Locator {
    return this.page.getByRole("heading", { name: "Rs. 1200", exact: true });
  }

  /** Scoped accessor for `rs1200Heading` within a parent container (Container) */
  getScopedRs1200Heading(scope: Locator): Locator {
    return scope.getByRole("heading", { name: "Rs. 1200", exact: true });
  }

  /**
   * Role: `heading` | Accessible Name: "Rs. 1200"
   * Variants: [unauthenticated.default]
   * Locator: `getByRole('heading', { name: 'Rs. 1200', exact: true })`
   */
  get rs1200Heading2(): Locator {
    return this.page.getByRole("heading", { name: "Rs. 1200", exact: true });
  }

  /** Scoped accessor for `rs1200Heading2` within a parent container (Container) */
  getScopedRs1200Heading2(scope: Locator): Locator {
    return scope.getByRole("heading", { name: "Rs. 1200", exact: true });
  }

  /**
   * Role: `heading` | Accessible Name: "Rs. 1200"
   * Variants: [unauthenticated.default]
   * Locator: `getByRole('heading', { name: 'Rs. 1200', exact: true })`
   */
  get rs1200Heading3(): Locator {
    return this.page.getByRole("heading", { name: "Rs. 1200", exact: true });
  }

  /** Scoped accessor for `rs1200Heading3` within a parent container (Container) */
  getScopedRs1200Heading3(scope: Locator): Locator {
    return scope.getByRole("heading", { name: "Rs. 1200", exact: true });
  }

  /**
   * Role: `heading` | Accessible Name: "Rs. 1200"
   * Variants: [unauthenticated.default]
   * Locator: `getByRole('heading', { name: 'Rs. 1200', exact: true })`
   */
  get rs1200Heading4(): Locator {
    return this.page.getByRole("heading", { name: "Rs. 1200", exact: true });
  }

  /** Scoped accessor for `rs1200Heading4` within a parent container (Container) */
  getScopedRs1200Heading4(scope: Locator): Locator {
    return scope.getByRole("heading", { name: "Rs. 1200", exact: true });
  }

  /**
   * Role: `heading` | Accessible Name: "Rs. 1299"
   * Variants: [unauthenticated.default]
   * Locator: `getByRole('heading', { name: 'Rs. 1299', exact: true })`
   */
  get rs1299Heading(): Locator {
    return this.page.getByRole("heading", { name: "Rs. 1299", exact: true });
  }

  /** Scoped accessor for `rs1299Heading` within a parent container (Container) */
  getScopedRs1299Heading(scope: Locator): Locator {
    return scope.getByRole("heading", { name: "Rs. 1299", exact: true });
  }

  /**
   * Role: `heading` | Accessible Name: "Rs. 1299"
   * Variants: [unauthenticated.default]
   * Locator: `getByRole('heading', { name: 'Rs. 1299', exact: true })`
   */
  get rs1299Heading2(): Locator {
    return this.page.getByRole("heading", { name: "Rs. 1299", exact: true });
  }

  /** Scoped accessor for `rs1299Heading2` within a parent container (Container) */
  getScopedRs1299Heading2(scope: Locator): Locator {
    return scope.getByRole("heading", { name: "Rs. 1299", exact: true });
  }

  /**
   * Role: `heading` | Accessible Name: "Rs. 1389"
   * Variants: [unauthenticated.default]
   * Locator: `getByRole('heading', { name: 'Rs. 1389', exact: true })`
   */
  get rs1389Heading(): Locator {
    return this.page.getByRole("heading", { name: "Rs. 1389", exact: true });
  }

  /** Scoped accessor for `rs1389Heading` within a parent container (Container) */
  getScopedRs1389Heading(scope: Locator): Locator {
    return scope.getByRole("heading", { name: "Rs. 1389", exact: true });
  }

  /**
   * Role: `heading` | Accessible Name: "Rs. 1389"
   * Variants: [unauthenticated.default]
   * Locator: `getByRole('heading', { name: 'Rs. 1389', exact: true })`
   */
  get rs1389Heading2(): Locator {
    return this.page.getByRole("heading", { name: "Rs. 1389", exact: true });
  }

  /** Scoped accessor for `rs1389Heading2` within a parent container (Container) */
  getScopedRs1389Heading2(scope: Locator): Locator {
    return scope.getByRole("heading", { name: "Rs. 1389", exact: true });
  }

  /**
   * Role: `heading` | Accessible Name: "Rs. 1400"
   * Variants: [unauthenticated.default]
   * Locator: `getByRole('heading', { name: 'Rs. 1400', exact: true })`
   */
  get rs1400Heading(): Locator {
    return this.page.getByRole("heading", { name: "Rs. 1400", exact: true });
  }

  /** Scoped accessor for `rs1400Heading` within a parent container (Container) */
  getScopedRs1400Heading(scope: Locator): Locator {
    return scope.getByRole("heading", { name: "Rs. 1400", exact: true });
  }

  /**
   * Role: `heading` | Accessible Name: "Rs. 1400"
   * Variants: [unauthenticated.default]
   * Locator: `getByRole('heading', { name: 'Rs. 1400', exact: true })`
   */
  get rs1400Heading2(): Locator {
    return this.page.getByRole("heading", { name: "Rs. 1400", exact: true });
  }

  /** Scoped accessor for `rs1400Heading2` within a parent container (Container) */
  getScopedRs1400Heading2(scope: Locator): Locator {
    return scope.getByRole("heading", { name: "Rs. 1400", exact: true });
  }

  /**
   * Role: `heading` | Accessible Name: "Rs. 1400"
   * Variants: [unauthenticated.default]
   * Locator: `getByRole('heading', { name: 'Rs. 1400', exact: true })`
   */
  get rs1400Heading3(): Locator {
    return this.page.getByRole("heading", { name: "Rs. 1400", exact: true });
  }

  /** Scoped accessor for `rs1400Heading3` within a parent container (Container) */
  getScopedRs1400Heading3(scope: Locator): Locator {
    return scope.getByRole("heading", { name: "Rs. 1400", exact: true });
  }

  /**
   * Role: `heading` | Accessible Name: "Rs. 1400"
   * Variants: [unauthenticated.default]
   * Locator: `getByRole('heading', { name: 'Rs. 1400', exact: true })`
   */
  get rs1400Heading4(): Locator {
    return this.page.getByRole("heading", { name: "Rs. 1400", exact: true });
  }

  /** Scoped accessor for `rs1400Heading4` within a parent container (Container) */
  getScopedRs1400Heading4(scope: Locator): Locator {
    return scope.getByRole("heading", { name: "Rs. 1400", exact: true });
  }

  /**
   * Role: `heading` | Accessible Name: "Rs. 1500"
   * Variants: [unauthenticated.default]
   * Locator: `getByRole('heading', { name: 'Rs. 1500', exact: true })`
   */
  get rs1500Heading(): Locator {
    return this.page.getByRole("heading", { name: "Rs. 1500", exact: true });
  }

  /** Scoped accessor for `rs1500Heading` within a parent container (Container) */
  getScopedRs1500Heading(scope: Locator): Locator {
    return scope.getByRole("heading", { name: "Rs. 1500", exact: true });
  }

  /**
   * Role: `heading` | Accessible Name: "Rs. 1500"
   * Variants: [unauthenticated.default]
   * Locator: `getByRole('heading', { name: 'Rs. 1500', exact: true })`
   */
  get rs1500Heading2(): Locator {
    return this.page.getByRole("heading", { name: "Rs. 1500", exact: true });
  }

  /** Scoped accessor for `rs1500Heading2` within a parent container (Container) */
  getScopedRs1500Heading2(scope: Locator): Locator {
    return scope.getByRole("heading", { name: "Rs. 1500", exact: true });
  }

  /**
   * Role: `heading` | Accessible Name: "Rs. 1500"
   * Variants: [unauthenticated.default]
   * Locator: `getByRole('heading', { name: 'Rs. 1500', exact: true })`
   */
  get rs1500Heading3(): Locator {
    return this.page.getByRole("heading", { name: "Rs. 1500", exact: true });
  }

  /** Scoped accessor for `rs1500Heading3` within a parent container (Container) */
  getScopedRs1500Heading3(scope: Locator): Locator {
    return scope.getByRole("heading", { name: "Rs. 1500", exact: true });
  }

  /**
   * Role: `heading` | Accessible Name: "Rs. 1500"
   * Variants: [unauthenticated.default]
   * Locator: `getByRole('heading', { name: 'Rs. 1500', exact: true })`
   */
  get rs1500Heading4(): Locator {
    return this.page.getByRole("heading", { name: "Rs. 1500", exact: true });
  }

  /** Scoped accessor for `rs1500Heading4` within a parent container (Container) */
  getScopedRs1500Heading4(scope: Locator): Locator {
    return scope.getByRole("heading", { name: "Rs. 1500", exact: true });
  }

  /**
   * Role: `heading` | Accessible Name: "Rs. 1500"
   * Variants: [unauthenticated.default]
   * Locator: `getByRole('heading', { name: 'Rs. 1500', exact: true })`
   */
  get rs1500Heading5(): Locator {
    return this.page.getByRole("heading", { name: "Rs. 1500", exact: true });
  }

  /** Scoped accessor for `rs1500Heading5` within a parent container (Container) */
  getScopedRs1500Heading5(scope: Locator): Locator {
    return scope.getByRole("heading", { name: "Rs. 1500", exact: true });
  }

  /**
   * Role: `heading` | Accessible Name: "Rs. 1530"
   * Variants: [unauthenticated.default]
   * Locator: `getByRole('heading', { name: 'Rs. 1530', exact: true })`
   */
  get rs1530Heading(): Locator {
    return this.page.getByRole("heading", { name: "Rs. 1530", exact: true });
  }

  /** Scoped accessor for `rs1530Heading` within a parent container (Container) */
  getScopedRs1530Heading(scope: Locator): Locator {
    return scope.getByRole("heading", { name: "Rs. 1530", exact: true });
  }

  /**
   * Role: `heading` | Accessible Name: "Rs. 1530"
   * Variants: [unauthenticated.default]
   * Locator: `getByRole('heading', { name: 'Rs. 1530', exact: true })`
   */
  get rs1530Heading2(): Locator {
    return this.page.getByRole("heading", { name: "Rs. 1530", exact: true });
  }

  /** Scoped accessor for `rs1530Heading2` within a parent container (Container) */
  getScopedRs1530Heading2(scope: Locator): Locator {
    return scope.getByRole("heading", { name: "Rs. 1530", exact: true });
  }

  /**
   * Role: `heading` | Accessible Name: "Rs. 1600"
   * Variants: [unauthenticated.default]
   * Locator: `getByRole('heading', { name: 'Rs. 1600', exact: true })`
   */
  get rs1600Heading(): Locator {
    return this.page.getByRole("heading", { name: "Rs. 1600", exact: true });
  }

  /** Scoped accessor for `rs1600Heading` within a parent container (Container) */
  getScopedRs1600Heading(scope: Locator): Locator {
    return scope.getByRole("heading", { name: "Rs. 1600", exact: true });
  }

  /**
   * Role: `heading` | Accessible Name: "Rs. 1600"
   * Variants: [unauthenticated.default]
   * Locator: `getByRole('heading', { name: 'Rs. 1600', exact: true })`
   */
  get rs1600Heading2(): Locator {
    return this.page.getByRole("heading", { name: "Rs. 1600", exact: true });
  }

  /** Scoped accessor for `rs1600Heading2` within a parent container (Container) */
  getScopedRs1600Heading2(scope: Locator): Locator {
    return scope.getByRole("heading", { name: "Rs. 1600", exact: true });
  }

  /**
   * Role: `heading` | Accessible Name: "Rs. 2300"
   * Variants: [unauthenticated.default]
   * Locator: `getByRole('heading', { name: 'Rs. 2300', exact: true })`
   */
  get rs2300Heading(): Locator {
    return this.page.getByRole("heading", { name: "Rs. 2300", exact: true });
  }

  /** Scoped accessor for `rs2300Heading` within a parent container (Container) */
  getScopedRs2300Heading(scope: Locator): Locator {
    return scope.getByRole("heading", { name: "Rs. 2300", exact: true });
  }

  /**
   * Role: `heading` | Accessible Name: "Rs. 2300"
   * Variants: [unauthenticated.default]
   * Locator: `getByRole('heading', { name: 'Rs. 2300', exact: true })`
   */
  get rs2300Heading2(): Locator {
    return this.page.getByRole("heading", { name: "Rs. 2300", exact: true });
  }

  /** Scoped accessor for `rs2300Heading2` within a parent container (Container) */
  getScopedRs2300Heading2(scope: Locator): Locator {
    return scope.getByRole("heading", { name: "Rs. 2300", exact: true });
  }

  /**
   * Role: `heading` | Accessible Name: "Rs. 278"
   * Variants: [unauthenticated.default]
   * Locator: `getByRole('heading', { name: 'Rs. 278', exact: true })`
   */
  get rs278Heading(): Locator {
    return this.page.getByRole("heading", { name: "Rs. 278", exact: true });
  }

  /** Scoped accessor for `rs278Heading` within a parent container (Container) */
  getScopedRs278Heading(scope: Locator): Locator {
    return scope.getByRole("heading", { name: "Rs. 278", exact: true });
  }

  /**
   * Role: `heading` | Accessible Name: "Rs. 278"
   * Variants: [unauthenticated.default]
   * Locator: `getByRole('heading', { name: 'Rs. 278', exact: true })`
   */
  get rs278Heading2(): Locator {
    return this.page.getByRole("heading", { name: "Rs. 278", exact: true });
  }

  /** Scoped accessor for `rs278Heading2` within a parent container (Container) */
  getScopedRs278Heading2(scope: Locator): Locator {
    return scope.getByRole("heading", { name: "Rs. 278", exact: true });
  }

  /**
   * Role: `heading` | Accessible Name: "Rs. 3000"
   * Variants: [unauthenticated.default]
   * Locator: `getByRole('heading', { name: 'Rs. 3000', exact: true })`
   */
  get rs3000Heading(): Locator {
    return this.page.getByRole("heading", { name: "Rs. 3000", exact: true });
  }

  /** Scoped accessor for `rs3000Heading` within a parent container (Container) */
  getScopedRs3000Heading(scope: Locator): Locator {
    return scope.getByRole("heading", { name: "Rs. 3000", exact: true });
  }

  /**
   * Role: `heading` | Accessible Name: "Rs. 3000"
   * Variants: [unauthenticated.default]
   * Locator: `getByRole('heading', { name: 'Rs. 3000', exact: true })`
   */
  get rs3000Heading2(): Locator {
    return this.page.getByRole("heading", { name: "Rs. 3000", exact: true });
  }

  /** Scoped accessor for `rs3000Heading2` within a parent container (Container) */
  getScopedRs3000Heading2(scope: Locator): Locator {
    return scope.getByRole("heading", { name: "Rs. 3000", exact: true });
  }

  /**
   * Role: `heading` | Accessible Name: "Rs. 315"
   * Variants: [unauthenticated.default]
   * Locator: `getByRole('heading', { name: 'Rs. 315', exact: true })`
   */
  get rs315Heading(): Locator {
    return this.page.getByRole("heading", { name: "Rs. 315", exact: true });
  }

  /** Scoped accessor for `rs315Heading` within a parent container (Container) */
  getScopedRs315Heading(scope: Locator): Locator {
    return scope.getByRole("heading", { name: "Rs. 315", exact: true });
  }

  /**
   * Role: `heading` | Accessible Name: "Rs. 315"
   * Variants: [unauthenticated.default]
   * Locator: `getByRole('heading', { name: 'Rs. 315', exact: true })`
   */
  get rs315Heading2(): Locator {
    return this.page.getByRole("heading", { name: "Rs. 315", exact: true });
  }

  /** Scoped accessor for `rs315Heading2` within a parent container (Container) */
  getScopedRs315Heading2(scope: Locator): Locator {
    return scope.getByRole("heading", { name: "Rs. 315", exact: true });
  }

  /**
   * Role: `heading` | Accessible Name: "Rs. 3500"
   * Variants: [unauthenticated.default]
   * Locator: `getByRole('heading', { name: 'Rs. 3500', exact: true })`
   */
  get rs3500Heading(): Locator {
    return this.page.getByRole("heading", { name: "Rs. 3500", exact: true });
  }

  /** Scoped accessor for `rs3500Heading` within a parent container (Container) */
  getScopedRs3500Heading(scope: Locator): Locator {
    return scope.getByRole("heading", { name: "Rs. 3500", exact: true });
  }

  /**
   * Role: `heading` | Accessible Name: "Rs. 3500"
   * Variants: [unauthenticated.default]
   * Locator: `getByRole('heading', { name: 'Rs. 3500', exact: true })`
   */
  get rs3500Heading2(): Locator {
    return this.page.getByRole("heading", { name: "Rs. 3500", exact: true });
  }

  /** Scoped accessor for `rs3500Heading2` within a parent container (Container) */
  getScopedRs3500Heading2(scope: Locator): Locator {
    return scope.getByRole("heading", { name: "Rs. 3500", exact: true });
  }

  /**
   * Role: `heading` | Accessible Name: "Rs. 359"
   * Variants: [unauthenticated.default]
   * Locator: `getByRole('heading', { name: 'Rs. 359', exact: true })`
   */
  get rs359Heading(): Locator {
    return this.page.getByRole("heading", { name: "Rs. 359", exact: true });
  }

  /** Scoped accessor for `rs359Heading` within a parent container (Container) */
  getScopedRs359Heading(scope: Locator): Locator {
    return scope.getByRole("heading", { name: "Rs. 359", exact: true });
  }

  /**
   * Role: `heading` | Accessible Name: "Rs. 359"
   * Variants: [unauthenticated.default]
   * Locator: `getByRole('heading', { name: 'Rs. 359', exact: true })`
   */
  get rs359Heading2(): Locator {
    return this.page.getByRole("heading", { name: "Rs. 359", exact: true });
  }

  /** Scoped accessor for `rs359Heading2` within a parent container (Container) */
  getScopedRs359Heading2(scope: Locator): Locator {
    return scope.getByRole("heading", { name: "Rs. 359", exact: true });
  }

  /**
   * Role: `heading` | Accessible Name: "Rs. 400"
   * Variants: [unauthenticated.default]
   * Locator: `getByRole('heading', { name: 'Rs. 400', exact: true })`
   */
  get rs400Heading(): Locator {
    return this.page.getByRole("heading", { name: "Rs. 400", exact: true });
  }

  /** Scoped accessor for `rs400Heading` within a parent container (Container) */
  getScopedRs400Heading(scope: Locator): Locator {
    return scope.getByRole("heading", { name: "Rs. 400", exact: true });
  }

  /**
   * Role: `heading` | Accessible Name: "Rs. 400"
   * Variants: [unauthenticated.default]
   * Locator: `getByRole('heading', { name: 'Rs. 400', exact: true })`
   */
  get rs400Heading2(): Locator {
    return this.page.getByRole("heading", { name: "Rs. 400", exact: true });
  }

  /** Scoped accessor for `rs400Heading2` within a parent container (Container) */
  getScopedRs400Heading2(scope: Locator): Locator {
    return scope.getByRole("heading", { name: "Rs. 400", exact: true });
  }

  /**
   * Role: `heading` | Accessible Name: "Rs. 400"
   * Variants: [unauthenticated.default]
   * Locator: `getByRole('heading', { name: 'Rs. 400', exact: true })`
   */
  get rs400Heading3(): Locator {
    return this.page.getByRole("heading", { name: "Rs. 400", exact: true });
  }

  /** Scoped accessor for `rs400Heading3` within a parent container (Container) */
  getScopedRs400Heading3(scope: Locator): Locator {
    return scope.getByRole("heading", { name: "Rs. 400", exact: true });
  }

  /**
   * Role: `heading` | Accessible Name: "Rs. 400"
   * Variants: [unauthenticated.default]
   * Locator: `getByRole('heading', { name: 'Rs. 400', exact: true })`
   */
  get rs400Heading4(): Locator {
    return this.page.getByRole("heading", { name: "Rs. 400", exact: true });
  }

  /** Scoped accessor for `rs400Heading4` within a parent container (Container) */
  getScopedRs400Heading4(scope: Locator): Locator {
    return scope.getByRole("heading", { name: "Rs. 400", exact: true });
  }

  /**
   * Role: `heading` | Accessible Name: "Rs. 400"
   * Variants: [unauthenticated.default]
   * Locator: `getByRole('heading', { name: 'Rs. 400', exact: true })`
   */
  get rs400Heading5(): Locator {
    return this.page.getByRole("heading", { name: "Rs. 400", exact: true });
  }

  /** Scoped accessor for `rs400Heading5` within a parent container (Container) */
  getScopedRs400Heading5(scope: Locator): Locator {
    return scope.getByRole("heading", { name: "Rs. 400", exact: true });
  }

  /**
   * Role: `heading` | Accessible Name: "Rs. 400"
   * Variants: [unauthenticated.default]
   * Locator: `getByRole('heading', { name: 'Rs. 400', exact: true })`
   */
  get rs400Heading6(): Locator {
    return this.page.getByRole("heading", { name: "Rs. 400", exact: true });
  }

  /** Scoped accessor for `rs400Heading6` within a parent container (Container) */
  getScopedRs400Heading6(scope: Locator): Locator {
    return scope.getByRole("heading", { name: "Rs. 400", exact: true });
  }

  /**
   * Role: `heading` | Accessible Name: "Rs. 478"
   * Variants: [unauthenticated.default]
   * Locator: `getByRole('heading', { name: 'Rs. 478', exact: true })`
   */
  get rs478Heading(): Locator {
    return this.page.getByRole("heading", { name: "Rs. 478", exact: true });
  }

  /** Scoped accessor for `rs478Heading` within a parent container (Container) */
  getScopedRs478Heading(scope: Locator): Locator {
    return scope.getByRole("heading", { name: "Rs. 478", exact: true });
  }

  /**
   * Role: `heading` | Accessible Name: "Rs. 478"
   * Variants: [unauthenticated.default]
   * Locator: `getByRole('heading', { name: 'Rs. 478', exact: true })`
   */
  get rs478Heading2(): Locator {
    return this.page.getByRole("heading", { name: "Rs. 478", exact: true });
  }

  /** Scoped accessor for `rs478Heading2` within a parent container (Container) */
  getScopedRs478Heading2(scope: Locator): Locator {
    return scope.getByRole("heading", { name: "Rs. 478", exact: true });
  }

  /**
   * Role: `heading` | Accessible Name: "Rs. 499"
   * Variants: [unauthenticated.default]
   * Locator: `getByRole('heading', { name: 'Rs. 499', exact: true })`
   */
  get rs499Heading(): Locator {
    return this.page.getByRole("heading", { name: "Rs. 499", exact: true });
  }

  /** Scoped accessor for `rs499Heading` within a parent container (Container) */
  getScopedRs499Heading(scope: Locator): Locator {
    return scope.getByRole("heading", { name: "Rs. 499", exact: true });
  }

  /**
   * Role: `heading` | Accessible Name: "Rs. 499"
   * Variants: [unauthenticated.default]
   * Locator: `getByRole('heading', { name: 'Rs. 499', exact: true })`
   */
  get rs499Heading2(): Locator {
    return this.page.getByRole("heading", { name: "Rs. 499", exact: true });
  }

  /** Scoped accessor for `rs499Heading2` within a parent container (Container) */
  getScopedRs499Heading2(scope: Locator): Locator {
    return scope.getByRole("heading", { name: "Rs. 499", exact: true });
  }

  /**
   * Role: `heading` | Accessible Name: "Rs. 5000"
   * Variants: [unauthenticated.default]
   * Locator: `getByRole('heading', { name: 'Rs. 5000', exact: true })`
   */
  get rs5000Heading(): Locator {
    return this.page.getByRole("heading", { name: "Rs. 5000", exact: true });
  }

  /** Scoped accessor for `rs5000Heading` within a parent container (Container) */
  getScopedRs5000Heading(scope: Locator): Locator {
    return scope.getByRole("heading", { name: "Rs. 5000", exact: true });
  }

  /**
   * Role: `heading` | Accessible Name: "Rs. 5000"
   * Variants: [unauthenticated.default]
   * Locator: `getByRole('heading', { name: 'Rs. 5000', exact: true })`
   */
  get rs5000Heading2(): Locator {
    return this.page.getByRole("heading", { name: "Rs. 5000", exact: true });
  }

  /** Scoped accessor for `rs5000Heading2` within a parent container (Container) */
  getScopedRs5000Heading2(scope: Locator): Locator {
    return scope.getByRole("heading", { name: "Rs. 5000", exact: true });
  }

  /**
   * Role: `heading` | Accessible Name: "Rs. 500"
   * Variants: [unauthenticated.default]
   * Locator: `getByRole('heading', { name: 'Rs. 500', exact: true })`
   */
  get rs500Heading(): Locator {
    return this.page.getByRole("heading", { name: "Rs. 500", exact: true });
  }

  /** Scoped accessor for `rs500Heading` within a parent container (Container) */
  getScopedRs500Heading(scope: Locator): Locator {
    return scope.getByRole("heading", { name: "Rs. 500", exact: true });
  }

  /**
   * Role: `heading` | Accessible Name: "Rs. 500"
   * Variants: [unauthenticated.default]
   * Locator: `getByRole('heading', { name: 'Rs. 500', exact: true })`
   */
  get rs500Heading2(): Locator {
    return this.page.getByRole("heading", { name: "Rs. 500", exact: true });
  }

  /** Scoped accessor for `rs500Heading2` within a parent container (Container) */
  getScopedRs500Heading2(scope: Locator): Locator {
    return scope.getByRole("heading", { name: "Rs. 500", exact: true });
  }

  /**
   * Role: `heading` | Accessible Name: "Rs. 500"
   * Variants: [unauthenticated.default]
   * Locator: `getByRole('heading', { name: 'Rs. 500', exact: true })`
   */
  get rs500Heading3(): Locator {
    return this.page.getByRole("heading", { name: "Rs. 500", exact: true });
  }

  /** Scoped accessor for `rs500Heading3` within a parent container (Container) */
  getScopedRs500Heading3(scope: Locator): Locator {
    return scope.getByRole("heading", { name: "Rs. 500", exact: true });
  }

  /**
   * Role: `heading` | Accessible Name: "Rs. 600"
   * Variants: [unauthenticated.default]
   * Locator: `getByRole('heading', { name: 'Rs. 600', exact: true })`
   */
  get rs600Heading(): Locator {
    return this.page.getByRole("heading", { name: "Rs. 600", exact: true });
  }

  /** Scoped accessor for `rs600Heading` within a parent container (Container) */
  getScopedRs600Heading(scope: Locator): Locator {
    return scope.getByRole("heading", { name: "Rs. 600", exact: true });
  }

  /**
   * Role: `heading` | Accessible Name: "Rs. 600"
   * Variants: [unauthenticated.default]
   * Locator: `getByRole('heading', { name: 'Rs. 600', exact: true })`
   */
  get rs600Heading2(): Locator {
    return this.page.getByRole("heading", { name: "Rs. 600", exact: true });
  }

  /** Scoped accessor for `rs600Heading2` within a parent container (Container) */
  getScopedRs600Heading2(scope: Locator): Locator {
    return scope.getByRole("heading", { name: "Rs. 600", exact: true });
  }

  /**
   * Role: `heading` | Accessible Name: "Rs. 600"
   * Variants: [unauthenticated.default]
   * Locator: `getByRole('heading', { name: 'Rs. 600', exact: true })`
   */
  get rs600Heading3(): Locator {
    return this.page.getByRole("heading", { name: "Rs. 600", exact: true });
  }

  /** Scoped accessor for `rs600Heading3` within a parent container (Container) */
  getScopedRs600Heading3(scope: Locator): Locator {
    return scope.getByRole("heading", { name: "Rs. 600", exact: true });
  }

  /**
   * Role: `heading` | Accessible Name: "Rs. 679"
   * Variants: [unauthenticated.default]
   * Locator: `getByRole('heading', { name: 'Rs. 679', exact: true })`
   */
  get rs679Heading(): Locator {
    return this.page.getByRole("heading", { name: "Rs. 679", exact: true });
  }

  /** Scoped accessor for `rs679Heading` within a parent container (Container) */
  getScopedRs679Heading(scope: Locator): Locator {
    return scope.getByRole("heading", { name: "Rs. 679", exact: true });
  }

  /**
   * Role: `heading` | Accessible Name: "Rs. 679"
   * Variants: [unauthenticated.default]
   * Locator: `getByRole('heading', { name: 'Rs. 679', exact: true })`
   */
  get rs679Heading2(): Locator {
    return this.page.getByRole("heading", { name: "Rs. 679", exact: true });
  }

  /** Scoped accessor for `rs679Heading2` within a parent container (Container) */
  getScopedRs679Heading2(scope: Locator): Locator {
    return scope.getByRole("heading", { name: "Rs. 679", exact: true });
  }

  /**
   * Role: `heading` | Accessible Name: "Rs. 700"
   * Variants: [unauthenticated.default]
   * Locator: `getByRole('heading', { name: 'Rs. 700', exact: true })`
   */
  get rs700Heading(): Locator {
    return this.page.getByRole("heading", { name: "Rs. 700", exact: true });
  }

  /** Scoped accessor for `rs700Heading` within a parent container (Container) */
  getScopedRs700Heading(scope: Locator): Locator {
    return scope.getByRole("heading", { name: "Rs. 700", exact: true });
  }

  /**
   * Role: `heading` | Accessible Name: "Rs. 700"
   * Variants: [unauthenticated.default]
   * Locator: `getByRole('heading', { name: 'Rs. 700', exact: true })`
   */
  get rs700Heading2(): Locator {
    return this.page.getByRole("heading", { name: "Rs. 700", exact: true });
  }

  /** Scoped accessor for `rs700Heading2` within a parent container (Container) */
  getScopedRs700Heading2(scope: Locator): Locator {
    return scope.getByRole("heading", { name: "Rs. 700", exact: true });
  }

  /**
   * Role: `heading` | Accessible Name: "Rs. 799"
   * Variants: [unauthenticated.default]
   * Locator: `getByRole('heading', { name: 'Rs. 799', exact: true })`
   */
  get rs799Heading(): Locator {
    return this.page.getByRole("heading", { name: "Rs. 799", exact: true });
  }

  /** Scoped accessor for `rs799Heading` within a parent container (Container) */
  getScopedRs799Heading(scope: Locator): Locator {
    return scope.getByRole("heading", { name: "Rs. 799", exact: true });
  }

  /**
   * Role: `heading` | Accessible Name: "Rs. 799"
   * Variants: [unauthenticated.default]
   * Locator: `getByRole('heading', { name: 'Rs. 799', exact: true })`
   */
  get rs799Heading2(): Locator {
    return this.page.getByRole("heading", { name: "Rs. 799", exact: true });
  }

  /** Scoped accessor for `rs799Heading2` within a parent container (Container) */
  getScopedRs799Heading2(scope: Locator): Locator {
    return scope.getByRole("heading", { name: "Rs. 799", exact: true });
  }

  /**
   * Role: `heading` | Accessible Name: "Rs. 849"
   * Variants: [unauthenticated.default]
   * Locator: `getByRole('heading', { name: 'Rs. 849', exact: true })`
   */
  get rs849Heading(): Locator {
    return this.page.getByRole("heading", { name: "Rs. 849", exact: true });
  }

  /** Scoped accessor for `rs849Heading` within a parent container (Container) */
  getScopedRs849Heading(scope: Locator): Locator {
    return scope.getByRole("heading", { name: "Rs. 849", exact: true });
  }

  /**
   * Role: `heading` | Accessible Name: "Rs. 849"
   * Variants: [unauthenticated.default]
   * Locator: `getByRole('heading', { name: 'Rs. 849', exact: true })`
   */
  get rs849Heading2(): Locator {
    return this.page.getByRole("heading", { name: "Rs. 849", exact: true });
  }

  /** Scoped accessor for `rs849Heading2` within a parent container (Container) */
  getScopedRs849Heading2(scope: Locator): Locator {
    return scope.getByRole("heading", { name: "Rs. 849", exact: true });
  }

  /**
   * Role: `heading` | Accessible Name: "Rs. 850"
   * Variants: [unauthenticated.default]
   * Locator: `getByRole('heading', { name: 'Rs. 850', exact: true })`
   */
  get rs850Heading(): Locator {
    return this.page.getByRole("heading", { name: "Rs. 850", exact: true });
  }

  /** Scoped accessor for `rs850Heading` within a parent container (Container) */
  getScopedRs850Heading(scope: Locator): Locator {
    return scope.getByRole("heading", { name: "Rs. 850", exact: true });
  }

  /**
   * Role: `heading` | Accessible Name: "Rs. 850"
   * Variants: [unauthenticated.default]
   * Locator: `getByRole('heading', { name: 'Rs. 850', exact: true })`
   */
  get rs850Heading2(): Locator {
    return this.page.getByRole("heading", { name: "Rs. 850", exact: true });
  }

  /** Scoped accessor for `rs850Heading2` within a parent container (Container) */
  getScopedRs850Heading2(scope: Locator): Locator {
    return scope.getByRole("heading", { name: "Rs. 850", exact: true });
  }

  /**
   * Role: `link` | Accessible Name: "Saree"
   * Variants: [unauthenticated.default]
   * Locator: `getByRole('link', { name: 'Saree', exact: true })`
   */
  get sareeLink(): Locator {
    return this.page.getByRole("link", { name: "Saree", exact: true });
  }

  /**
   * Role: `link`
   * Variants: [unauthenticated.default]
   * Locator: `locator('#scrollUp')`
   */
  get scrollupLink(): Locator {
    return this.page.locator("#scrollUp");
  }

  /** Scoped accessor for `scrollupLink` within a parent container (Container) */
  getScopedScrollupLink(scope: Locator): Locator {
    return scope.locator("#scrollUp");
  }

  /**
   * Role: `link` | Accessible Name: "Signup / Login"
   * Variants: [unauthenticated.default]
   * Locator: `getByRole('link', { name: 'Signup / Login', exact: true })`
   */
  get signupLoginLink(): Locator {
    return this.page.getByRole("link", { name: "Signup / Login", exact: true });
  }

  /**
   * Role: `button`
   * Variants: [unauthenticated.default]
   * Locator: `locator('#subscribe')`
   */
  get subscribeButton(): Locator {
    return this.page.locator("#subscribe");
  }

  /**
   * Role: `heading` | Accessible Name: "Subscription"
   * Variants: [unauthenticated.default]
   * Locator: `getByRole('heading', { name: 'Subscription', exact: true })`
   */
  get subscriptionHeading(): Locator {
    return this.page.getByRole("heading", { name: "Subscription", exact: true });
  }

  /**
   * Role: `button` | Accessible Name: "Test Cases"
   * Variants: [unauthenticated.default]
   * Locator: `getByRole('button', { name: 'Test Cases', exact: true })`
   */
  get testCasesButton(): Locator {
    return this.page.getByRole("button", { name: "Test Cases", exact: true });
  }

  /** Scoped accessor for `testCasesButton` within a parent container (Container) */
  getScopedTestCasesButton(scope: Locator): Locator {
    return scope.getByRole("button", { name: "Test Cases", exact: true });
  }

  /**
   * Role: `button` | Accessible Name: "Test Cases"
   * Variants: [unauthenticated.default]
   * Locator: `getByRole('button', { name: 'Test Cases', exact: true })`
   */
  get testCasesButton2(): Locator {
    return this.page.getByRole("button", { name: "Test Cases", exact: true });
  }

  /** Scoped accessor for `testCasesButton2` within a parent container (Container) */
  getScopedTestCasesButton2(scope: Locator): Locator {
    return scope.getByRole("button", { name: "Test Cases", exact: true });
  }

  /**
   * Role: `button` | Accessible Name: "Test Cases"
   * Variants: [unauthenticated.default]
   * Locator: `getByRole('button', { name: 'Test Cases', exact: true })`
   */
  get testCasesButton3(): Locator {
    return this.page.getByRole("button", { name: "Test Cases", exact: true });
  }

  /** Scoped accessor for `testCasesButton3` within a parent container (Container) */
  getScopedTestCasesButton3(scope: Locator): Locator {
    return scope.getByRole("button", { name: "Test Cases", exact: true });
  }

  /**
   * Role: `link` | Accessible Name: "Test Cases"
   * Variants: [unauthenticated.default]
   * Locator: `getByRole('link', { name: 'Test Cases', exact: true })`
   */
  get testCasesLink(): Locator {
    return this.page.getByRole("link", { name: "Test Cases", exact: true });
  }

  /** Scoped accessor for `testCasesLink` within a parent container (Container) */
  getScopedTestCasesLink(scope: Locator): Locator {
    return scope.getByRole("link", { name: "Test Cases", exact: true });
  }

  /**
   * Role: `link` | Accessible Name: "Test Cases"
   * Variants: [unauthenticated.default]
   * Locator: `getByRole('link', { name: 'Test Cases', exact: true })`
   */
  get testCasesLink2(): Locator {
    return this.page.getByRole("link", { name: "Test Cases", exact: true });
  }

  /** Scoped accessor for `testCasesLink2` within a parent container (Container) */
  getScopedTestCasesLink2(scope: Locator): Locator {
    return scope.getByRole("link", { name: "Test Cases", exact: true });
  }

  /**
   * Role: `link` | Accessible Name: "Test Cases"
   * Variants: [unauthenticated.default]
   * Locator: `getByRole('link', { name: 'Test Cases', exact: true })`
   */
  get testCasesLink3(): Locator {
    return this.page.getByRole("link", { name: "Test Cases", exact: true });
  }

  /** Scoped accessor for `testCasesLink3` within a parent container (Container) */
  getScopedTestCasesLink3(scope: Locator): Locator {
    return scope.getByRole("link", { name: "Test Cases", exact: true });
  }

  /**
   * Role: `link` | Accessible Name: "Test Cases"
   * Variants: [unauthenticated.default]
   * Locator: `getByRole('link', { name: 'Test Cases', exact: true })`
   */
  get testCasesLink4(): Locator {
    return this.page.getByRole("link", { name: "Test Cases", exact: true });
  }

  /** Scoped accessor for `testCasesLink4` within a parent container (Container) */
  getScopedTestCasesLink4(scope: Locator): Locator {
    return scope.getByRole("link", { name: "Test Cases", exact: true });
  }

  /**
   * Role: `link` | Accessible Name: "Tops"
   * Variants: [unauthenticated.default]
   * Locator: `getByRole('link', { name: 'Tops', exact: true })`
   */
  get topsLink(): Locator {
    return this.page.getByRole("link", { name: "Tops", exact: true });
  }

  /**
   * Role: `link` | Accessible Name: "Tops & Shirts"
   * Variants: [unauthenticated.default]
   * Locator: `getByRole('link', { name: 'Tops & Shirts', exact: true })`
   */
  get topsShirtsLink(): Locator {
    return this.page.getByRole("link", { name: "Tops & Shirts", exact: true });
  }

  /**
   * Role: `link` | Accessible Name: "Tshirts"
   * Variants: [unauthenticated.default]
   * Locator: `getByRole('link', { name: 'Tshirts', exact: true })`
   */
  get tshirtsLink(): Locator {
    return this.page.getByRole("link", { name: "Tshirts", exact: true });
  }

  /**
   * Role: `link` | Accessible Name: "Video Tutorials"
   * Variants: [unauthenticated.default]
   * Locator: `getByRole('link', { name: 'Video Tutorials', exact: true })`
   */
  get videoTutorialsLink(): Locator {
    return this.page.getByRole("link", { name: "Video Tutorials", exact: true });
  }

  /**
   * Role: `link` | Accessible Name: "View Cart"
   * Variants: [unauthenticated.default]
   * Locator: `getByRole('link', { name: 'View Cart', exact: true })`
   */
  get viewCartLink(): Locator {
    return this.page.getByRole("link", { name: "View Cart", exact: true });
  }

  /** Scoped accessor for `viewCartLink` within a parent container (Modal) */
  getScopedViewCartLink(scope: Locator): Locator {
    return scope.getByRole("link", { name: "View Cart", exact: true });
  }

  /**
   * Role: `link` | Accessible Name: "View Product"
   * Variants: [unauthenticated.default]
   * Locator: `getByRole('link', { name: 'View Product', exact: true })`
   */
  get viewProductLink(): Locator {
    return this.page.getByRole("link", { name: "View Product", exact: true });
  }

  /** Scoped accessor for `viewProductLink` within a parent container (Container) */
  getScopedViewProductLink(scope: Locator): Locator {
    return scope.getByRole("link", { name: "View Product", exact: true });
  }

  /**
   * Role: `link` | Accessible Name: "View Product"
   * Variants: [unauthenticated.default]
   * Locator: `getByRole('link', { name: 'View Product', exact: true })`
   */
  get viewProductLink10(): Locator {
    return this.page.getByRole("link", { name: "View Product", exact: true });
  }

  /** Scoped accessor for `viewProductLink10` within a parent container (Container) */
  getScopedViewProductLink10(scope: Locator): Locator {
    return scope.getByRole("link", { name: "View Product", exact: true });
  }

  /**
   * Role: `link` | Accessible Name: "View Product"
   * Variants: [unauthenticated.default]
   * Locator: `getByRole('link', { name: 'View Product', exact: true })`
   */
  get viewProductLink11(): Locator {
    return this.page.getByRole("link", { name: "View Product", exact: true });
  }

  /** Scoped accessor for `viewProductLink11` within a parent container (Container) */
  getScopedViewProductLink11(scope: Locator): Locator {
    return scope.getByRole("link", { name: "View Product", exact: true });
  }

  /**
   * Role: `link` | Accessible Name: "View Product"
   * Variants: [unauthenticated.default]
   * Locator: `getByRole('link', { name: 'View Product', exact: true })`
   */
  get viewProductLink12(): Locator {
    return this.page.getByRole("link", { name: "View Product", exact: true });
  }

  /** Scoped accessor for `viewProductLink12` within a parent container (Container) */
  getScopedViewProductLink12(scope: Locator): Locator {
    return scope.getByRole("link", { name: "View Product", exact: true });
  }

  /**
   * Role: `link` | Accessible Name: "View Product"
   * Variants: [unauthenticated.default]
   * Locator: `getByRole('link', { name: 'View Product', exact: true })`
   */
  get viewProductLink13(): Locator {
    return this.page.getByRole("link", { name: "View Product", exact: true });
  }

  /** Scoped accessor for `viewProductLink13` within a parent container (Container) */
  getScopedViewProductLink13(scope: Locator): Locator {
    return scope.getByRole("link", { name: "View Product", exact: true });
  }

  /**
   * Role: `link` | Accessible Name: "View Product"
   * Variants: [unauthenticated.default]
   * Locator: `getByRole('link', { name: 'View Product', exact: true })`
   */
  get viewProductLink14(): Locator {
    return this.page.getByRole("link", { name: "View Product", exact: true });
  }

  /** Scoped accessor for `viewProductLink14` within a parent container (Container) */
  getScopedViewProductLink14(scope: Locator): Locator {
    return scope.getByRole("link", { name: "View Product", exact: true });
  }

  /**
   * Role: `link` | Accessible Name: "View Product"
   * Variants: [unauthenticated.default]
   * Locator: `getByRole('link', { name: 'View Product', exact: true })`
   */
  get viewProductLink15(): Locator {
    return this.page.getByRole("link", { name: "View Product", exact: true });
  }

  /** Scoped accessor for `viewProductLink15` within a parent container (Container) */
  getScopedViewProductLink15(scope: Locator): Locator {
    return scope.getByRole("link", { name: "View Product", exact: true });
  }

  /**
   * Role: `link` | Accessible Name: "View Product"
   * Variants: [unauthenticated.default]
   * Locator: `getByRole('link', { name: 'View Product', exact: true })`
   */
  get viewProductLink16(): Locator {
    return this.page.getByRole("link", { name: "View Product", exact: true });
  }

  /** Scoped accessor for `viewProductLink16` within a parent container (Container) */
  getScopedViewProductLink16(scope: Locator): Locator {
    return scope.getByRole("link", { name: "View Product", exact: true });
  }

  /**
   * Role: `link` | Accessible Name: "View Product"
   * Variants: [unauthenticated.default]
   * Locator: `getByRole('link', { name: 'View Product', exact: true })`
   */
  get viewProductLink17(): Locator {
    return this.page.getByRole("link", { name: "View Product", exact: true });
  }

  /** Scoped accessor for `viewProductLink17` within a parent container (Container) */
  getScopedViewProductLink17(scope: Locator): Locator {
    return scope.getByRole("link", { name: "View Product", exact: true });
  }

  /**
   * Role: `link` | Accessible Name: "View Product"
   * Variants: [unauthenticated.default]
   * Locator: `getByRole('link', { name: 'View Product', exact: true })`
   */
  get viewProductLink18(): Locator {
    return this.page.getByRole("link", { name: "View Product", exact: true });
  }

  /** Scoped accessor for `viewProductLink18` within a parent container (Container) */
  getScopedViewProductLink18(scope: Locator): Locator {
    return scope.getByRole("link", { name: "View Product", exact: true });
  }

  /**
   * Role: `link` | Accessible Name: "View Product"
   * Variants: [unauthenticated.default]
   * Locator: `getByRole('link', { name: 'View Product', exact: true })`
   */
  get viewProductLink19(): Locator {
    return this.page.getByRole("link", { name: "View Product", exact: true });
  }

  /** Scoped accessor for `viewProductLink19` within a parent container (Container) */
  getScopedViewProductLink19(scope: Locator): Locator {
    return scope.getByRole("link", { name: "View Product", exact: true });
  }

  /**
   * Role: `link` | Accessible Name: "View Product"
   * Variants: [unauthenticated.default]
   * Locator: `getByRole('link', { name: 'View Product', exact: true })`
   */
  get viewProductLink2(): Locator {
    return this.page.getByRole("link", { name: "View Product", exact: true });
  }

  /** Scoped accessor for `viewProductLink2` within a parent container (Container) */
  getScopedViewProductLink2(scope: Locator): Locator {
    return scope.getByRole("link", { name: "View Product", exact: true });
  }

  /**
   * Role: `link` | Accessible Name: "View Product"
   * Variants: [unauthenticated.default]
   * Locator: `getByRole('link', { name: 'View Product', exact: true })`
   */
  get viewProductLink20(): Locator {
    return this.page.getByRole("link", { name: "View Product", exact: true });
  }

  /** Scoped accessor for `viewProductLink20` within a parent container (Container) */
  getScopedViewProductLink20(scope: Locator): Locator {
    return scope.getByRole("link", { name: "View Product", exact: true });
  }

  /**
   * Role: `link` | Accessible Name: "View Product"
   * Variants: [unauthenticated.default]
   * Locator: `getByRole('link', { name: 'View Product', exact: true })`
   */
  get viewProductLink21(): Locator {
    return this.page.getByRole("link", { name: "View Product", exact: true });
  }

  /** Scoped accessor for `viewProductLink21` within a parent container (Container) */
  getScopedViewProductLink21(scope: Locator): Locator {
    return scope.getByRole("link", { name: "View Product", exact: true });
  }

  /**
   * Role: `link` | Accessible Name: "View Product"
   * Variants: [unauthenticated.default]
   * Locator: `getByRole('link', { name: 'View Product', exact: true })`
   */
  get viewProductLink22(): Locator {
    return this.page.getByRole("link", { name: "View Product", exact: true });
  }

  /** Scoped accessor for `viewProductLink22` within a parent container (Container) */
  getScopedViewProductLink22(scope: Locator): Locator {
    return scope.getByRole("link", { name: "View Product", exact: true });
  }

  /**
   * Role: `link` | Accessible Name: "View Product"
   * Variants: [unauthenticated.default]
   * Locator: `getByRole('link', { name: 'View Product', exact: true })`
   */
  get viewProductLink23(): Locator {
    return this.page.getByRole("link", { name: "View Product", exact: true });
  }

  /** Scoped accessor for `viewProductLink23` within a parent container (Container) */
  getScopedViewProductLink23(scope: Locator): Locator {
    return scope.getByRole("link", { name: "View Product", exact: true });
  }

  /**
   * Role: `link` | Accessible Name: "View Product"
   * Variants: [unauthenticated.default]
   * Locator: `getByRole('link', { name: 'View Product', exact: true })`
   */
  get viewProductLink24(): Locator {
    return this.page.getByRole("link", { name: "View Product", exact: true });
  }

  /** Scoped accessor for `viewProductLink24` within a parent container (Container) */
  getScopedViewProductLink24(scope: Locator): Locator {
    return scope.getByRole("link", { name: "View Product", exact: true });
  }

  /**
   * Role: `link` | Accessible Name: "View Product"
   * Variants: [unauthenticated.default]
   * Locator: `getByRole('link', { name: 'View Product', exact: true })`
   */
  get viewProductLink25(): Locator {
    return this.page.getByRole("link", { name: "View Product", exact: true });
  }

  /** Scoped accessor for `viewProductLink25` within a parent container (Container) */
  getScopedViewProductLink25(scope: Locator): Locator {
    return scope.getByRole("link", { name: "View Product", exact: true });
  }

  /**
   * Role: `link` | Accessible Name: "View Product"
   * Variants: [unauthenticated.default]
   * Locator: `getByRole('link', { name: 'View Product', exact: true })`
   */
  get viewProductLink26(): Locator {
    return this.page.getByRole("link", { name: "View Product", exact: true });
  }

  /** Scoped accessor for `viewProductLink26` within a parent container (Container) */
  getScopedViewProductLink26(scope: Locator): Locator {
    return scope.getByRole("link", { name: "View Product", exact: true });
  }

  /**
   * Role: `link` | Accessible Name: "View Product"
   * Variants: [unauthenticated.default]
   * Locator: `getByRole('link', { name: 'View Product', exact: true })`
   */
  get viewProductLink27(): Locator {
    return this.page.getByRole("link", { name: "View Product", exact: true });
  }

  /** Scoped accessor for `viewProductLink27` within a parent container (Container) */
  getScopedViewProductLink27(scope: Locator): Locator {
    return scope.getByRole("link", { name: "View Product", exact: true });
  }

  /**
   * Role: `link` | Accessible Name: "View Product"
   * Variants: [unauthenticated.default]
   * Locator: `getByRole('link', { name: 'View Product', exact: true })`
   */
  get viewProductLink28(): Locator {
    return this.page.getByRole("link", { name: "View Product", exact: true });
  }

  /** Scoped accessor for `viewProductLink28` within a parent container (Container) */
  getScopedViewProductLink28(scope: Locator): Locator {
    return scope.getByRole("link", { name: "View Product", exact: true });
  }

  /**
   * Role: `link` | Accessible Name: "View Product"
   * Variants: [unauthenticated.default]
   * Locator: `getByRole('link', { name: 'View Product', exact: true })`
   */
  get viewProductLink29(): Locator {
    return this.page.getByRole("link", { name: "View Product", exact: true });
  }

  /** Scoped accessor for `viewProductLink29` within a parent container (Container) */
  getScopedViewProductLink29(scope: Locator): Locator {
    return scope.getByRole("link", { name: "View Product", exact: true });
  }

  /**
   * Role: `link` | Accessible Name: "View Product"
   * Variants: [unauthenticated.default]
   * Locator: `getByRole('link', { name: 'View Product', exact: true })`
   */
  get viewProductLink3(): Locator {
    return this.page.getByRole("link", { name: "View Product", exact: true });
  }

  /** Scoped accessor for `viewProductLink3` within a parent container (Container) */
  getScopedViewProductLink3(scope: Locator): Locator {
    return scope.getByRole("link", { name: "View Product", exact: true });
  }

  /**
   * Role: `link` | Accessible Name: "View Product"
   * Variants: [unauthenticated.default]
   * Locator: `getByRole('link', { name: 'View Product', exact: true })`
   */
  get viewProductLink30(): Locator {
    return this.page.getByRole("link", { name: "View Product", exact: true });
  }

  /** Scoped accessor for `viewProductLink30` within a parent container (Container) */
  getScopedViewProductLink30(scope: Locator): Locator {
    return scope.getByRole("link", { name: "View Product", exact: true });
  }

  /**
   * Role: `link` | Accessible Name: "View Product"
   * Variants: [unauthenticated.default]
   * Locator: `getByRole('link', { name: 'View Product', exact: true })`
   */
  get viewProductLink31(): Locator {
    return this.page.getByRole("link", { name: "View Product", exact: true });
  }

  /** Scoped accessor for `viewProductLink31` within a parent container (Container) */
  getScopedViewProductLink31(scope: Locator): Locator {
    return scope.getByRole("link", { name: "View Product", exact: true });
  }

  /**
   * Role: `link` | Accessible Name: "View Product"
   * Variants: [unauthenticated.default]
   * Locator: `getByRole('link', { name: 'View Product', exact: true })`
   */
  get viewProductLink32(): Locator {
    return this.page.getByRole("link", { name: "View Product", exact: true });
  }

  /** Scoped accessor for `viewProductLink32` within a parent container (Container) */
  getScopedViewProductLink32(scope: Locator): Locator {
    return scope.getByRole("link", { name: "View Product", exact: true });
  }

  /**
   * Role: `link` | Accessible Name: "View Product"
   * Variants: [unauthenticated.default]
   * Locator: `getByRole('link', { name: 'View Product', exact: true })`
   */
  get viewProductLink33(): Locator {
    return this.page.getByRole("link", { name: "View Product", exact: true });
  }

  /** Scoped accessor for `viewProductLink33` within a parent container (Container) */
  getScopedViewProductLink33(scope: Locator): Locator {
    return scope.getByRole("link", { name: "View Product", exact: true });
  }

  /**
   * Role: `link` | Accessible Name: "View Product"
   * Variants: [unauthenticated.default]
   * Locator: `getByRole('link', { name: 'View Product', exact: true })`
   */
  get viewProductLink34(): Locator {
    return this.page.getByRole("link", { name: "View Product", exact: true });
  }

  /** Scoped accessor for `viewProductLink34` within a parent container (Container) */
  getScopedViewProductLink34(scope: Locator): Locator {
    return scope.getByRole("link", { name: "View Product", exact: true });
  }

  /**
   * Role: `link` | Accessible Name: "View Product"
   * Variants: [unauthenticated.default]
   * Locator: `getByRole('link', { name: 'View Product', exact: true })`
   */
  get viewProductLink4(): Locator {
    return this.page.getByRole("link", { name: "View Product", exact: true });
  }

  /** Scoped accessor for `viewProductLink4` within a parent container (Container) */
  getScopedViewProductLink4(scope: Locator): Locator {
    return scope.getByRole("link", { name: "View Product", exact: true });
  }

  /**
   * Role: `link` | Accessible Name: "View Product"
   * Variants: [unauthenticated.default]
   * Locator: `getByRole('link', { name: 'View Product', exact: true })`
   */
  get viewProductLink5(): Locator {
    return this.page.getByRole("link", { name: "View Product", exact: true });
  }

  /** Scoped accessor for `viewProductLink5` within a parent container (Container) */
  getScopedViewProductLink5(scope: Locator): Locator {
    return scope.getByRole("link", { name: "View Product", exact: true });
  }

  /**
   * Role: `link` | Accessible Name: "View Product"
   * Variants: [unauthenticated.default]
   * Locator: `getByRole('link', { name: 'View Product', exact: true })`
   */
  get viewProductLink6(): Locator {
    return this.page.getByRole("link", { name: "View Product", exact: true });
  }

  /** Scoped accessor for `viewProductLink6` within a parent container (Container) */
  getScopedViewProductLink6(scope: Locator): Locator {
    return scope.getByRole("link", { name: "View Product", exact: true });
  }

  /**
   * Role: `link` | Accessible Name: "View Product"
   * Variants: [unauthenticated.default]
   * Locator: `getByRole('link', { name: 'View Product', exact: true })`
   */
  get viewProductLink7(): Locator {
    return this.page.getByRole("link", { name: "View Product", exact: true });
  }

  /** Scoped accessor for `viewProductLink7` within a parent container (Container) */
  getScopedViewProductLink7(scope: Locator): Locator {
    return scope.getByRole("link", { name: "View Product", exact: true });
  }

  /**
   * Role: `link` | Accessible Name: "View Product"
   * Variants: [unauthenticated.default]
   * Locator: `getByRole('link', { name: 'View Product', exact: true })`
   */
  get viewProductLink8(): Locator {
    return this.page.getByRole("link", { name: "View Product", exact: true });
  }

  /** Scoped accessor for `viewProductLink8` within a parent container (Container) */
  getScopedViewProductLink8(scope: Locator): Locator {
    return scope.getByRole("link", { name: "View Product", exact: true });
  }

  /**
   * Role: `link` | Accessible Name: "View Product"
   * Variants: [unauthenticated.default]
   * Locator: `getByRole('link', { name: 'View Product', exact: true })`
   */
  get viewProductLink9(): Locator {
    return this.page.getByRole("link", { name: "View Product", exact: true });
  }

  /** Scoped accessor for `viewProductLink9` within a parent container (Container) */
  getScopedViewProductLink9(scope: Locator): Locator {
    return scope.getByRole("link", { name: "View Product", exact: true });
  }

  /**
   * Role: `heading` | Accessible Name: "Women"
   * Variants: [unauthenticated.default]
   * Locator: `getByRole('heading', { name: 'Women', exact: true })`
   */
  get womenHeading(): Locator {
    return this.page.getByRole("heading", { name: "Women", exact: true });
  }

  /**
   * Role: `link` | Accessible Name: "Women"
   * Variants: [unauthenticated.default]
   * Locator: `getByRole('link', { name: 'Women', exact: true })`
   */
  get womenLink(): Locator {
    return this.page.getByRole("link", { name: "Women", exact: true });
  }

  /**
   * Role: `textbox` | Accessible Name: "Your email address"
   * Variants: [unauthenticated.default]
   * Locator: `getByRole('textbox', { name: 'Your email address', exact: true })`
   */
  get yourEmailAddressTextbox(): Locator {
    return this.page.getByRole("textbox", { name: "Your email address", exact: true });
  }
}

export default AEHomeGeneratedPage;
