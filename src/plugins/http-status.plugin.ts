import { ApolloServerPlugin } from '@apollo/server';

// This plugin sets the HTTP status code based on the GraphQL error code
// For example, if the error code is 401, the HTTP status code will be set to 401
const httpStatusPlugin: ApolloServerPlugin = {
  requestDidStart: async () => ({
    willSendResponse: async ({ response, errors }) => {
      if (errors && errors.length > 0) {
        // Customize further based on error type
        for (const error of errors) {
          if (error.extensions?.code === 401) {
            response.http!.status = 401;
          }
        }
      }
    },
  }),
};

export default httpStatusPlugin;
