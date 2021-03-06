import { GraphQLFieldConfigMap, GraphQLList } from "graphql";
import { GraphQLInt, GraphQLString } from "graphql/type/scalars";
import { UserType } from "../type/index";

import { AuthorityService } from "../../../services";
import { User } from "../../../types";

const authority_service = new AuthorityService();
const AuthorityQuery: GraphQLFieldConfigMap<any, any> = {
  authority: {
    type: UserType,
    args: {
      id: { type: GraphQLInt },
      name: { type: GraphQLString }
    },
    async resolve(parent, { id, email, name }: User, context, info) {
      return await authority_service.findOne({ id, name });
    }
  },
  authorities: {
    type: new GraphQLList(UserType),
    async resolve(parent, args, context, info) {
      return await authority_service.findAll("DESC");
    }
  }
};

export { AuthorityQuery };
