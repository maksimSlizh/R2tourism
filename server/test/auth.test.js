const { expect } = require('chai');
const { createUser, getUserByEmail } = require('../src/db');

describe('Authentication API tests', () => {
  it('should create a new user', async () => {
    const user = { username: 'testuser', email: 'test@example.com', password: 'password' };
    await createUser(user);
    const retrievedUser = await getUserByEmail('test@example.com');
    expect(retrievedUser).to.deep.equal(user);
  });

  it('should return user by email', async () => {
    const user = { username: 'testuser', email: 'test@example.com', password: 'password' };
    await createUser(user);
    const retrievedUser = await getUserByEmail('test@example.com');
    expect(retrievedUser).to.exist;
    expect(retrievedUser.email).to.equal('test@example.com');
  });

  it('should return undefined for non-existent user', async () => {
    const retrievedUser = await getUserByEmail('nonexistent@example.com');
    expect(retrievedUser).to.be.undefined;
  });
});
