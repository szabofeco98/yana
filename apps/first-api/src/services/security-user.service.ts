import { runDbOperation } from '@yana/common';
import { db, securityUsersTable, eq, or } from '@yana/dbv2';

import { EmailOrUsernameAlreadyExists } from '../exceptions/exceptions';
import { UserRequest } from '../interfaces/requests/user-request.interface';
import { UserResponse } from '../interfaces/responses/user-response.interface';

export const saveUser = async ({
  email,
  password,
  username,
}: UserRequest): Promise<UserResponse> => {
  const userId = await db
    .select({ id: securityUsersTable.id })
    .from(securityUsersTable)
    .where(
      or(
        eq(securityUsersTable.email, email),
        eq(securityUsersTable.username, username)
      )
    )
    .limit(1);

  if (userId.length > 0) {
    throw new EmailOrUsernameAlreadyExists();
  }

  return runDbOperation(async () => {
    await db.insert(securityUsersTable).values({ email, password, username });
    return { email, username };
  });
};
