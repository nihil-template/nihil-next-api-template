const auth = {
  me: [ 'getMe', ],
  signOut: (id: number) => [ 'signOut', id, ],
  refresh: [ 'refreshTokens', ],
  withdrawal: (id: number) => [ 'withdrawal', id, ],
};

const users = {
  all: [ 'getUsers', ],
  byId: (id: number) => [ 'getUserById', id, ],
};

export const queryKeys = {
  auth,
  users,
};
