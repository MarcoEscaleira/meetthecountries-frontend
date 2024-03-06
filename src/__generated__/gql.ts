/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    "\n  mutation UpdateUser($userId: String!, $user: UserUpdateInput!) {\n    updateUser(userId: $userId, user: $user) {\n      id\n    }\n  }\n": types.UpdateUserDocument,
    "\n  query AttemptResult($attemptId: String!) {\n    attempts(attemptId: $attemptId) {\n      id\n      correctOptions\n      percentage\n      minutes\n      seconds\n      startTime\n      endTime\n      questions {\n        question\n        type\n        options {\n          text\n          correct\n          chosen\n        }\n      }\n      user {\n        firstName\n        lastName\n      }\n      quiz {\n        title\n        country\n        creator {\n          firstName\n          lastName\n          country\n        }\n      }\n    }\n  }\n": types.AttemptResultDocument,
    "\n  query CountryQuizzes($country: String!) {\n    quizList(country: $country) {\n      id\n      title\n      description\n      difficulty\n      timeLimit\n      image\n      tags\n      questions {\n        question\n        type\n      }\n      creator {\n        lastName\n      }\n    }\n  }\n": types.CountryQuizzesDocument,
    "\n  mutation CreateQuiz($quiz: QuizAddInput!) {\n    createQuiz(quiz: $quiz) {\n      id\n    }\n  }\n": types.CreateQuizDocument,
    "\n    mutation LoginUser($input: LoginInput!) {\n        loginUser(input: $input) {\n            access_token\n        }\n    }\n": types.LoginUserDocument,
    "\n    query LogoutQuery {\n        logoutUser\n    }\n": types.LogoutQueryDocument,
    "\n  query QuizAttempts($quizId: String!, $userId: String) {\n    attempts(quizId: $quizId, userId: $userId) {\n      id\n      correctOptions\n      percentage\n      minutes\n      seconds\n      startTime\n      endTime\n      quiz {\n        questions {\n          question\n        }\n      }\n      user {\n        id\n        firstName\n      }\n    }\n  }\n": types.QuizAttemptsDocument,
    "\n  query QuizById($quizId: String!) {\n    quizList(quizId: $quizId) {\n      id\n      title\n      description\n      difficulty\n      timeLimit\n      image\n      tags\n      questions {\n        question\n        type\n        options {\n          correct\n          text\n          chosen\n        }\n      }\n      country\n      creator {\n        lastName\n      }\n      lastEditor {\n        lastName\n      }\n      createdAt\n      updatedAt\n    }\n  }\n": types.QuizByIdDocument,
    "\n  query Quizzes($country: String, $status: QuizStatus) {\n    quizList(country: $country, status: $status) {\n      id\n      title\n      difficulty\n      timeLimit\n      tags\n      status\n      country\n      creator {\n        firstName\n        lastName\n      }\n      lastEditor {\n        firstName\n        lastName\n      }\n      createdAt\n      updatedAt\n    }\n  }\n": types.QuizzesDocument,
    "\n  mutation SignupUser($user: SignUpInput!) {\n    signupUser(user: $user) {\n      id\n    }\n  }\n": types.SignupUserDocument,
    "\n  mutation SubmitAttempt($attempt: AttemptAddInput!) {\n    addAttempt(attempt: $attempt) {\n      id\n    }\n  }\n": types.SubmitAttemptDocument,
    "\n  mutation UpdateQuiz($quizId: String!, $quiz: QuizAddInput!) {\n    updateQuiz(quizId: $quizId, quiz: $quiz) {\n      id\n    }\n  }\n": types.UpdateQuizDocument,
    "\n  query GetMe {\n    getCurrentlyLoggedInUser {\n      id\n      email\n      firstName\n      lastName\n      dateOfBirth\n      country\n      role\n      createdAt\n      updatedAt\n    }\n  }\n": types.GetMeDocument,
};

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = gql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function gql(source: string): unknown;

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation UpdateUser($userId: String!, $user: UserUpdateInput!) {\n    updateUser(userId: $userId, user: $user) {\n      id\n    }\n  }\n"): (typeof documents)["\n  mutation UpdateUser($userId: String!, $user: UserUpdateInput!) {\n    updateUser(userId: $userId, user: $user) {\n      id\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query AttemptResult($attemptId: String!) {\n    attempts(attemptId: $attemptId) {\n      id\n      correctOptions\n      percentage\n      minutes\n      seconds\n      startTime\n      endTime\n      questions {\n        question\n        type\n        options {\n          text\n          correct\n          chosen\n        }\n      }\n      user {\n        firstName\n        lastName\n      }\n      quiz {\n        title\n        country\n        creator {\n          firstName\n          lastName\n          country\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query AttemptResult($attemptId: String!) {\n    attempts(attemptId: $attemptId) {\n      id\n      correctOptions\n      percentage\n      minutes\n      seconds\n      startTime\n      endTime\n      questions {\n        question\n        type\n        options {\n          text\n          correct\n          chosen\n        }\n      }\n      user {\n        firstName\n        lastName\n      }\n      quiz {\n        title\n        country\n        creator {\n          firstName\n          lastName\n          country\n        }\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query CountryQuizzes($country: String!) {\n    quizList(country: $country) {\n      id\n      title\n      description\n      difficulty\n      timeLimit\n      image\n      tags\n      questions {\n        question\n        type\n      }\n      creator {\n        lastName\n      }\n    }\n  }\n"): (typeof documents)["\n  query CountryQuizzes($country: String!) {\n    quizList(country: $country) {\n      id\n      title\n      description\n      difficulty\n      timeLimit\n      image\n      tags\n      questions {\n        question\n        type\n      }\n      creator {\n        lastName\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation CreateQuiz($quiz: QuizAddInput!) {\n    createQuiz(quiz: $quiz) {\n      id\n    }\n  }\n"): (typeof documents)["\n  mutation CreateQuiz($quiz: QuizAddInput!) {\n    createQuiz(quiz: $quiz) {\n      id\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n    mutation LoginUser($input: LoginInput!) {\n        loginUser(input: $input) {\n            access_token\n        }\n    }\n"): (typeof documents)["\n    mutation LoginUser($input: LoginInput!) {\n        loginUser(input: $input) {\n            access_token\n        }\n    }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n    query LogoutQuery {\n        logoutUser\n    }\n"): (typeof documents)["\n    query LogoutQuery {\n        logoutUser\n    }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query QuizAttempts($quizId: String!, $userId: String) {\n    attempts(quizId: $quizId, userId: $userId) {\n      id\n      correctOptions\n      percentage\n      minutes\n      seconds\n      startTime\n      endTime\n      quiz {\n        questions {\n          question\n        }\n      }\n      user {\n        id\n        firstName\n      }\n    }\n  }\n"): (typeof documents)["\n  query QuizAttempts($quizId: String!, $userId: String) {\n    attempts(quizId: $quizId, userId: $userId) {\n      id\n      correctOptions\n      percentage\n      minutes\n      seconds\n      startTime\n      endTime\n      quiz {\n        questions {\n          question\n        }\n      }\n      user {\n        id\n        firstName\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query QuizById($quizId: String!) {\n    quizList(quizId: $quizId) {\n      id\n      title\n      description\n      difficulty\n      timeLimit\n      image\n      tags\n      questions {\n        question\n        type\n        options {\n          correct\n          text\n          chosen\n        }\n      }\n      country\n      creator {\n        lastName\n      }\n      lastEditor {\n        lastName\n      }\n      createdAt\n      updatedAt\n    }\n  }\n"): (typeof documents)["\n  query QuizById($quizId: String!) {\n    quizList(quizId: $quizId) {\n      id\n      title\n      description\n      difficulty\n      timeLimit\n      image\n      tags\n      questions {\n        question\n        type\n        options {\n          correct\n          text\n          chosen\n        }\n      }\n      country\n      creator {\n        lastName\n      }\n      lastEditor {\n        lastName\n      }\n      createdAt\n      updatedAt\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query Quizzes($country: String, $status: QuizStatus) {\n    quizList(country: $country, status: $status) {\n      id\n      title\n      difficulty\n      timeLimit\n      tags\n      status\n      country\n      creator {\n        firstName\n        lastName\n      }\n      lastEditor {\n        firstName\n        lastName\n      }\n      createdAt\n      updatedAt\n    }\n  }\n"): (typeof documents)["\n  query Quizzes($country: String, $status: QuizStatus) {\n    quizList(country: $country, status: $status) {\n      id\n      title\n      difficulty\n      timeLimit\n      tags\n      status\n      country\n      creator {\n        firstName\n        lastName\n      }\n      lastEditor {\n        firstName\n        lastName\n      }\n      createdAt\n      updatedAt\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation SignupUser($user: SignUpInput!) {\n    signupUser(user: $user) {\n      id\n    }\n  }\n"): (typeof documents)["\n  mutation SignupUser($user: SignUpInput!) {\n    signupUser(user: $user) {\n      id\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation SubmitAttempt($attempt: AttemptAddInput!) {\n    addAttempt(attempt: $attempt) {\n      id\n    }\n  }\n"): (typeof documents)["\n  mutation SubmitAttempt($attempt: AttemptAddInput!) {\n    addAttempt(attempt: $attempt) {\n      id\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation UpdateQuiz($quizId: String!, $quiz: QuizAddInput!) {\n    updateQuiz(quizId: $quizId, quiz: $quiz) {\n      id\n    }\n  }\n"): (typeof documents)["\n  mutation UpdateQuiz($quizId: String!, $quiz: QuizAddInput!) {\n    updateQuiz(quizId: $quizId, quiz: $quiz) {\n      id\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query GetMe {\n    getCurrentlyLoggedInUser {\n      id\n      email\n      firstName\n      lastName\n      dateOfBirth\n      country\n      role\n      createdAt\n      updatedAt\n    }\n  }\n"): (typeof documents)["\n  query GetMe {\n    getCurrentlyLoggedInUser {\n      id\n      email\n      firstName\n      lastName\n      dateOfBirth\n      country\n      role\n      createdAt\n      updatedAt\n    }\n  }\n"];

export function gql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;