export type BillingDetail = {
  firstName: string;
  lastName: string;
  country: string;
  streetAddress: string;
  city: string;
  postcode: string;
  phone: string;
  email: string;
};

export const billingDetail: BillingDetail = {
  firstName: "Test",
  lastName: "User",
  country: "Vietnam",
  streetAddress: "123 Main St",
  city: "Hanoi",
  postcode: "100000",
  phone: "0123456789",
  email: "test@dummy.com",
} as const;
