/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  /** A date-time string at UTC, such as 2007-12-03T10:15:30Z, compliant with the `date-time` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar.This scalar is serialized to a string in ISO 8601 format and parsed from a string in ISO 8601 format. */
  DateTimeISO: { input: any; output: any; }
};

/** Attempt data of a given quiz and user */
export type AttemptData = {
  __typename?: 'AttemptData';
  /** When did the quiz attempt finished, as timestamp */
  endTime: Scalars['DateTimeISO']['output'];
  id: Scalars['ID']['output'];
  /** List of questions played with answers */
  questions: Array<QuestionData>;
  /** The quiz attempted */
  quiz: QuizData;
  /** Attempt score as number to indicate percentage */
  score: Scalars['Int']['output'];
  /** When did the quiz attempt started, as timestamp */
  startTime: Scalars['DateTimeISO']['output'];
  /** The user that did this quiz attempt */
  user: UserData;
};

/** The difficulty measurement */
export enum Difficulty {
  Easy = 'Easy',
  Hard = 'Hard',
  Medium = 'Medium',
  Unknown = 'Unknown'
}

/** User login input data */
export type LoginInput = {
  /** User email address */
  email: Scalars['String']['input'];
  /** User password */
  password: Scalars['String']['input'];
};

/** The login mutation response body */
export type LoginResponse = {
  __typename?: 'LoginResponse';
  /** Access token generated (as a JWT) */
  access_token: Scalars['String']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createQuiz: QuizData;
  loginUser: LoginResponse;
  signupUser: UserData;
};


export type MutationCreateQuizArgs = {
  quiz: QuizAddInput;
};


export type MutationLoginUserArgs = {
  input: LoginInput;
};


export type MutationSignupUserArgs = {
  user: SignUpInput;
};

/** Option data */
export type OptionData = {
  __typename?: 'OptionData';
  /** If this answer was the chosen answer. Only applicable when reading Attempts */
  chosen: Scalars['Boolean']['output'];
  /** If this answer is the correct one */
  correct: Scalars['Boolean']['output'];
  /** The answer text */
  text: Scalars['String']['output'];
};

/** The input required to create an quiz option */
export type OptionInput = {
  chosen?: InputMaybe<Scalars['Boolean']['input']>;
  correct: Scalars['Boolean']['input'];
  text: Scalars['String']['input'];
};

export type Query = {
  __typename?: 'Query';
  attempts: Array<AttemptData>;
  getCurrentlyLoggedInUser: UserData;
  logoutUser: Scalars['Boolean']['output'];
  quizList: Array<QuizData>;
  refreshAccessToken: LoginResponse;
};


export type QueryQuizListArgs = {
  country?: InputMaybe<Scalars['String']['input']>;
};

/** Question data */
export type QuestionData = {
  __typename?: 'QuestionData';
  /** The list of answers for this question */
  options: Array<OptionData>;
  /** The question name */
  question: Scalars['String']['output'];
  /** The question type, where 0 is single choice and 1 is multi-choice */
  type: Scalars['String']['output'];
};

/** The input required to create a question */
export type QuestionInput = {
  options: Array<OptionInput>;
  /** Question text */
  question: Scalars['String']['input'];
  /** Question type */
  type: Scalars['Float']['input'];
};

/** The input required to create a quiz */
export type QuizAddInput = {
  /** The country that this quiz relates */
  country: Scalars['String']['input'];
  /** Quiz description in order to brief about the quiz */
  description: Scalars['String']['input'];
  /** Quiz difficulty */
  difficulty?: InputMaybe<Difficulty>;
  /** Quiz array of questions */
  questions: Array<QuestionInput>;
  /** Array of tags to describe the quiz in keywords */
  tags?: InputMaybe<Array<Scalars['String']['input']>>;
  /** Quiz time limit in minutes */
  timeLimit?: InputMaybe<Scalars['Int']['input']>;
  /** Quiz title definition */
  title: Scalars['String']['input'];
};

