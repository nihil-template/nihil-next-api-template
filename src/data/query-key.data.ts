const auth = {
  me: [ 'getMe', ],
  signOut: [ 'signOut', ],
  refresh: [ 'refreshTokens', ],
  withdrawal: [ 'withdrawal', ],
};

const users = {
  all: [ 'getUsers', ],
  byId: (id: number) => [ 'getUserById', id, ],
};

export const queryKeys = {
  auth,
  users,
};
