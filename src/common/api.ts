export type UserListItem = {
  id: number;
  name: string;
  type: 'Admin' | 'Agent' | 'Customer';
  /** Not api property */
  isDraft?: boolean;
};

export const createDraftUserListItem = (): UserListItem => ({
  id: -1,
  name: '',
  type: 'Customer',
  isDraft: true,
});

export type UserInfo = {
  id: number;
  name: string;
  type: 'Admin' | 'Agent' | 'Customer';
  email: string;
  phone: string;
};

export type UserRole = string;
