import { faker } from '@faker-js/faker';

// ----------------------------------------------------------------------

export const users = [...Array(24)].map((_, index) => ({
  name: faker.person.fullName(),
  children: faker.company.name(),
}));
