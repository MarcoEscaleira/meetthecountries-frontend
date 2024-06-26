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

/** The input required to create a attempt */
export type AttemptAddInput = {
  /** Quiz attempt start timestamp */
  endTime: Scalars['DateTimeISO']['input'];
  /** Attempt questions list */
  questions: Array<QuestionInput>;
  /** Quiz difficulty */
  quiz: Scalars['ID']['input'];
  /** Quiz attempt start timestamp */
  startTime: Scalars['DateTimeISO']['input'];
  /** User that is making the attempt */
  user: Scalars['ID']['input'];
};

/** Attempt data of a given quiz and user */
export type AttemptData = {
  __typename?: 'AttemptData';
  /** Number to indicate how many questions the user got correct */
  correctOptions: Scalars['Int']['output'];
  /** When did the quiz attempt finished, as timestamp */
  endTime: Scalars['DateTimeISO']['output'];
  id: Scalars['ID']['output'];
  /** Number to indicate minutes taken to make the quiz attempt */
  minutes: Scalars['Int']['output'];
  /** Number to indicate percentage of correct answers in the quiz attempt */
  percentage: Scalars['Int']['output'];
  /** List of questions played with answers */
  questions: Array<QuestionData>;
  /** The quiz attempted */
  quiz: QuizData;
  /** Number to indicate the rating of this quiz attempt */
  rating?: Maybe<Scalars['Int']['output']>;
  /** Number to indicate seconds taken to make the quiz attempt */
  seconds: Scalars['Int']['output'];
  /** When did the quiz attempt started, as timestamp */
  startTime: Scalars['DateTimeISO']['output'];
  /** The user that did this quiz attempt */
  user: UserData;
};

/** The input required to create a comment for a quiz */
export type CommentAddInput = {
  /** Quiz difficulty */
  quiz: Scalars['ID']['input'];
  /** Comment text content */
  text: Scalars['String']['input'];
  /** User that is making the attempt */
  user: Scalars['ID']['input'];
};

/** Individual comment of a quiz */
export type CommentData = {
  __typename?: 'CommentData';
  /** When was the comment made */
  createdAt: Scalars['DateTimeISO']['output'];
  id: Scalars['ID']['output'];
  /** The quiz where this comment was made */
  quiz: Scalars['String']['output'];
  /** The text of the comment */
  text: Scalars['String']['output'];
  /** When was the comment last updated at */
  updatedAt: Scalars['DateTimeISO']['output'];
  /** The user that did this comment */
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
  addAttempt: AttemptData;
  addAttemptRating: Scalars['Boolean']['output'];
  addComment: Scalars['Boolean']['output'];
  /** Approve a quiz */
  approveQuiz: Scalars['Boolean']['output'];
  /** Cancel a quiz. All attempts will be removed alongside. */
  cancelQuiz: Scalars['Boolean']['output'];
  createQuiz: QuizData;
  deleteAttempt: Scalars['Boolean']['output'];
  deleteComment: Scalars['Boolean']['output'];
  /** The delete of user is just about changing the verified property to false in order to disable it. User data should be kept till request from the user for GDPR reasons */
  deleteUser: Scalars['Boolean']['output'];
  /** Edit comment only if you are the user that made the comment */
  editComment: Scalars['Boolean']['output'];
  loginUser: LoginResponse;
  signupUser: UserData;
  /** Update user password while logged in */
  updatePassword: Scalars['Boolean']['output'];
  /** Update a quiz */
  updateQuiz: QuizData;
  /** Update all user details */
  updateUser: UserData;
};


export type MutationAddAttemptArgs = {
  attempt: AttemptAddInput;
};


export type MutationAddAttemptRatingArgs = {
  attemptId: Scalars['String']['input'];
  rating: Scalars['Int']['input'];
};


export type MutationAddCommentArgs = {
  comment: CommentAddInput;
};


export type MutationApproveQuizArgs = {
  quizId: Scalars['String']['input'];
};


export type MutationCancelQuizArgs = {
  quizId: Scalars['String']['input'];
};


export type MutationCreateQuizArgs = {
  quiz: QuizAddInput;
};


export type MutationDeleteAttemptArgs = {
  attemptId: Scalars['String']['input'];
};


