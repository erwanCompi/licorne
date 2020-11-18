import API, { GraphQLResult, graphqlOperation } from '@aws-amplify/api';
import { listTodos, getTodo } from './src/graphql/queries';
import { createTodo, updateTodo, deleteTodo } from './src/graphql/mutations';
import * as APIt from './src/API';

declare module "@aws-amplify/ui"; // amplify hack :(
