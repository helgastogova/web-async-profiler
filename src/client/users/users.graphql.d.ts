/* 889dbbbc40727f071add81ac1f4a296594d36b15
 * This file is automatically generated by graphql-let. */

import * as Types from "graphql-let/__generated__/__types__";
import * as Apollo from '@apollo/client';
export type GetUsersQueryVariables = Types.Exact<{
  [key: string]: never;
}>;
export type GetUsersQuery = {
  __typename?: 'Query';
  getUsers: Array<{
    __typename?: 'User';
    email: string;
    id: string;
    name: string;
    avatar: string;
  }>;
};
export declare const GetUsersDocument: Apollo.DocumentNode;
/**
 * __useGetUsersQuery__
 *
 * To run a query within a React component, call `useGetUsersQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUsersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUsersQuery({
 *   variables: {
 *   },
 * });
 */
export declare function useGetUsersQuery(baseOptions?: Apollo.QueryHookOptions<GetUsersQuery, GetUsersQueryVariables>): Apollo.QueryResult<GetUsersQuery, Types.Exact<{
  [key: string]: never;
}>>;
export declare function useGetUsersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUsersQuery, GetUsersQueryVariables>): Apollo.LazyQueryResultTuple<GetUsersQuery, Types.Exact<{
  [key: string]: never;
}>>;
export type GetUsersQueryHookResult = ReturnType<typeof useGetUsersQuery>;
export type GetUsersLazyQueryHookResult = ReturnType<typeof useGetUsersLazyQuery>;
export type GetUsersQueryResult = Apollo.QueryResult<GetUsersQuery, GetUsersQueryVariables>;