export type MutationDeleteCommentArgs = {
  commentId: Scalars['String']['input'];
};


export type MutationDeleteUserArgs = {
  userId: Scalars['String']['input'];
};


export type MutationEditCommentArgs = {
  commentId: Scalars['String']['input'];
  text: Scalars['String']['input'];
};


export type MutationLoginUserArgs = {
  input: LoginInput;
};


export type MutationSignupUserArgs = {
  user: SignUpInput;
};


export type MutationUpdatePasswordArgs = {
  userPasswordInput: PasswordUpdateInput;
};


export type MutationUpdateQuizArgs = {
  quiz: QuizAddInput;
  quizId: Scalars['String']['input'];
};


export type MutationUpdateUserArgs = {
  user: UserUpdateInput;
  userId: Scalars['String']['input'];
};

/** Option data */
export type OptionData = {
  __typename?: 'OptionData';
  /** If this answer was the chosen answer. Only applicable when reading Attempts */
  chosen?: Maybe<Scalars['Boolean']['output']>;
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

/** User update password input mutation data */
export type PasswordUpdateInput = {
  /** Current user password */
  currentPassword: Scalars['String']['input'];
  /** New user password */
  password: Scalars['String']['input'];
  /** New user password confirmation */
  passwordConfirm: Scalars['String']['input'];
  /** User id for identification */
  userId: Scalars['String']['input'];
};

export type Query = {
  __typename?: 'Query';
  attemptById: AttemptData;
  attempts: Array<AttemptData>;
  getCurrentlyLoggedInUser: UserData;
  logoutUser: Scalars['Boolean']['output'];
  /** Get a quiz by its ID */
  quizById: QuizData;
  quizComments: Array<CommentData>;
  /** Get the list of all quizzes based on multiple filter. */
  quizList: Array<QuizData>;
  /** Get the quiz of the day */
  quizOfTheDay: QuizData;
  quizRating: Scalars['Int']['output'];
  /** Get the list of all quizzes based on the country */
  quizzesByCountry: Array<QuizData>;
  refreshAccessToken: LoginResponse;
};


export type QueryAttemptByIdArgs = {
  attemptId: Scalars['String']['input'];
};


export type QueryAttemptsArgs = {
  quizId?: InputMaybe<Scalars['String']['input']>;
  userId?: InputMaybe<Scalars['String']['input']>;
};


export type QueryQuizByIdArgs = {
  quizId: Scalars['String']['input'];
};


export type QueryQuizCommentsArgs = {
  quizId: Scalars['String']['input'];
};


export type QueryQuizListArgs = {
  country?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<QuizStatus>;
};


export type QueryQuizRatingArgs = {
  quizId: Scalars['String']['input'];
};


export type QueryQuizzesByCountryArgs = {
  country: Scalars['String']['input'];
};

/** Question data */
export type QuestionData = {
  __typename?: 'QuestionData';
  /** The image for this question */
  image: Scalars['String']['output'];
  /** The list of answers for this question */
  options: Array<OptionData>;
  /** The question name */
  question: Scalars['String']['output'];
  /** The type of this question */
  type: QuestionType;
};

/** The input required to create a question */
export type QuestionInput = {
  /** The image for this question */
  image?: InputMaybe<Scalars['String']['input']>;
  options: Array<OptionInput>;
  /** Question text */
  question: Scalars['String']['input'];
  /** The type of this question */
  type: QuestionType;
};

/** The type of a question */
export enum QuestionType {
  Multi = 'Multi',
  Single = 'Single'
}

/** The input required to create a quiz */
export type QuizAddInput = {
  /** The country that this quiz relates */
  country: Scalars['String']['input'];
  /** Quiz description in order to brief about the quiz */
  description: Scalars['String']['input'];
  /** Quiz difficulty */
  difficulty?: InputMaybe<Difficulty>;
  /** Quiz image */
  image?: InputMaybe<Scalars['String']['input']>;
  /** Quiz array of questions */
  questions: Array<QuestionInput>;
  /** Quiz status */
  status?: InputMaybe<QuizStatus>;
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
  /** The quiz status that indicates how the quiz is being handled by the system. Pending by default and that means that is a new quiz created by a user and needs to be reviewed by an admin. */
  status?: Maybe<QuizStatus>;
  /** Array of tags to describe the quiz in keywords */
  tags?: Maybe<Array<Scalars['String']['output']>>;
  /** The time limit of the quiz in minutes, if 0 there is no time limit */
  timeLimit?: Maybe<Scalars['Int']['output']>;
  /** Title of the quiz */
  title: Scalars['String']['output'];
  /** When was the quiz last updated at */
  updatedAt: Scalars['DateTimeISO']['output'];
};

/** The status of a quiz */
export enum QuizStatus {
  Approved = 'Approved',
  Cancelled = 'Cancelled',
  Pending = 'Pending'
}

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
  dateOfBirth?: InputMaybe<Scalars['DateTimeISO']['input']>;
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
  dateOfBirth?: Maybe<Scalars['DateTimeISO']['output']>;
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

/** User input to update its data */
export type UserUpdateInput = {
  /** User country */
  country?: InputMaybe<Scalars['String']['input']>;
  /** User date or birth (e.g: 23-06-2005) */
  dateOfBirth?: InputMaybe<Scalars['DateTimeISO']['input']>;
  /** User first name */
  firstName: Scalars['String']['input'];
  /** User last name */
  lastName: Scalars['String']['input'];
};

export type AllUserAttemptsQueryVariables = Exact<{
  userId?: InputMaybe<Scalars['String']['input']>;
}>;


export type AllUserAttemptsQuery = { __typename?: 'Query', attempts: Array<{ __typename?: 'AttemptData', id: string, correctOptions: number, percentage: number, minutes: number, seconds: number, startTime: any, endTime: any, rating?: number | null, quiz: { __typename?: 'QuizData', title: string, timeLimit?: number | null, questions: Array<{ __typename?: 'QuestionData', question: string }> } }> };

export type ApproveQuizMutationVariables = Exact<{
  quizId: Scalars['String']['input'];
}>;


export type ApproveQuizMutation = { __typename?: 'Mutation', approveQuiz: boolean };

export type QuizAttemptQueryVariables = Exact<{
  attemptId: Scalars['String']['input'];
}>;


export type QuizAttemptQuery = { __typename?: 'Query', attemptById: { __typename?: 'AttemptData', id: string, correctOptions: number, percentage: number, minutes: number, seconds: number, startTime: any, endTime: any, rating?: number | null, questions: Array<{ __typename?: 'QuestionData', question: string, type: QuestionType, options: Array<{ __typename?: 'OptionData', text: string, correct: boolean, chosen?: boolean | null }> }>, user: { __typename?: 'UserData', firstName: string, lastName?: string | null, country?: string | null }, quiz: { __typename?: 'QuizData', title: string, country: string, creator: { __typename?: 'UserData', firstName: string, lastName?: string | null, country?: string | null } } } };

export type CancelQuizMutationVariables = Exact<{
  quizId: Scalars['String']['input'];
}>;


export type CancelQuizMutation = { __typename?: 'Mutation', cancelQuiz: boolean };

export type CountryQuizzesQueryVariables = Exact<{
  country: Scalars['String']['input'];
}>;


export type CountryQuizzesQuery = { __typename?: 'Query', quizzesByCountry: Array<{ __typename?: 'QuizData', id: string, title: string, description: string, difficulty?: Difficulty | null, timeLimit?: number | null, image: string, tags?: Array<string> | null, questions: Array<{ __typename?: 'QuestionData', question: string, type: QuestionType }>, creator: { __typename?: 'UserData', lastName?: string | null } }> };

export type CreateQuizCommentsMutationVariables = Exact<{
  comment: CommentAddInput;
}>;


export type CreateQuizCommentsMutation = { __typename?: 'Mutation', addComment: boolean };

export type CreateQuizMutationVariables = Exact<{
  quiz: QuizAddInput;
}>;


export type CreateQuizMutation = { __typename?: 'Mutation', createQuiz: { __typename?: 'QuizData', id: string } };

export type DeleteAttemptMutationVariables = Exact<{
  attemptId: Scalars['String']['input'];
}>;


export type DeleteAttemptMutation = { __typename?: 'Mutation', deleteAttempt: boolean };

export type DeleteQuizCommentsMutationVariables = Exact<{
  commentId: Scalars['String']['input'];
}>;


export type DeleteQuizCommentsMutation = { __typename?: 'Mutation', deleteComment: boolean };

export type QuizRatingQueryVariables = Exact<{
  quizId: Scalars['String']['input'];
}>;


export type QuizRatingQuery = { __typename?: 'Query', quizRating: number };

export type LoginUserMutationVariables = Exact<{
  input: LoginInput;
}>;


export type LoginUserMutation = { __typename?: 'Mutation', loginUser: { __typename?: 'LoginResponse', access_token: string } };

export type LogoutQueryQueryVariables = Exact<{ [key: string]: never; }>;


export type LogoutQueryQuery = { __typename?: 'Query', logoutUser: boolean };

export type QuizAttemptsQueryVariables = Exact<{
  quizId: Scalars['String']['input'];
  userId?: InputMaybe<Scalars['String']['input']>;
}>;


export type QuizAttemptsQuery = { __typename?: 'Query', attempts: Array<{ __typename?: 'AttemptData', id: string, correctOptions: number, percentage: number, minutes: number, seconds: number, startTime: any, endTime: any, rating?: number | null, quiz: { __typename?: 'QuizData', questions: Array<{ __typename?: 'QuestionData', question: string }> }, user: { __typename?: 'UserData', id: string, firstName: string } }> };

export type QuizByIdQueryVariables = Exact<{
  quizId: Scalars['String']['input'];
}>;


export type QuizByIdQuery = { __typename?: 'Query', quizById: { __typename?: 'QuizData', id: string, title: string, description: string, difficulty?: Difficulty | null, timeLimit?: number | null, image: string, tags?: Array<string> | null, country: string, createdAt: any, updatedAt: any, questions: Array<{ __typename?: 'QuestionData', question: string, type: QuestionType, image: string, options: Array<{ __typename?: 'OptionData', correct: boolean, text: string, chosen?: boolean | null }> }>, creator: { __typename?: 'UserData', lastName?: string | null }, lastEditor?: { __typename?: 'UserData', lastName?: string | null } | null } };

export type QuizCommentsQueryVariables = Exact<{
  quizId: Scalars['String']['input'];
}>;


export type QuizCommentsQuery = { __typename?: 'Query', quizComments: Array<{ __typename?: 'CommentData', id: string, text: string, createdAt: any, user: { __typename?: 'UserData', id: string, firstName: string, lastName?: string | null } }> };

export type QuizOfTheDayQueryVariables = Exact<{ [key: string]: never; }>;


export type QuizOfTheDayQuery = { __typename?: 'Query', quizOfTheDay: { __typename?: 'QuizData', id: string } };

export type QuizzesQueryVariables = Exact<{
  country?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<QuizStatus>;
}>;


export type QuizzesQuery = { __typename?: 'Query', quizList: Array<{ __typename?: 'QuizData', id: string, title: string, difficulty?: Difficulty | null, timeLimit?: number | null, tags?: Array<string> | null, status?: QuizStatus | null, country: string, createdAt: any, updatedAt: any, creator: { __typename?: 'UserData', firstName: string, lastName?: string | null }, lastEditor?: { __typename?: 'UserData', firstName: string, lastName?: string | null } | null }> };

export type SignupUserMutationVariables = Exact<{
  user: SignUpInput;
}>;


export type SignupUserMutation = { __typename?: 'Mutation', signupUser: { __typename?: 'UserData', id: string } };

export type SubmitAttemptMutationVariables = Exact<{
  attempt: AttemptAddInput;
}>;


export type SubmitAttemptMutation = { __typename?: 'Mutation', addAttempt: { __typename?: 'AttemptData', id: string } };

export type SubmitAttemptRatingMutationVariables = Exact<{
  attemptId: Scalars['String']['input'];
  rating: Scalars['Int']['input'];
}>;


export type SubmitAttemptRatingMutation = { __typename?: 'Mutation', addAttemptRating: boolean };

export type UpdateQuizCommentsMutationVariables = Exact<{
  commentId: Scalars['String']['input'];
  text: Scalars['String']['input'];
}>;


export type UpdateQuizCommentsMutation = { __typename?: 'Mutation', editComment: boolean };

export type UpdateQuizMutationVariables = Exact<{
  quizId: Scalars['String']['input'];
  quiz: QuizAddInput;
}>;


export type UpdateQuizMutation = { __typename?: 'Mutation', updateQuiz: { __typename?: 'QuizData', id: string } };

export type UpdateUserMutationVariables = Exact<{
  userId: Scalars['String']['input'];
  user: UserUpdateInput;
}>;


export type UpdateUserMutation = { __typename?: 'Mutation', updateUser: { __typename?: 'UserData', id: string } };

export type UpdateUserPasswordMutationVariables = Exact<{
  userPasswordInput: PasswordUpdateInput;
}>;


export type UpdateUserPasswordMutation = { __typename?: 'Mutation', updatePassword: boolean };

export type UserAttemptsQueryVariables = Exact<{
  userId?: InputMaybe<Scalars['String']['input']>;
}>;


export type UserAttemptsQuery = { __typename?: 'Query', attempts: Array<{ __typename?: 'AttemptData', id: string, quiz: { __typename?: 'QuizData', id: string, country: string } }> };

export type GetMeQueryVariables = Exact<{ [key: string]: never; }>;


export type GetMeQuery = { __typename?: 'Query', getCurrentlyLoggedInUser: { __typename?: 'UserData', id: string, email: string, firstName: string, lastName?: string | null, dateOfBirth?: any | null, country?: string | null, role: Roles, createdAt: any, updatedAt: any } };


export const AllUserAttemptsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"AllUserAttempts"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userId"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"attempts"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"userId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"correctOptions"}},{"kind":"Field","name":{"kind":"Name","value":"percentage"}},{"kind":"Field","name":{"kind":"Name","value":"minutes"}},{"kind":"Field","name":{"kind":"Name","value":"seconds"}},{"kind":"Field","name":{"kind":"Name","value":"startTime"}},{"kind":"Field","name":{"kind":"Name","value":"endTime"}},{"kind":"Field","name":{"kind":"Name","value":"rating"}},{"kind":"Field","name":{"kind":"Name","value":"quiz"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"timeLimit"}},{"kind":"Field","name":{"kind":"Name","value":"questions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"question"}}]}}]}}]}}]}}]} as unknown as DocumentNode<AllUserAttemptsQuery, AllUserAttemptsQueryVariables>;
export const ApproveQuizDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"ApproveQuiz"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"quizId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"approveQuiz"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"quizId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"quizId"}}}]}]}}]} as unknown as DocumentNode<ApproveQuizMutation, ApproveQuizMutationVariables>;
export const QuizAttemptDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"QuizAttempt"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"attemptId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"attemptById"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"attemptId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"attemptId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"correctOptions"}},{"kind":"Field","name":{"kind":"Name","value":"percentage"}},{"kind":"Field","name":{"kind":"Name","value":"minutes"}},{"kind":"Field","name":{"kind":"Name","value":"seconds"}},{"kind":"Field","name":{"kind":"Name","value":"startTime"}},{"kind":"Field","name":{"kind":"Name","value":"endTime"}},{"kind":"Field","name":{"kind":"Name","value":"rating"}},{"kind":"Field","name":{"kind":"Name","value":"questions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"question"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"options"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"text"}},{"kind":"Field","name":{"kind":"Name","value":"correct"}},{"kind":"Field","name":{"kind":"Name","value":"chosen"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"country"}}]}},{"kind":"Field","name":{"kind":"Name","value":"quiz"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"country"}},{"kind":"Field","name":{"kind":"Name","value":"creator"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"country"}}]}}]}}]}}]}}]} as unknown as DocumentNode<QuizAttemptQuery, QuizAttemptQueryVariables>;
export const CancelQuizDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CancelQuiz"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"quizId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"cancelQuiz"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"quizId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"quizId"}}}]}]}}]} as unknown as DocumentNode<CancelQuizMutation, CancelQuizMutationVariables>;
export const CountryQuizzesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"CountryQuizzes"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"country"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"quizzesByCountry"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"country"},"value":{"kind":"Variable","name":{"kind":"Name","value":"country"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"difficulty"}},{"kind":"Field","name":{"kind":"Name","value":"timeLimit"}},{"kind":"Field","name":{"kind":"Name","value":"image"}},{"kind":"Field","name":{"kind":"Name","value":"tags"}},{"kind":"Field","name":{"kind":"Name","value":"questions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"question"}},{"kind":"Field","name":{"kind":"Name","value":"type"}}]}},{"kind":"Field","name":{"kind":"Name","value":"creator"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"lastName"}}]}}]}}]}}]} as unknown as DocumentNode<CountryQuizzesQuery, CountryQuizzesQueryVariables>;
export const CreateQuizCommentsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateQuizComments"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"comment"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CommentAddInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"addComment"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"comment"},"value":{"kind":"Variable","name":{"kind":"Name","value":"comment"}}}]}]}}]} as unknown as DocumentNode<CreateQuizCommentsMutation, CreateQuizCommentsMutationVariables>;
export const CreateQuizDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateQuiz"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"quiz"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"QuizAddInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createQuiz"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"quiz"},"value":{"kind":"Variable","name":{"kind":"Name","value":"quiz"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<CreateQuizMutation, CreateQuizMutationVariables>;
export const DeleteAttemptDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteAttempt"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"attemptId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteAttempt"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"attemptId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"attemptId"}}}]}]}}]} as unknown as DocumentNode<DeleteAttemptMutation, DeleteAttemptMutationVariables>;
export const DeleteQuizCommentsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteQuizComments"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"commentId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteComment"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"commentId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"commentId"}}}]}]}}]} as unknown as DocumentNode<DeleteQuizCommentsMutation, DeleteQuizCommentsMutationVariables>;
export const QuizRatingDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"QuizRating"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"quizId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"quizRating"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"quizId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"quizId"}}}]}]}}]} as unknown as DocumentNode<QuizRatingQuery, QuizRatingQueryVariables>;
export const LoginUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"LoginUser"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"LoginInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"loginUser"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"access_token"}}]}}]}}]} as unknown as DocumentNode<LoginUserMutation, LoginUserMutationVariables>;
export const LogoutQueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"LogoutQuery"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"logoutUser"}}]}}]} as unknown as DocumentNode<LogoutQueryQuery, LogoutQueryQueryVariables>;
export const QuizAttemptsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"QuizAttempts"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"quizId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userId"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"attempts"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"quizId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"quizId"}}},{"kind":"Argument","name":{"kind":"Name","value":"userId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"correctOptions"}},{"kind":"Field","name":{"kind":"Name","value":"percentage"}},{"kind":"Field","name":{"kind":"Name","value":"minutes"}},{"kind":"Field","name":{"kind":"Name","value":"seconds"}},{"kind":"Field","name":{"kind":"Name","value":"startTime"}},{"kind":"Field","name":{"kind":"Name","value":"endTime"}},{"kind":"Field","name":{"kind":"Name","value":"rating"}},{"kind":"Field","name":{"kind":"Name","value":"quiz"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"questions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"question"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}}]}}]}}]}}]} as unknown as DocumentNode<QuizAttemptsQuery, QuizAttemptsQueryVariables>;
export const QuizByIdDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"QuizById"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"quizId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"quizById"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"quizId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"quizId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"difficulty"}},{"kind":"Field","name":{"kind":"Name","value":"timeLimit"}},{"kind":"Field","name":{"kind":"Name","value":"image"}},{"kind":"Field","name":{"kind":"Name","value":"tags"}},{"kind":"Field","name":{"kind":"Name","value":"questions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"question"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"image"}},{"kind":"Field","name":{"kind":"Name","value":"options"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"correct"}},{"kind":"Field","name":{"kind":"Name","value":"text"}},{"kind":"Field","name":{"kind":"Name","value":"chosen"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"country"}},{"kind":"Field","name":{"kind":"Name","value":"creator"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"lastName"}}]}},{"kind":"Field","name":{"kind":"Name","value":"lastEditor"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"lastName"}}]}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]} as unknown as DocumentNode<QuizByIdQuery, QuizByIdQueryVariables>;
export const QuizCommentsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"QuizComments"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"quizId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"quizComments"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"quizId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"quizId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"text"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}}]}}]}}]}}]} as unknown as DocumentNode<QuizCommentsQuery, QuizCommentsQueryVariables>;
export const QuizOfTheDayDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"QuizOfTheDay"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"quizOfTheDay"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<QuizOfTheDayQuery, QuizOfTheDayQueryVariables>;
export const QuizzesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Quizzes"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"country"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"status"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"QuizStatus"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"quizList"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"country"},"value":{"kind":"Variable","name":{"kind":"Name","value":"country"}}},{"kind":"Argument","name":{"kind":"Name","value":"status"},"value":{"kind":"Variable","name":{"kind":"Name","value":"status"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"difficulty"}},{"kind":"Field","name":{"kind":"Name","value":"timeLimit"}},{"kind":"Field","name":{"kind":"Name","value":"tags"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"country"}},{"kind":"Field","name":{"kind":"Name","value":"creator"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}}]}},{"kind":"Field","name":{"kind":"Name","value":"lastEditor"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}}]}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]} as unknown as DocumentNode<QuizzesQuery, QuizzesQueryVariables>;
export const SignupUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"SignupUser"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"user"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"SignUpInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"signupUser"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"user"},"value":{"kind":"Variable","name":{"kind":"Name","value":"user"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<SignupUserMutation, SignupUserMutationVariables>;
export const SubmitAttemptDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"SubmitAttempt"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"attempt"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"AttemptAddInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"addAttempt"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"attempt"},"value":{"kind":"Variable","name":{"kind":"Name","value":"attempt"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<SubmitAttemptMutation, SubmitAttemptMutationVariables>;
export const SubmitAttemptRatingDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"SubmitAttemptRating"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"attemptId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"rating"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"addAttemptRating"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"attemptId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"attemptId"}}},{"kind":"Argument","name":{"kind":"Name","value":"rating"},"value":{"kind":"Variable","name":{"kind":"Name","value":"rating"}}}]}]}}]} as unknown as DocumentNode<SubmitAttemptRatingMutation, SubmitAttemptRatingMutationVariables>;
export const UpdateQuizCommentsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateQuizComments"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"commentId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"text"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"editComment"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"commentId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"commentId"}}},{"kind":"Argument","name":{"kind":"Name","value":"text"},"value":{"kind":"Variable","name":{"kind":"Name","value":"text"}}}]}]}}]} as unknown as DocumentNode<UpdateQuizCommentsMutation, UpdateQuizCommentsMutationVariables>;
export const UpdateQuizDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateQuiz"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"quizId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"quiz"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"QuizAddInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateQuiz"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"quizId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"quizId"}}},{"kind":"Argument","name":{"kind":"Name","value":"quiz"},"value":{"kind":"Variable","name":{"kind":"Name","value":"quiz"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<UpdateQuizMutation, UpdateQuizMutationVariables>;
export const UpdateUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateUser"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"user"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UserUpdateInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateUser"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"userId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userId"}}},{"kind":"Argument","name":{"kind":"Name","value":"user"},"value":{"kind":"Variable","name":{"kind":"Name","value":"user"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<UpdateUserMutation, UpdateUserMutationVariables>;
export const UpdateUserPasswordDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateUserPassword"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userPasswordInput"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"PasswordUpdateInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updatePassword"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"userPasswordInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userPasswordInput"}}}]}]}}]} as unknown as DocumentNode<UpdateUserPasswordMutation, UpdateUserPasswordMutationVariables>;
export const UserAttemptsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"UserAttempts"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userId"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"attempts"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"userId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"quiz"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"country"}}]}}]}}]}}]} as unknown as DocumentNode<UserAttemptsQuery, UserAttemptsQueryVariables>;
export const GetMeDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetMe"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getCurrentlyLoggedInUser"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"dateOfBirth"}},{"kind":"Field","name":{"kind":"Name","value":"country"}},{"kind":"Field","name":{"kind":"Name","value":"role"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]} as unknown as DocumentNode<GetMeQuery, GetMeQueryVariables>;