/** Quiz data */
export type QuizData = {
  __typename?: 'QuizData';
  /** The country where this quiz relates with */
  country: Scalars['String']['output'];
  /** When was the quiz created */
  createdAt: Scalars['DateTimeISO']['output'];
  /** The user that created this quiz for the first time */
  creator: UserData;
  /** Description of the quiz */
  description: Scalars['String']['output'];
  /** The quiz difficulty to indicate how hard this quiz can be */
  difficulty?: Maybe<Difficulty>;
  id: Scalars['ID']['output'];
  /** Image of the quiz */
  image: Scalars['String']['output'];
  /** The user that last edited this quiz */
  lastEditor?: Maybe<UserData>;
  /** List of questions for this quiz */
  questions: Array<QuestionData>;
  /** Array of tags to describe the quiz in keywords */
  tags?: Maybe<Array<Scalars['String']['output']>>;
  /** The time limit of the quiz in minutes, if 0 there is no time limit */
  timeLimit?: Maybe<Scalars['Int']['output']>;
  /** Title of the quiz */
  title: Scalars['String']['output'];
  /** When was the quiz last updated at */
  updatedAt: Scalars['DateTimeISO']['output'];
};

/** The roles options for the users */
export enum Roles {
  /** The admin role which has the same permissions of an user but has also administrative rights */
  Admin = 'Admin',
  /** The regular user that has the ability to do most of the functionalities on the website */
  User = 'User'
}

/** User sign up input mutation data */
export type SignUpInput = {
  /** New user country */
  country?: InputMaybe<Scalars['String']['input']>;
  /** New user date or birth (e.g: 23-06-2005) */
  dateOfBirth?: InputMaybe<Scalars['String']['input']>;
  /** New user email address */
  email: Scalars['String']['input'];
  /** New user first name */
  firstName: Scalars['String']['input'];
  /** New user last name */
  lastName: Scalars['String']['input'];
  /** New user password */
  password: Scalars['String']['input'];
  /** New user password confirmation */
  passwordConfirm: Scalars['String']['input'];
};

/** User body data */
export type UserData = {
  __typename?: 'UserData';
  /** User country */
  country?: Maybe<Scalars['String']['output']>;
  /** When was the user created */
  createdAt: Scalars['DateTimeISO']['output'];
  /** User date of birth */
  dateOfBirth?: Maybe<Scalars['String']['output']>;
  /** User email */
  email: Scalars['String']['output'];
  /** User first given name */
  firstName: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  /** User family name */
  lastName?: Maybe<Scalars['String']['output']>;
  /** User role */
  role: Roles;
  /** When was the user last updated at */
  updatedAt: Scalars['DateTimeISO']['output'];
};

export type QueryQueryVariables = Exact<{ [key: string]: never; }>;


export type QueryQuery = { __typename?: 'Query', logoutUser: boolean };

export type GetMeQueryVariables = Exact<{ [key: string]: never; }>;


export type GetMeQuery = { __typename?: 'Query', getCurrentlyLoggedInUser: { __typename?: 'UserData', id: string, email: string, firstName: string, lastName?: string | null, dateOfBirth?: string | null, country?: string | null, role: Roles, createdAt: any, updatedAt: any } };

export type LoginUserMutationVariables = Exact<{
  input: LoginInput;
}>;


export type LoginUserMutation = { __typename?: 'Mutation', loginUser: { __typename?: 'LoginResponse', access_token: string } };

export type SignupUserMutationVariables = Exact<{
  user: SignUpInput;
}>;


export type SignupUserMutation = { __typename?: 'Mutation', signupUser: { __typename?: 'UserData', id: string } };


export const QueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Query"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"logoutUser"}}]}}]} as unknown as DocumentNode<QueryQuery, QueryQueryVariables>;
export const GetMeDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetMe"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getCurrentlyLoggedInUser"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"dateOfBirth"}},{"kind":"Field","name":{"kind":"Name","value":"country"}},{"kind":"Field","name":{"kind":"Name","value":"role"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]} as unknown as DocumentNode<GetMeQuery, GetMeQueryVariables>;
export const LoginUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"LoginUser"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"LoginInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"loginUser"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"access_token"}}]}}]}}]} as unknown as DocumentNode<LoginUserMutation, LoginUserMutationVariables>;
export const SignupUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"SignupUser"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"user"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"SignUpInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"signupUser"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"user"},"value":{"kind":"Variable","name":{"kind":"Name","value":"user"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<SignupUserMutation, SignupUserMutationVariables>;