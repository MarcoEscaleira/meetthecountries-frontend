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

/** Answer data */
export type AnswerData = {
  __typename?: 'AnswerData';
  /** If this answer is the correct one */
  correct: Scalars['Boolean']['output'];
  /** The answer text */
  text: Scalars['String']['output'];
};

/** The input required to create an answer */
export type AnswerInput = {
  correct: Scalars['Boolean']['input'];
  text: Scalars['String']['input'];
};

/** Country data */
export type CountryData = {
  __typename?: 'CountryData';
  createdAt: Scalars['DateTimeISO']['output'];
  description: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  /** Location in lat and lon of the current country. */
  location: LocationData;
  name: Scalars['String']['output'];
  updatedAt: Scalars['DateTimeISO']['output'];
  /** Defines how many users are registered to this country. */
  users: Scalars['Int']['output'];
};

/** The input required to create a country */
export type CountryInput = {
  /** A brief country description to have an introduction about it. */
  description: Scalars['String']['input'];
  /** Country location data */
  location?: InputMaybe<LocationInput>;
  /** Country name (e.g: "Portugal") */
  name: Scalars['String']['input'];
};

/** Location object using lat and lon */
export type LocationData = {
  __typename?: 'LocationData';
  lat: Scalars['Float']['output'];
  lon: Scalars['Float']['output'];
};

/** The input to define a location */
export type LocationInput = {
  lat: Scalars['Float']['input'];
  lon: Scalars['Float']['input'];
};

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
  createCountry: CountryData;
  createQuiz: QuizData;
  loginUser: LoginResponse;
  signupUser: UserData;
};


export type MutationCreateCountryArgs = {
  country: CountryInput;
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

export type Query = {
  __typename?: 'Query';
  countries: Array<CountryData>;
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
  answers: Array<AnswerData>;
  /** The question name */
  question: Scalars['String']['output'];
};

/** The input required to create a question */
export type QuestionInput = {
  answers: Array<AnswerInput>;
  question: Scalars['String']['input'];
};

/** The input required to create a quiz */
export type QuizAddInput = {
  country: Scalars['ID']['input'];
  description: Scalars['String']['input'];
  questions: Array<QuestionInput>;
  title: Scalars['String']['input'];
};

/** Quiz data */
export type QuizData = {
  __typename?: 'QuizData';
  /** The country where this quiz relates with */
  country: CountryData;
  createdAt: Scalars['DateTimeISO']['output'];
  /** The user that created this quiz for the first time */
  creator: UserData;
  /** Description of the quiz */
  description: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  /** Image of the quiz */
  image: Scalars['String']['output'];
  /** The user that last edited this quiz */
  lastEditor?: Maybe<UserData>;
  /** List of questions for this quiz */
  questions: Array<QuestionData>;
  /** What is the percentage of success of this quiz */
  successRate?: Maybe<Scalars['Float']['output']>;
  /** Title of the quiz */
  title: Scalars['String']['output'];
  updatedAt: Scalars['DateTimeISO']['output'];
};

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
  country?: Maybe<CountryData>;
  createdAt: Scalars['DateTimeISO']['output'];
  dateOfBirth?: Maybe<Scalars['String']['output']>;
  email: Scalars['String']['output'];
  firstName: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  lastName: Scalars['String']['output'];
  role: Scalars['String']['output'];
  updatedAt: Scalars['DateTimeISO']['output'];
};

export type GetMeQueryVariables = Exact<{ [key: string]: never; }>;


export type GetMeQuery = { __typename?: 'Query', getCurrentlyLoggedInUser: { __typename?: 'UserData', id: string, email: string, firstName: string, lastName: string, dateOfBirth?: string | null, role: string, createdAt: any, updatedAt: any } };

export type LoginUserMutationVariables = Exact<{
  input: LoginInput;
}>;


export type LoginUserMutation = { __typename?: 'Mutation', loginUser: { __typename?: 'LoginResponse', access_token: string } };

export type QueryQueryVariables = Exact<{ [key: string]: never; }>;


export type QueryQuery = { __typename?: 'Query', logoutUser: boolean };


export const GetMeDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetMe"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getCurrentlyLoggedInUser"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"dateOfBirth"}},{"kind":"Field","name":{"kind":"Name","value":"role"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]} as unknown as DocumentNode<GetMeQuery, GetMeQueryVariables>;
export const LoginUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"LoginUser"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"LoginInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"loginUser"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"access_token"}}]}}]}}]} as unknown as DocumentNode<LoginUserMutation, LoginUserMutationVariables>;
export const QueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Query"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"logoutUser"}}]}}]} as unknown as DocumentNode<QueryQuery, QueryQueryVariables>;